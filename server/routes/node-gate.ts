/**
 * NODE-GATE ROUTES
 * Express routes for Node-Gate integration in Command Center
 * 
 * Copyright (c) 2025-2026 Damien Edward Featherstone / No-Gas-Labs™
 */

import { Router, Request, Response } from "express";
import { nodeGate, NodeGateError, NodeGateUpstreamError } from "../node-gate-client";

const router = Router();

/**
 * POST /api/node-gate/intervene
 * Proxy intervention requests to the Node-Gate
 */
router.post("/intervene", async (req: Request, res: Response) => {
  try {
    const { input } = req.body;

    if (!input) {
      return res.status(400).json({
        error: "MISSING_INPUT",
        message: "Input field is required",
      });
    }

    const result = await nodeGate.intervene(input);
    res.json(result);
  } catch (error) {
    if (error instanceof NodeGateError) {
      return res.status(422).json({
        error: error.code,
        message: error.message,
        bob_factor_level: error.bobFactorLevel,
        recommendation: error.recommendation,
      });
    }

    console.error("Node-Gate intervention error:", error);
    res.status(500).json({
      error: "NODE_GATE_UNAVAILABLE",
      message: "Failed to connect to Node-Gate",
    });
  }
});

/**
 * GET /api/node-gate/health
 * Check Node-Gate health status
 */
router.get("/health", async (_req: Request, res: Response) => {
  try {
    const health = await nodeGate.health();
    res.json(health);
  } catch (error) {
    res.status(503).json({
      status: "UNAVAILABLE",
      message: "Node-Gate is not responding",
    });
  }
});

/**
 * GET /api/node-gate/taxonomy
 * Get claim taxonomy documentation
 */
router.get("/taxonomy", async (_req: Request, res: Response) => {
  try {
    const taxonomy = await nodeGate.taxonomy();
    res.json(taxonomy);
  } catch (error) {
    res.status(503).json({
      error: "NODE_GATE_UNAVAILABLE",
      message: "Failed to retrieve taxonomy",
    });
  }
});

/**
 * POST /api/node-gate/deliberate
 * Proxy multi-persona council deliberation to Node-Gate v2.
 *
 * Forwards the REAL deliberation engine — persona selection, structured
 * responses, executed challenge exchanges, and synthesis. The Node-Gate
 * labels the processing mode in the response (deterministic vs
 * model-backed); we surface that label rather than claiming one.
 */
router.post("/deliberate", async (req: Request, res: Response) => {
  try {
    const { input, persona_ids = [], max_personas = 5 } = req.body;

    if (!input || typeof input !== "string") {
      return res.status(400).json({
        error: "MISSING_INPUT",
        message: "Input field is required (non-empty string)",
      });
    }

    const result = await nodeGate.deliberate(input, persona_ids, max_personas);
    res.json(result);
  } catch (error) {
    if (error instanceof NodeGateUpstreamError) {
      return res.status(error.status).json({
        error: "NODE_GATE_REJECTED",
        message: error.message,
      });
    }

    if (error instanceof NodeGateError) {
      return res.status(422).json({
        error: error.code,
        message: error.message,
        bob_factor_level: error.bobFactorLevel,
        recommendation: error.recommendation,
      });
    }

    console.error("Node-Gate deliberation error:", error);
    res.status(500).json({
      error: "NODE_GATE_UNAVAILABLE",
      message: "Failed to connect to Node-Gate",
    });
  }
});

/**
 * POST /api/node-gate/gate-counsel
 * Proxy an exact AGP decision request to the 25-persona Guild.
 * Advisory only: this path has no authority to sign or mutate AGP state.
 */
router.post("/gate-counsel", async (req: Request, res: Response) => {
  try {
    const { request, question = "" } = req.body || {};
    if (!request || typeof request !== "object") {
      return res.status(400).json({
        error: "MISSING_GATE_REQUEST",
        message: "Exact AGP gate request object is required",
      });
    }

    const result = await nodeGate.counselGate(request, typeof question === "string" ? question : "");
    res.json(result);
  } catch (error) {
    if (error instanceof NodeGateUpstreamError) {
      return res.status(error.status).json({
        error: "NODE_GATE_REJECTED",
        message: error.message,
      });
    }

    console.error("Node-Gate gate-counsel error:", error);
    res.status(500).json({
      error: "NODE_GATE_UNAVAILABLE",
      message: "Failed to consult the 25-persona Guild",
    });
  }
});

export default router;
