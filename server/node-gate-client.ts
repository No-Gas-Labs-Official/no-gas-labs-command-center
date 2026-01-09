/**
 * NODE-GATE CLIENT
 * Integration module for AI-BI Intelligence Node-Gate
 * 
 * Wires the Command Center to the Node-Gate for epistemic classification
 * 
 * Copyright (c) 2025-2026 Damien Edward Featherstone / No-Gas-Labs™
 */

export interface InterventionRequest {
  input: string;
}

export interface InterventionResponse {
  original_signal: string;
  epistemic_tag: "V" | "P" | "S" | "M" | "A" | "UNCLASSIFIED";
  tag_name: string;
  confidence_score: number;
  dispatched_persona: "Prometheus" | "Courier" | "Bob" | "REJECTED";
  persona_role: string;
  classification_reasoning: string;
  timestamp: string;
  intervention_id: string;
  featherstonian_context: {
    event_type: string;
    ontology: string;
    jurisdiction: string;
    governor: string;
    narrative_state: string;
    myth_engine: {
      version: string;
      status: string;
      mode: string;
    };
    containment_warning?: {
      active: boolean;
      message: string;
      recommendation: string;
    };
    expansion_notice?: {
      active: boolean;
      message: string;
      recommendation: string;
    };
    bridge_notice?: {
      active: boolean;
      message: string;
      recommendation: string;
    };
  };
  persona_context: {
    name: string;
    archetype: string;
    domain: string;
    operational_mode: string;
    capabilities: string[];
    constraints: string[];
    mythic_reference: string;
    bob_factor?: number;
  };
  ip_protection: {
    license: string;
    copyright: string;
    ai_training_prohibited: boolean;
    commercial_use: string;
    attribution_required: boolean;
  };
  meta: {
    gate_version: string;
    processed_at: string;
    processing_mode: string;
    response_type: string;
  };
}

export interface BobFactorError {
  error: string;
  code: string;
  reason: string;
  bob_factor_level: number;
  recommendation: string;
  timestamp: string;
}

export class NodeGateClient {
  private baseUrl: string;

  constructor(baseUrl: string = "http://localhost:3001") {
    this.baseUrl = baseUrl;
  }

  /**
   * Submit an intervention request to the Node-Gate
   */
  async intervene(input: string): Promise<InterventionResponse> {
    const response = await fetch(`${this.baseUrl}/v1/intervene`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      const error: BobFactorError = await response.json();
      throw new NodeGateError(error);
    }

    return response.json();
  }

  /**
   * Check Node-Gate health status
   */
  async health(): Promise<{
    status: string;
    gate: string;
    version: string;
    narrative_state: string;
    timestamp: string;
  }> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.json();
  }

  /**
   * Get claim taxonomy documentation
   */
  async taxonomy(): Promise<any> {
    const response = await fetch(`${this.baseUrl}/v1/taxonomy`);
    return response.json();
  }
}

export class NodeGateError extends Error {
  public code: string;
  public bobFactorLevel: number;
  public recommendation: string;

  constructor(error: BobFactorError) {
    super(error.reason);
    this.name = "NodeGateError";
    this.code = error.code;
    this.bobFactorLevel = error.bob_factor_level;
    this.recommendation = error.recommendation;
  }
}

// Singleton instance for Command Center
export const nodeGate = new NodeGateClient(
  process.env.NODE_GATE_URL || "http://localhost:3001"
);
