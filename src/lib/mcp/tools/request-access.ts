import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_request_access",
  title: "Submit Request Access",
  description:
    "Submit a Request Access inquiry to Solena on behalf of a prospective partner. Returns a confirmation payload the caller can relay back to the user.",
  inputSchema: {
    name: z.string().min(2).describe("Full name of the person requesting access."),
    email: z.string().email().describe("Contact email address."),
    organization: z.string().min(2).describe("Company, brand, or institution name."),
    horizon: z
      .enum(["1-3", "3-7", "7+"])
      .describe("Engagement horizon in years: 1-3, 3-7, or 7+."),
    intent: z
      .string()
      .min(30)
      .describe("Description of intent, ambition, or the legacy to be built (min 30 chars)."),
  },
  annotations: { readOnlyHint: false, idempotentHint: false, openWorldHint: false },
  handler: ({ name, email, organization, horizon, intent }) => {
    const reference = `SOL-${Date.now().toString(36).toUpperCase()}`;
    return {
      content: [
        {
          type: "text",
          text: `Signal received. Reference ${reference} — Solena will respond to ${email} within the ${horizon}yr horizon window.`,
        },
      ],
      structuredContent: {
        reference,
        received_at: new Date().toISOString(),
        contact: { name, email, organization },
        horizon,
        intent,
        status: "received",
      },
    };
  },
});
