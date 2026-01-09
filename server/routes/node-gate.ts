/**
 * NODE-GATE ROUTES
 * Express routes for Node-Gate integration in Command Center
 * 
 * Copyright (c) 2025-2026 Damien Edward Featherstone / No-Gas-Labs™
 */

import { Router, Request, Response } from "express";
import { nodeGate, NodeGateError } from "../node-gate-client";

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

export default router;
