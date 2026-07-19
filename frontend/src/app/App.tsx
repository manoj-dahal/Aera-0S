/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoicePresence, VoiceState } from '../components/VoicePresence';
import { CommandPalette } from '../components/CommandPalette';
import { SettingsView } from '../settings/SettingsView';
import { Terminal as TerminalView } from '../terminal/Terminal';
import { WorkspaceView } from '../workspace/Workspace';
import { KnowledgeGraph } from '../knowledge-graph/KnowledgeGraph';
import { Settings, LayoutDashboard, Network, Terminal, Command } from 'lucide-react';
import '../index.css';

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [aeraState, setAeraState] = useState<VoiceState>('connecting');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeView, setActiveView] = useState<'hologram' | 'workspace' | 'knowledge' | 'terminal' | 'settings'>('hologram');
  const [isBooting, setIsBooting] = useState(true);

  // Boot sequence mock
  useEffect(() => {
    // Initialize Audio Engines
    const audioBoot = new Audio('/voices/boot.mp3');
    audioBoot.volume = 0.6;
    
    const bootSequence = async () => {
      // Attempt to play boot sound (some browsers require user interaction first)
      audioBoot.play().catch(e => console.warn("Audio autoplay blocked by browser sandbox policy.", e));

      setAeraState('connecting');
      setLogs(['[System] Booting AERA Kernel...']);
      
      await new Promise(r => setTimeout(r, 800));
      setLogs(prev => [...prev, '[System] Neural network establishing connection...']);
      
      await new Promise(r => setTimeout(r, 800));
      setLogs(prev => [...prev, '[Memory Engine] Running memory check sequence...']);

      await new Promise(r => setTimeout(r, 800));
      setLogs(prev => [...prev, '[Memory Engine] Validated 142 localized semantic nodes.']);
      
      await new Promise(r => setTimeout(r, 800));
      setAeraState('idle');
      setLogs(prev => [...prev, '[AERA] Systems nominal. Awaiting command.']);
      
      // Delay dismissing the boot screen slightly to allow 3D Canvas to mount completely
      await new Promise(r => setTimeout(r, 500));
      setIsBooting(false);
    };
    bootSequence();

    // Global keyboard shortcut for Command Palette
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const executeCommand = async (command: string) => {
    setLogs(prev => [...prev, `[User] ${command}`]);
    
    setAeraState('listening');
    await new Promise(r => setTimeout(r, 500));
    
    setAeraState('thinking');
    setLogs(prev => [...prev, `[Planner Agent] Formulating execution graph for "${command}"`]);
    await new Promise(r => setTimeout(r, 1000));
    
    setAeraState('executing');
    setLogs(prev => [...prev, `[Desktop Agent] Executing procedures...`]);
    await new Promise(r => setTimeout(r, 1500));

    setAeraState('success');
    setLogs(prev => [...prev, `[AERA] Task completed successfully.`]);
    
    // Play the success voice hook
    const audioSuccess = new Audio('/voices/success.mp3');
    audioSuccess.volume = 0.8;
    audioSuccess.play().catch(e => console.warn("Audio play blocked.", e));

    await new Promise(r => setTimeout(r, 4500)); // Delay return to idle to let voice clip finish
    
    setAeraState('idle');
  };

  const handleCommandInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      const command = input;
      setInput('');
      executeCommand(command);
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    })
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden relative">
      
      {/* Global Preloader Overlay */}
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050A14] backdrop-blur-xl"
          >
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center"
            >
               <img src="/aera-logo.png" alt="AERA Core" className="w-32 h-32 mb-12 drop-shadow-[0_0_25px_rgba(72,232,255,0.8)] mix-blend-screen" />
            </motion.div>
            
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 3.2, ease: "linear" }}
                 className="h-full bg-primary shadow-[0_0_15px_#48E8FF]"
               />
            </div>
            
            <p className="text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase mb-16 h-4">
               {logs[logs.length - 1] || "INITIALIZING..."}
            </p>
            
            {/* Developer Credit Signature */}
            <div className="absolute bottom-12 flex flex-col items-center justify-center space-y-1">
              <span className="text-white/30 font-mono text-[9px] tracking-[0.2em] uppercase">Built & Engineered By</span>
              <span className="text-primary font-bold tracking-[0.1em] text-xs uppercase drop-shadow-[0_0_8px_rgba(72,232,255,0.5)]">Manoj Dahal</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Overlay */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        onSelect={executeCommand}
      />

      {/* Global Sidebar Navigation */}
      <nav className="w-16 glass-panel m-4 flex flex-col items-center py-6 space-y-6 z-30 border-white/5 bg-[#050A14]/50">
        <div 
          onClick={() => setActiveView('hologram')}
          className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
            activeView === 'hologram' ? 'bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(72,232,255,0.3)]' : 'bg-white/5 hover:bg-white/10'
          }`}
          title="AERA Core"
        >
          <span className={`font-black text-sm ${activeView === 'hologram' ? 'text-background' : 'text-white'}`}>A</span>
        </div>
        
        <div className="flex-1 flex flex-col space-y-4 mt-8 w-full px-2">
          <button 
            onClick={() => setActiveView('workspace')}
            className={`w-full p-3 rounded-xl flex justify-center items-center transition-all ${activeView === 'workspace' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(72,232,255,0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            title="Workspace"
          >
            <LayoutDashboard size={20} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={() => setActiveView('knowledge')}
            className={`w-full p-3 rounded-xl flex justify-center items-center transition-all ${activeView === 'knowledge' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(72,232,255,0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            title="Knowledge Graph"
          >
            <Network size={20} strokeWidth={1.5} />
          </button>

          <button 
            onClick={() => setActiveView('terminal')}
            className={`w-full p-3 rounded-xl flex justify-center items-center transition-all ${activeView === 'terminal' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(72,232,255,0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            title="System Terminal"
          >
            <Terminal size={20} strokeWidth={1.5} />
          </button>

          <div className="flex-1"></div>

          <button 
            onClick={() => setActiveView('settings')}
            className={`w-full p-3 rounded-xl flex justify-center items-center transition-all ${activeView === 'settings' ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_10px_rgba(72,232,255,0.2)]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
            title="Settings"
          >
            <Settings size={20} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Main Dynamic Viewport */}
      <main className="flex-1 relative flex flex-col">
        
        {activeView === 'hologram' && (
          <>
            {/* Absolute Holographic Background Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-80 z-0">
               <div className="w-[600px] h-[600px]">
                 <VoicePresence state={aeraState} />
               </div>
            </div>

            <div className="w-full h-full flex flex-col z-10 p-6 pt-4">
              {/* Top Header */}
              <motion.header 
                custom={0} initial="hidden" animate="visible" variants={staggerVariants}
                className="h-16 flex justify-between items-center mb-6"
              >
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(72,232,255,0.4)]">
               <span className="text-background font-black text-lg">A</span>
             </div>
             <h1 className="text-2xl font-bold tracking-widest text-white">AERA <span className="text-primary/60 font-mono text-sm ml-1">OS</span></h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsCommandPaletteOpen(true)}
              className="glass-panel px-4 py-2 flex items-center space-x-3 text-white/50 hover:text-white hover:border-primary/50 transition-colors group cursor-pointer"
            >
              <span className="text-xs font-mono group-hover:text-primary transition-colors flex items-center"><Command size={14} className="mr-1"/> ⌘K</span>
              <span className="text-xs tracking-wider uppercase font-semibold">Command</span>
            </button>

            <div className="glass-panel px-4 py-2 flex items-center space-x-3">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Status:</span>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  aeraState === 'idle' ? 'bg-primary shadow-[0_0_8px_#48E8FF]' : 
                  aeraState === 'thinking' ? 'bg-accent shadow-[0_0_8px_#7CF3FF] animate-pulse' : 
                  aeraState === 'executing' ? 'bg-success shadow-[0_0_8px_#32FFB0]' : 'bg-secondary'
                }`}></div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/90">
                  {aeraState}
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Area */}
        <div className="flex-1 flex justify-between items-end pb-8 relative pointer-events-none gap-8">
           
           {/* Left Panel: Context */}
           <motion.div 
             custom={1} initial="hidden" animate="visible" variants={staggerVariants}
             className="w-80 glass-panel p-6 pointer-events-auto flex flex-col min-h-[400px] border-white/5 hover:border-primary/20 transition-colors"
           >
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Active Context</h3>
              <div className="flex-1 flex flex-col space-y-4 font-mono text-xs text-white/60">
                <motion.div whileHover={{ x: 5 }} className="bg-white/5 p-3 rounded-lg border-l-2 border-primary/50 cursor-pointer">
                  <span className="text-primary font-bold block mb-1">Identity Engine</span>
                  Loaded User Preferences. Workspace initialized.
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="bg-white/5 p-3 rounded-lg border-l-2 border-accent/50 cursor-pointer">
                  <span className="text-accent font-bold block mb-1">Memory Vector DB</span>
                  Connected. 142 localized memory embeddings indexed.
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="bg-white/5 p-3 rounded-lg border-l-2 border-white/20 cursor-pointer opacity-50">
                  <span className="text-white font-bold block mb-1">Vision Agent</span>
                  Standby mode. Awaiting screen capture directive.
                </motion.div>
              </div>
           </motion.div>

           {/* Center Interaction Terminal */}
           <motion.div 
             custom={2} initial="hidden" animate="visible" variants={staggerVariants}
             className="w-full max-w-3xl pointer-events-auto flex flex-col justify-end"
           >
              <div className="glass-panel p-6 mb-6 h-64 overflow-y-auto font-mono text-sm flex flex-col justify-end border-white/5">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      key={i} 
                      className={`mb-2 leading-relaxed ${
                        log.startsWith('[User]') ? 'text-white' : 
                        log.startsWith('[AERA]') ? 'text-primary drop-shadow-[0_0_8px_rgba(72,232,255,0.6)] font-semibold' : 
                        log.startsWith('[System]') ? 'text-white/30' : 'text-accent'
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="relative glass-panel group transition-all duration-300 focus-within:shadow-[0_0_30px_rgba(72,232,255,0.2)] focus-within:border-primary/50 hover:border-primary/30">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-primary font-mono opacity-50 group-focus-within:opacity-100 transition-opacity drop-shadow-[0_0_5px_#48E8FF]">AERA &gt;</span>
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommandInput}
                  disabled={aeraState !== 'idle' && aeraState !== 'connecting'}
                  placeholder={aeraState === 'idle' ? "Describe your goal..." : "AERA is processing..."}
                  className="w-full bg-transparent border-none py-5 pl-24 pr-6 text-white placeholder-white/20 focus:outline-none font-sans text-lg tracking-wide disabled:opacity-50"
                />
              </div>
           </motion.div>

           {/* Right Panel: Agents */}
           <motion.div 
             custom={3} initial="hidden" animate="visible" variants={staggerVariants}
             className="w-80 glass-panel p-6 pointer-events-auto flex flex-col min-h-[400px] border-white/5 hover:border-primary/20 transition-colors"
           >
              <h3 className="text-xs font-bold text-white/30 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Swarm Intelligence</h3>
              <div className="space-y-3">
                
                <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg border border-primary/20 shadow-[0_0_10px_rgba(72,232,255,0.1)]">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">👑</span>
                    <span className="text-sm font-medium text-white">Head Agent</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_#32FFB0] animate-pulse"></span>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💻</span>
                    <span className="text-sm font-medium text-white/80">Desktop Agent</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_#32FFB0]"></span>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📝</span>
                    <span className="text-sm font-medium text-white/80">Coding Agent</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-white/20"></span>
                </div>

                <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🧠</span>
                    <span className="text-sm font-medium text-white/80">Memory Agent</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_5px_#32FFB0]"></span>
                </div>

              </div>
           </motion.div>

        </div>
      </div>
          </>
        )}

        {activeView === 'settings' && <SettingsView />}
        {activeView === 'workspace' && <WorkspaceView />}
        {activeView === 'knowledge' && <KnowledgeGraph />}
        {activeView === 'terminal' && <TerminalView logs={logs} />}
        
      </main>
    </div>
  );
};

export default App;