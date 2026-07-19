/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

interface TerminalProps {
  logs: string[];
}

export const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize xterm.js instance
    const terminal = new XTerm({
      theme: {
        background: 'transparent',
        foreground: '#ffffff',
        cursor: '#00f2fe',
        selectionBackground: 'rgba(0, 242, 254, 0.3)',
      },
      fontFamily: '"Fira Code", monospace',
      fontSize: 12,
      cursorBlink: true,
      disableStdin: true,
      convertEol: true,
    });

    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = terminal;

    const handleResize = () => fitAddon.fit();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      terminal.dispose();
    };
  }, []);

  // Update terminal when new logs arrive
  useEffect(() => {
    if (xtermRef.current && logs.length > 0) {
      const latestLog = logs[logs.length - 1];
      xtermRef.current.writeln(latestLog);
    }
  }, [logs]);

  return (
    <div className="w-full h-full relative group">
      {/* Decorative header */}
      <div className="absolute top-0 left-0 w-full h-6 bg-black/40 border-b border-white/5 flex items-center px-4 justify-between z-10">
        <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">System Out</span>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-error/50"></div>
          <div className="w-2 h-2 rounded-full bg-warning/50"></div>
          <div className="w-2 h-2 rounded-full bg-success/50"></div>
        </div>
      </div>
      <div ref={terminalRef} className="w-full h-full pt-8 p-4 bg-[#050A14]/80 backdrop-blur-md" />
    </div>
  );
};