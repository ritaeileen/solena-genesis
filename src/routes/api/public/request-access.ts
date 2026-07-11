import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const payloadSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  organization: z.string().trim().min(2).max(120),
  horizon: z.enum(["1-3", "3-7", "7+"]),
  intent: z.string().trim().min(30).max(1200),
  // honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
  source: z.string().max(80).optional(),
});

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(init.headers ?? {}),
    },
  });
}

function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SOL-${stamp}-${rand}`;
}

export const Route = createFileRoute("/api/public/request-access")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return jsonResponse(
            { ok: false, error: "invalid_json", message: "Request body must be JSON." },
            { status: 400 },
          );
        }

        const parsed = payloadSchema.safeParse(raw);
        if (!parsed.success) {
          return jsonResponse(
            {
              ok: false,
              error: "invalid_payload",
              message: "One or more fields failed validation.",
              issues: parsed.error.issues.map((i) => ({
                path: i.path.join("."),
                message: i.message,
              })),
            },
            { status: 422 },
          );
        }

        // Honeypot: silently accept but do not persist.
        if (parsed.data.website && parsed.data.website.length > 0) {
          return jsonResponse({
            ok: true,
            reference: makeReference(),
            received_at: new Date().toISOString(),
            status: "received",
          });
        }

        const SUPABASE_URL = process.env.SUPABASE_URL;
        const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
          return jsonResponse(
            { ok: false, error: "server_misconfigured", message: "Backend is not configured." },
            { status: 500 },
          );
        }

        const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
          auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
        });

        const reference = makeReference();
        const userAgent = request.headers.get("user-agent")?.slice(0, 300) ?? null;

        const { error } = await supabase.from("request_access_submissions").insert({
          reference,
          name: parsed.data.name,
          email: parsed.data.email,
          organization: parsed.data.organization,
          horizon: parsed.data.horizon,
          intent: parsed.data.intent,
          source: parsed.data.source ?? "web",
          user_agent: userAgent,
        });

        if (error) {
          console.error("[request-access] insert failed", error);
          return jsonResponse(
            { ok: false, error: "storage_failed", message: "Could not record submission." },
            { status: 502 },
          );
        }

        return jsonResponse({
          ok: true,
          reference,
          received_at: new Date().toISOString(),
          status: "received",
        });
      },
      GET: async () =>
        jsonResponse({ ok: false, error: "method_not_allowed" }, { status: 405 }),
    },
  },
});
