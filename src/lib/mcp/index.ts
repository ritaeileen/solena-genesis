import { defineMcp } from "@lovable.dev/mcp-js";
import requestAccessTool from "./tools/request-access";
import getEcosystemTool from "./tools/get-ecosystem";

export default defineMcp({
  name: "solena-mcp",
  title: "Solena",
  version: "0.1.0",
  instructions:
    "Solena is a luxury growth studio that transforms brands, spaces, ventures, and cultural systems into legacy institutions. Use `get_ecosystem` to explore Solena's sectors and `submit_request_access` to relay a Request Access inquiry.",
  tools: [requestAccessTool, getEcosystemTool],
});
