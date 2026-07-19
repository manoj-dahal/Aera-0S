/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';

export interface NeuralNode {
  id: string;
  data: any;
  synapticWeight: number;
  connections: string[]; // IDs of connected nodes
  lastFired: number;
}

export class NeuralDB {
  private static instance: NeuralDB;
  private dbPath: string;
  private nodes: Map<string, NeuralNode>;

  private constructor() {
    this.dbPath = path.join(process.cwd(), 'database', 'neural', 'synapses.json');
    this.nodes = new Map();
    this.initializeDB();
  }

  public static getInstance(): NeuralDB {
    if (!NeuralDB.instance) {
      NeuralDB.instance = new NeuralDB();
    }
    return NeuralDB.instance;
  }

  private initializeDB() {
    console.log(`[Neural DB] Booting localized Graph Database...`);
    if (fs.existsSync(this.dbPath)) {
      const raw = fs.readFileSync(this.dbPath, 'utf8');
      const parsed = JSON.parse(raw);
      for (const [k, v] of Object.entries(parsed)) {
        this.nodes.set(k, v as NeuralNode);
      }
      console.log(`[Neural DB] Loaded ${this.nodes.size} persistent synaptic nodes.`);
    } else {
      console.log(`[Neural DB] Genesis state. No previous pathways detected.`);
      this.saveState();
    }
  }

  private saveState() {
    const obj = Object.fromEntries(this.nodes);
    fs.writeFileSync(this.dbPath, JSON.stringify(obj, null, 2));
  }

  /**
   * Encodes a new memory into the graph.
   */
  public encodeMemory(id: string, data: any, connections: string[] = []) {
    if (this.nodes.has(id)) {
      const node = this.nodes.get(id)!;
      node.synapticWeight += 0.1; // Long Term Potentiation
      node.lastFired = Date.now();
      
      connections.forEach(c => {
        if (!node.connections.includes(c)) node.connections.push(c);
      });
    } else {
      this.nodes.set(id, {
        id,
        data,
        synapticWeight: 1.0,
        connections,
        lastFired: Date.now()
      });
    }
    
    this.saveState();
  }

  /**
   * Traverses the graph to find connected insights (simulated thought process).
   */
  public traversePathway(startId: string, depth = 2): any[] {
    const results: any[] = [];
    const visited = new Set<string>();

    const search = (nodeId: string, currentDepth: number) => {
      if (currentDepth > depth || visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = this.nodes.get(nodeId);
      if (node) {
        // Boost synaptic weight just by recalling it!
        node.synapticWeight += 0.05;
        node.lastFired = Date.now();
        results.push(node.data);
        
        for (const connectedId of node.connections) {
          search(connectedId, currentDepth + 1);
        }
      }
    };

    search(startId, 0);
    this.saveState();
    return results;
  }
}
