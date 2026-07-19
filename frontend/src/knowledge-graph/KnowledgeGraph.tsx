/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React, { useRef, useMemo, useState, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';


// Mock data representing AERA's localized vector memory and relationships
const generateMockData = () => {
  const nodes = [
    { id: 'User', group: 1, val: 20 },
    { id: 'Workspace', group: 2, val: 15 },
    { id: 'Preferences', group: 2, val: 10 },
    { id: 'Dark Theme', group: 3, val: 5 },
    { id: 'VS Code', group: 3, val: 8 },
    { id: 'Project A', group: 4, val: 12 },
    { id: 'Project B', group: 4, val: 12 },
    { id: 'Electron', group: 5, val: 6 },
    { id: 'React', group: 5, val: 6 },
    { id: 'MemoryAgent', group: 6, val: 18 },
    { id: 'DesktopAgent', group: 6, val: 18 },
    { id: 'PlannerAgent', group: 6, val: 18 },
  ];

  const links = [
    { source: 'User', target: 'Preferences' },
    { source: 'User', target: 'Workspace' },
    { source: 'Preferences', target: 'Dark Theme' },
    { source: 'Preferences', target: 'VS Code' },
    { source: 'Workspace', target: 'Project A' },
    { source: 'Workspace', target: 'Project B' },
    { source: 'Project A', target: 'Electron' },
    { source: 'Project A', target: 'React' },
    { source: 'MemoryAgent', target: 'User' },
    { source: 'DesktopAgent', target: 'VS Code' },
    { source: 'PlannerAgent', target: 'Workspace' },
  ];

  return { nodes, links };
};

export const KnowledgeGraph: React.FC = () => {
  const fgRef = useRef<any>();
  const data = useMemo(() => generateMockData(), []);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle auto-resizing
  useEffect(() => {
    const parent = document.getElementById('kg-container');
    if (parent) {
      setDimensions({ width: parent.clientWidth, height: parent.clientHeight });
    }

    const handleResize = () => {
      if (parent) setDimensions({ width: parent.clientWidth, height: parent.clientHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="kg-container" className="w-full h-full relative group">
      
      {/* Overlay Stats UI */}
      <div className="absolute top-4 left-4 z-10 glass-panel p-4 border-white/5 pointer-events-none">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Semantic Topology</h3>
        <div className="flex flex-col space-y-1 font-mono text-xs text-white/60">
          <span>Nodes: <span className="text-primary">{data.nodes.length}</span></span>
          <span>Edges: <span className="text-accent">{data.links.length}</span></span>
          <span>Engine: Vector DB</span>
        </div>
      </div>

      <div className="absolute inset-0 bg-[#050A14] pointer-events-auto">
        <ForceGraph3D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={data}
          nodeLabel="id"
          nodeColor={(node: any) => {
            if (node.group === 1) return '#FF4D6D'; // Core User
            if (node.group === 6) return '#32FFB0'; // Agents
            return '#00BFFF'; // Knowledge
          }}
          nodeResolution={16}
          linkWidth={1}
          linkColor={() => 'rgba(72, 232, 255, 0.2)'}
          backgroundColor="#050A14"
          enableNodeDrag={false}
          onEngineStop={() => {
            // Auto-rotate slowly
            if (fgRef.current) {
              fgRef.current.cameraPosition(
                { x: 0, y: 0, z: 150 }, 
                { x: 0, y: 0, z: 0 }, 
                2000
              );
            }
          }}
        />
      </div>
    </div>
  );
};