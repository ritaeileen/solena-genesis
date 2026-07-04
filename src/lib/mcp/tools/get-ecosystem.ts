import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SECTORS = [
  { id: "brand", name: "Brand", description: "Identity architecture, positioning, and narrative systems." },
  { id: "spatial", name: "Spatial", description: "Physical environments, hospitality, and place-making." },
  { id: "capital", name: "Capital", description: "Venture strategy, capital formation, and investor perception." },
  { id: "cultural", name: "Cultural", description: "Cultural systems, institutions, and long-horizon influence." },
  { id: "digital", name: "Digital", description: "Digital surfaces, product strategy, and interactive presence." },
  { id: "editorial", name: "Editorial", description: "Editorial voice, publishing, and thought infrastructure." },
  { id: "advisory", name: "Advisory", description: "Executive advisory, strategic counsel, and stewardship." },
  { id: "legacy", name: "Legacy", description: "Multi-generational legacy design and institutional continuity." },
];

export default defineTool({
  name: "get_ecosystem",
  title: "Get Solena Ecosystem",
  description: "Return the sectors of the Solena orbital ecosystem — the domains Solena operates across.",
  inputSchema: {
    sector: z.string().optional().describe("Optional sector id to filter to a single sector."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ sector }) => {
    const data = sector ? SECTORS.filter((s) => s.id === sector.toLowerCase()) : SECTORS;
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { sectors: data },
    };
  },
});
