import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your full name.").max(80),
  email: z.string().trim().email("A reachable email is required.").max(160),
  organization: z.string().trim().min(2, "Which entity do you represent?").max(120),
  horizon: z.enum(["1-3", "3-7", "7+"], { message: "Select a time horizon." }),
  intent: z
    .string()
    .trim()
    .min(30, "Please describe your intent in at least 30 characters.")
    .max(1200, "Please keep this under 1200 characters."),
});

type FormValues = {
  name: string;
  email: string;
  organization: string;
  horizon: "" | "1-3" | "3-7" | "7+";
  intent: string;
  // spam trap
  website: string;
};

const INITIAL: FormValues = {
  name: "",
  email: "",
  organization: "",
  horizon: "",
  intent: "",
  website: "",
};

type SuccessPayload = {
  reference: string;
  received_at: string;
};

const HORIZONS: { value: "1-3" | "3-7" | "7+"; label: string }[] = [
  { value: "1-3", label: "1 – 3 years" },
  { value: "3-7", label: "3 – 7 years" },
  { value: "7+", label: "7+ years / generational" },
];

export function RequestAccessModal({
  open,
  onOpenChange,
  trigger,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trigger?: React.ReactNode;
}) {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [success, setSuccess] = useState<SuccessPayload | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const openedAtRef = useRef<number>(0);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      openedAtRef.current = Date.now();
      setStatus("idle");
      setErrors({});
      setValues(INITIAL);
      setSuccess(null);
      setSubmitError(null);
      // give Radix time to mount
      const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [open]);

  const update = <K extends keyof FormValues>(k: K, v: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Spam guards: honeypot + minimum dwell time (humans read the form).
    if (values.website.trim() !== "") {
      setSuccess({ reference: "SOL-LOCAL", received_at: new Date().toISOString() });
      setStatus("success");
      return;
    }
    if (Date.now() - openedAtRef.current < 2500) {
      setErrors({ intent: "Please take a moment to review before submitting." });
      return;
    }

    const parsed = schema.safeParse({
      name: values.name,
      email: values.email,
      organization: values.organization,
      horizon: values.horizon,
      intent: values.intent,
    });
    if (!parsed.success) {
      const next: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormValues;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/public/request-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          organization: parsed.data.organization,
          horizon: parsed.data.horizon,
          intent: parsed.data.intent,
          website: values.website,
          source: "landing",
        }),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: true; reference: string; received_at: string }
        | { ok: false; message?: string }
        | null;

      if (!res.ok || !body || body.ok !== true) {
        const message =
          (body && body.ok === false && body.message) ||
          "Transmission failed. Please try again in a moment.";
        setSubmitError(message);
        setStatus("error");
        return;
      }

      setSuccess({ reference: body.reference, received_at: body.received_at });
      setStatus("success");
    } catch {
      setSubmitError("Network unreachable. Please try again in a moment.");
      setStatus("error");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[100] bg-[oklch(0.05_0.003_67/0.72)] backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
        />
        <Dialog.Content
          aria-describedby="request-access-desc"
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="fixed left-1/2 top-1/2 z-[101] w-[min(94vw,640px)] max-h-[92dvh] -translate-x-1/2 -translate-y-1/2 overflow-hidden outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95"
        >
          <div className="glass-strong relative flex max-h-[92dvh] flex-col overflow-hidden rounded-[6px]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-bronze/60 to-transparent" />
            <div className="flex items-start justify-between gap-6 px-8 pt-8 md:px-10 md:pt-10">
              <div>
                <p className="text-[10px] tracking-eyebrow text-bronze/78">09 · Invitation</p>
                <Dialog.Title className="mt-3 font-display text-3xl leading-tight text-ivory md:text-4xl">
                  {status === "success" ? "Signal received." : "Request Access"}
                </Dialog.Title>
                <p id="request-access-desc" className="mt-3 max-w-md text-sm leading-relaxed text-stone/70">
                  {status === "success"
                    ? "Your intent has entered our review. If aligned, a member of Solena will respond directly. We do not send confirmations."
                    : "Access is aligned, not open. Share your intent — every field is read before response."}
                </p>
              </div>
              <Dialog.Close
                aria-label="Close"
                className="text-stone/60 outline-none transition-colors hover:text-ivory focus-visible:text-ivory focus-visible:ring-2 focus-visible:ring-bronze/60 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-deep rounded-full h-8 w-8 inline-flex items-center justify-center border border-ivory/12"
              >
                <span aria-hidden="true" className="text-lg leading-none">×</span>
              </Dialog.Close>
            </div>

            <div className="mt-8 h-px bg-ivory/10" />

            {status === "success" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-14 text-center md:px-10">
                <div className="glass-node flex h-16 w-16 items-center justify-center rounded-full">
                  <span aria-hidden="true" className="font-display text-2xl text-bronze-glow">✓</span>
                </div>
                <p className="font-display text-2xl leading-snug text-ivory md:text-3xl">
                  Alignment is under review.
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-stone/62">
                  You will not receive an automated reply. If your trajectory intersects ours, contact will follow.
                </p>
                {success ? (
                  <p className="text-[10px] tracking-eyebrow text-bronze/72">
                    Reference · {success.reference}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="btn-solena mt-2"
                >
                  <span className="label-main">Return<span className="arrow">→</span></span>
                  <span className="label-hover">Close<span className="arrow">→</span></span>
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="flex flex-1 flex-col gap-6 overflow-y-auto px-8 py-8 md:px-10">
                {/* Honeypot — hidden from users and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={(e) => update("website", e.target.value)}
                    />
                  </label>
                </div>

                <Field
                  id="ra-name"
                  label="Full Name"
                  error={errors.name}
                  input={
                    <input
                      ref={firstFieldRef}
                      id="ra-name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      maxLength={80}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "ra-name-err" : undefined}
                      className={inputCls}
                    />
                  }
                />
                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    id="ra-email"
                    label="Email"
                    error={errors.email}
                    input={
                      <input
                        id="ra-email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                        maxLength={160}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "ra-email-err" : undefined}
                        className={inputCls}
                      />
                    }
                  />
                  <Field
                    id="ra-org"
                    label="Organization"
                    error={errors.organization}
                    input={
                      <input
                        id="ra-org"
                        type="text"
                        autoComplete="organization"
                        value={values.organization}
                        onChange={(e) => update("organization", e.target.value)}
                        maxLength={120}
                        aria-invalid={!!errors.organization}
                        aria-describedby={errors.organization ? "ra-org-err" : undefined}
                        className={inputCls}
                      />
                    }
                  />
                </div>

                <Field
                  id="ra-horizon"
                  label="Time Horizon"
                  error={errors.horizon}
                  input={
                    <div role="radiogroup" aria-label="Time horizon" className="grid gap-2 md:grid-cols-3">
                      {HORIZONS.map((h) => {
                        const selected = values.horizon === h.value;
                        return (
                          <label
                            key={h.value}
                            className={`glass-node cursor-pointer rounded-[4px] px-4 py-3 text-center text-xs tracking-[0.14em] uppercase transition-colors ${
                              selected ? "text-ivory" : "text-stone/70 hover:text-ivory"
                            }`}
                            style={{
                              borderColor: selected ? "oklch(0.68 0.055 65 / 55%)" : undefined,
                            }}
                          >
                            <input
                              type="radio"
                              name="horizon"
                              value={h.value}
                              checked={selected}
                              onChange={() => update("horizon", h.value)}
                              className="sr-only"
                            />
                            {h.label}
                          </label>
                        );
                      })}
                    </div>
                  }
                />

                <Field
                  id="ra-intent"
                  label="Intent"
                  hint={`${values.intent.length}/1200`}
                  error={errors.intent}
                  input={
                    <textarea
                      id="ra-intent"
                      rows={5}
                      value={values.intent}
                      onChange={(e) => update("intent", e.target.value)}
                      maxLength={1200}
                      aria-invalid={!!errors.intent}
                      aria-describedby={errors.intent ? "ra-intent-err" : undefined}
                      className={`${inputCls} resize-none`}
                      placeholder="What are you building, and on what horizon?"
                    />
                  }
                />

                <div className="flex flex-col-reverse items-stretch gap-4 border-t border-ivory/10 pt-6 md:flex-row md:items-center md:justify-between">
                  <p className="text-[10px] tracking-eyebrow text-stone/44">
                    Not everyone will be reviewed
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-solena disabled:cursor-wait disabled:opacity-60"
                  >
                    <span className="label-main">
                      {status === "submitting" ? "Transmitting…" : "Submit for Review"}
                      <span className="arrow">→</span>
                    </span>
                    <span className="label-hover">
                      Signal alignment
                      <span className="arrow">→</span>
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const inputCls =
  "w-full bg-[oklch(0.97_0.004_76/0.04)] border border-ivory/12 rounded-[3px] px-4 py-3 text-sm text-ivory placeholder:text-stone/40 outline-none transition-colors focus:border-bronze-glow/60 focus:bg-[oklch(0.97_0.004_76/0.07)] focus-visible:ring-2 focus-visible:ring-bronze/40";

function Field({
  id,
  label,
  input,
  error,
  hint,
}: {
  id: string;
  label: string;
  input: React.ReactNode;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[10px] tracking-eyebrow text-stone/62">
          {label}
        </label>
        {hint ? <span className="text-[10px] tracking-eyebrow text-stone/38">{hint}</span> : null}
      </div>
      {input}
      {error ? (
        <p id={`${id}-err`} role="alert" className="text-xs text-[oklch(0.72_0.14_28)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
