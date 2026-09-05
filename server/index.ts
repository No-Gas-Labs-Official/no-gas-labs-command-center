import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";
import nodeGateRouter from "./routes/node-gate";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  // Every API request is traceable across the Command Center and Node-Gate.
  app.use((req, res, next) => {
    const traceId = req.header("x-trace-id") || randomUUID();
    res.setHeader("x-trace-id", traceId);
    res.locals.traceId = traceId;
    next();
  });

  // API routes must be mounted before the SPA fallback; otherwise the fallback
  // returns index.html for every API call and presents dead controls as working.
  app.use("/api/node-gate", nodeGateRouter);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  return app;
}

async function startServer() {
  const app = createApp();
  const server = createServer(app);
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

if (process.env.NODE_ENV !== "test") {
  startServer().catch((error) => {
    console.error("Command Center failed to start", error);
    process.exitCode = 1;
  });
}
