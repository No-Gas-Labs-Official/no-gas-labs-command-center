import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodeGateRouter from "./routes/node-gate";
import { nodeGate } from "./node-gate-client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // API routes (real upstream integrations — §3: every intended route is
  // mounted; no fake buttons).
  // GET /api/health        — command-center liveness (always real)
  // GET /api/capabilities  — capability-health screen (§3): probes each
  //                           intended upstream and reports its actual state,
  //                           never a hardcoded status.
  // /api/node-gate/*       — proxied to the AI-BI Intelligence Node-Gate
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "OPERATIONAL",
      service: "command-center",
      timestamp: new Date().toISOString(),
    });
  });

  app.get("/api/capabilities", async (_req, res) => {
    // Capability-health screen: each intended upstream is actually probed.
    // A failing probe reports UNAVAILABLE with the real error; the screen
    // never claims more capability than what is actually running.
    const capabilities: Array<Record<string, unknown>> = [];

    try {
      const health = await nodeGate.health();
      capabilities.push({
        id: "node-gate",
        name: "AI-BI Intelligence Node-Gate",
        kind: "upstream",
        url: nodeGate.baseUrl,
        status: health?.status === "OPERATIONAL" ? "OPERATIONAL" : "DEGRADED",
        detail: health,
        probed_at: new Date().toISOString(),
      });
    } catch (err) {
      capabilities.push({
        id: "node-gate",
        name: "AI-BI Intelligence Node-Gate",
        kind: "upstream",
        url: nodeGate.baseUrl,
        status: "UNAVAILABLE",
        detail: { reason: String(err) },
        probed_at: new Date().toISOString(),
      });
    }

    res.json({
      service: "command-center",
      probed_at: new Date().toISOString(),
      capabilities,
    });
  });

  app.use("/api/node-gate", nodeGateRouter);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
