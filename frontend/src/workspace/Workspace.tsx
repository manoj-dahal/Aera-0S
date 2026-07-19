/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React from 'react';
import { motion } from 'framer-motion';
import { UploadDropzone } from '../components/UploadDropzone';

export const WorkspaceView: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-6 space-y-6 overflow-hidden">
      
      {/* Search / Context Header */}
      <div className="w-full h-12 glass-panel flex items-center px-4 relative border-white/5">
        <span className="text-white/30 text-xl absolute left-4">⚲</span>
        <input 
          type="text" 
          placeholder="Search global AERA OS memory graph..." 
          className="w-full h-full bg-transparent border-none pl-8 text-white/80 placeholder-white/20 focus:outline-none font-mono text-sm"
          disabled
        />
        <div className="absolute right-4 flex space-x-2">
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-primary/20 text-primary border border-primary/30 shadow-[0_0_8px_rgba(72,232,255,0.2)]">Local</span>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-white/5 text-white/40">Cloud</span>
        </div>
      </div>

      {/* Grid Dashboard */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Active Projects Pane */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
          className="col-span-8 glass-panel flex flex-col overflow-hidden border-white/5"
        >
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Active Workspace Projects</h3>
            <span className="text-[10px] text-white/30">View All</span>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            
            {/* Project Card 1 */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00BFFF] to-[#8a2be2] flex items-center justify-center text-xs">⚛</div>
                <span className="text-xs font-mono text-white/40">2h ago</span>
              </div>
              <h4 className="font-semibold text-white/90 mb-1">AERA-OS Desktop</h4>
              <p className="text-xs text-white/40 mb-3">Electron + React + Vite AI Agent platform</p>
              <div className="flex space-x-2">
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/60">TypeScript</span>
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/60">Node.js</span>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF4D6D] to-[#FFC857] flex items-center justify-center text-xs">ps</div>
                <span className="text-xs font-mono text-white/40">1d ago</span>
              </div>
              <h4 className="font-semibold text-white/90 mb-1">Brand Assets V2</h4>
              <p className="text-xs text-white/40 mb-3">Photoshop export batching workflows</p>
              <div className="flex space-x-2">
                <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-white/60">Design</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* System Analytics Pane */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="col-span-4 glass-panel flex flex-col border-white/5"
        >
          <div className="p-4 border-b border-white/5 bg-white/[0.02]">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Health Monitor</h3>
          </div>
          <div className="p-4 space-y-6 flex-1 flex flex-col justify-center">
            
            <div>
              <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                <span>CPU [AERA Core]</span>
                <span className="text-success">14%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[14%] h-full bg-success shadow-[0_0_8px_#32FFB0]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                <span>Memory [Vector DB]</span>
                <span className="text-warning">68%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[68%] h-full bg-warning shadow-[0_0_8px_#FFC857]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                <span>Agent Network</span>
                <span className="text-primary">100%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-full h-full bg-primary shadow-[0_0_8px_#48E8FF]"></div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* File Ingestion Pane */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="col-span-12 glass-panel flex flex-col border-white/5 p-6"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Knowledge Base Upload</h3>
              <p className="text-xs text-white/30">Drag PDF, Markdown, or Code files directly into AERA&apos;s localized vector memory.</p>
            </div>
          </div>
          <UploadDropzone />
        </motion.div>
        
      </div>
    </div>
  );
};