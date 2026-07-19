/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Settings, Code2, PlaySquare, Network, Cpu } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (command: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  const commands = [
    { category: 'System', name: 'Enter Sleep Mode', icon: <Moon size={20} /> },
    { category: 'System', name: 'Open System Settings', icon: <Settings size={20} /> },
    { category: 'Execution', name: 'Launch VS Code Workspace', icon: <Code2 size={20} /> },
    { category: 'Execution', name: 'Create React + Vite Project', icon: <PlaySquare size={20} /> },
    { category: 'Memory', name: 'Search Global Knowledge Graph', icon: <Network size={20} /> },
    { category: 'Agents', name: 'View Active Agent Network', icon: <Cpu size={20} /> },
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // Handle keyboard shortcut (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-background/60 backdrop-blur-sm"
          />
          
          {/* Palette Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute z-50 top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl"
          >
            <div className="glass-panel overflow-hidden border-primary/30 shadow-[0_0_50px_rgba(0,191,255,0.15)] flex flex-col">
              
              {/* Search Input */}
              <div className="relative border-b border-white/10 p-4">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary text-xl">⌘</span>
                <input 
                  autoFocus
                  type="text"
                  placeholder="Type a command or ask AERA..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent border-none text-lg text-white placeholder-white/30 pl-10 pr-4 focus:outline-none font-sans"
                />
              </div>

              {/* Command List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-white/40 font-mono text-sm">
                    No matching modules found in AERA network.
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ scale: 1.01, backgroundColor: 'rgba(72, 232, 255, 0.1)' }}
                      onClick={() => {
                        onSelect(cmd.name);
                        onClose();
                      }}
                      className="flex items-center px-4 py-3 cursor-pointer rounded-lg transition-colors group"
                    >
                      <span className="mr-4 text-xl opacity-80 group-hover:opacity-100">{cmd.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs text-primary/60 uppercase tracking-widest font-mono mb-0.5">{cmd.category}</span>
                        <span className="text-sm text-white/90 group-hover:text-primary transition-colors">{cmd.name}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-3 bg-black/20 flex justify-between items-center text-xs text-white/40 font-mono">
                <div className="flex space-x-4">
                  <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">↑</kbd> <kbd className="bg-white/10 px-1.5 py-0.5 rounded">↓</kbd> to navigate</span>
                  <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">↵</kbd> to select</span>
                </div>
                <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded">ESC</kbd> to dismiss</span>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};