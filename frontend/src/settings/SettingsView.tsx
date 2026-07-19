/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React, { useState } from 'react';

import { Key, Sparkles, Share2, CheckCircle2, Eye, ShieldCheck, Lock, Upload, Download, Trash2, CheckSquare, Globe, MoreHorizontal, Cpu, Zap, BellRing } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [plannerModel, setPlannerModel] = useState('llama3.1-405b-reasoning');
  const [verifierModel, setVerifierModel] = useState('claude-3-5-sonnet-20240620');
  const [visionModel, setVisionModel] = useState('gemini-1.5-pro');

  return (
    <div className="w-full h-full p-8 overflow-y-auto flex flex-col gap-6 text-white/90">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-[#131A26]/80 p-6 rounded-2xl border border-white/5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl border border-yellow-500/20">
            <Key size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white mb-1">API Keys</h1>
            <p className="text-sm text-white/50">Manage your API keys securely. They are encrypted and stored locally.</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          Save All Changes
        </button>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        
        {/* Left Column (Cards) */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-6">
            
            {/* Google Gemini Card */}
            <div className="bg-[#131A26] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 relative group shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-blue-400"><Sparkles size={24} /></div>
                  <div>
                    <h3 className="font-semibold text-sm">Google Gemini</h3>
                    <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-medium mt-0.5">
                      <CheckCircle2 size={12} /> Connected
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={visionModel}
                    onChange={(e) => setVisionModel(e.target.value)}
                    className="bg-[#0A0E17] text-xs text-white/70 border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-primary/50"
                  >
                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                    <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                  </select>
                  <button className="text-white/30 hover:text-white/70"><MoreHorizontal size={18} /></button>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">API Key</label>
                <div className="relative">
                  <input type="password" value="••••••••••••••••••••••••••••" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-emerald-500/50 text-white/70" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"><Eye size={16} /></button>
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-xs text-white/40">Last used: 2h ago</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs transition-colors text-white/70">Test Connection</button>
                  <button className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-xs font-medium transition-colors text-white">Save</button>
                </div>
              </div>
            </div>

            {/* Groq Cloud Card */}
            <div className="bg-[#131A26] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 relative group shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-[#f55036] font-black text-xl tracking-tighter">groq</div>
                  <div>
                    <h3 className="font-semibold text-sm">Groq Cloud</h3>
                    <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-medium mt-0.5">
                      <CheckCircle2 size={12} /> Connected
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={plannerModel}
                    onChange={(e) => setPlannerModel(e.target.value)}
                    className="bg-[#0A0E17] text-xs text-white/70 border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-primary/50"
                  >
                    <option value="llama3.1-405b-reasoning">Llama 3.1 (405B)</option>
                    <option value="llama3-70b-8192">Llama 3 (70B)</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7b</option>
                  </select>
                  <button className="text-white/30 hover:text-white/70"><MoreHorizontal size={18} /></button>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">API Key</label>
                <div className="relative">
                  <input type="password" value="••••••••••••••••••••••••••••" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-emerald-500/50 text-white/70" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"><Eye size={16} /></button>
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-xs text-white/40">Last used: 1h ago</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs transition-colors text-white/70">Test Connection</button>
                  <button className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-xs font-medium transition-colors text-white">Save</button>
                </div>
              </div>
            </div>

            {/* Hugging Face Card */}
            <div className="bg-[#131A26] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 relative group shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-2xl leading-none">🤗</div>
                  <div>
                    <h3 className="font-semibold text-sm">Hugging Face</h3>
                    <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-medium mt-0.5">
                      <CheckCircle2 size={12} /> Connected
                    </div>
                  </div>
                </div>
                <button className="text-white/30 hover:text-white/70"><MoreHorizontal size={18} /></button>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Token</label>
                <div className="relative">
                  <input type="password" value="••••••••••••••••••••••••••••" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-emerald-500/50 text-white/70" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"><Eye size={16} /></button>
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-xs text-white/40">Last used: 3d ago</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs transition-colors text-white/70">Test Connection</button>
                  <button className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-xs font-medium transition-colors text-white">Save</button>
                </div>
              </div>
            </div>

            {/* Anthropic Card */}
            <div className="bg-[#131A26] border border-white/5 rounded-2xl p-5 flex flex-col gap-4 relative group shadow-md">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="text-orange-400 font-serif font-black text-xl">A</div>
                  <div>
                    <h3 className="font-semibold text-sm">Anthropic</h3>
                    <div className="flex items-center gap-1 text-emerald-500 text-[11px] font-medium mt-0.5">
                      <CheckCircle2 size={12} /> Connected
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={verifierModel}
                    onChange={(e) => setVerifierModel(e.target.value)}
                    className="bg-[#0A0E17] text-xs text-white/70 border border-white/10 rounded px-2 py-1 focus:outline-none focus:border-primary/50"
                  >
                    <option value="claude-3-5-sonnet-20240620">Claude 3.5 Sonnet</option>
                    <option value="claude-3-opus-20240229">Claude 3 Opus</option>
                  </select>
                  <button className="text-white/30 hover:text-white/70"><MoreHorizontal size={18} /></button>
                </div>
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">API Key</label>
                <div className="relative">
                  <input type="password" value="••••••••••••••••••••••••••••" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:outline-none focus:border-emerald-500/50 text-white/70" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"><Eye size={16} /></button>
                </div>
              </div>
              <div className="flex justify-between items-end mt-2">
                <span className="text-xs text-white/40">Last used: 5h ago</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs transition-colors text-white/70">Test Connection</button>
                  <button className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-xs font-medium transition-colors text-white">Save</button>
                </div>
              </div>
            </div>
            
          </div>

          {/* Model Discovery & Auto-Suggestion Panel */}
          <div className="bg-[#131A26] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="text-primary"><Zap size={20} /></div>
              <div>
                <h3 className="font-semibold text-sm">Model Discovery</h3>
                <p className="text-xs text-white/50 mt-0.5">AERA automatically checks the hub for newer, faster, or smarter models.</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[#0A0E17] border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:border-primary/30 transition-colors">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white/90">Llama 3.1 (405B)</span>
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-primary/20 text-primary border border-primary/30">New</span>
                  </div>
                  <span className="text-xs text-white/40">Frontier open-source reasoning by Meta. Perfect for the Planner Agent.</span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-primary/20 hover:text-primary text-xs font-medium transition-colors text-white/70 border border-white/10 hover:border-primary/50">
                  Switch
                </button>
              </div>

              <div className="bg-[#0A0E17] border border-white/5 rounded-xl p-4 flex justify-between items-center group hover:border-accent/30 transition-colors">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white/90">Claude 3.5 Opus</span>
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-accent/20 text-accent border border-accent/30">Upcoming</span>
                  </div>
                  <span className="text-xs text-white/40">Next-generation heavy reasoning by Anthropic.</span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 text-xs font-medium transition-colors text-white/30 border border-white/5 cursor-not-allowed">
                  Notify Me
                </button>
              </div>
            </div>
          </div>

          {/* Custom Online Model Card */}
          <div className="bg-[#131A26] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-md">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="text-emerald-400"><Globe size={24} /></div>
                <div>
                  <h3 className="font-semibold text-sm">Custom Online Model</h3>
                  <p className="text-xs text-white/50 mt-1">Connect to any OpenAI-compatible endpoint or custom provider.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/60 font-medium">Enable Custom Provider</span>
                <div className="w-9 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Provider Name</label>
                <input type="text" value="AERA Cloud" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 px-3 text-sm focus:outline-none text-white/80" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Base URL</label>
                <input type="text" value="https://api.example.com/v1" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 px-3 text-sm focus:outline-none text-white/80" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">API Key</label>
                <div className="relative">
                  <input type="password" value="••••••••••••••••" readOnly className="w-full bg-[#0A0E17] border border-white/5 rounded-lg py-2.5 pl-3 pr-10 text-sm focus:outline-none text-white/80" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80"><Eye size={16} /></button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-3 border-t border-white/5 pt-4">
              <div className="flex items-center gap-2 text-emerald-500 text-xs font-medium">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                Connection successful <span className="text-white/30 mx-1">•</span> <span className="text-white/40">2h ago</span>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-xs transition-colors text-white/70">Test Connection</button>
                <button className="px-6 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.2)] text-xs font-medium transition-colors text-white">Save Custom Model</button>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column (Privacy + Quick Actions) */}
        <div className="w-80 flex flex-col gap-6">
          
          {/* Privacy Box */}
          <div className="bg-[#131A26] border border-white/5 rounded-2xl p-6 flex flex-col gap-4 shadow-md">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-white/90 mb-2 text-sm">Your Privacy Matters</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Your API keys are encrypted and stored only on this device. They are never sent to any server or third party. You are in full control.
                </p>
              </div>
            </div>
            <div className="mt-2 pt-4 border-t border-white/5 flex items-center gap-2 text-emerald-500 text-xs font-medium">
              <Lock size={14} /> Encrypted Local Vault
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#131A26] border border-white/5 rounded-2xl p-5 shadow-md">
            <h3 className="font-semibold text-white/90 mb-4 px-1 text-sm">Quick Actions</h3>
            <div className="flex flex-col">
              
              <button className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-white/40 group-hover:text-white/80"><Upload size={18} /></div>
                  <div className="text-left">
                    <div className="text-sm text-white/90">Export Encrypted Keys</div>
                    <div className="text-[10px] text-white/40">Backup your keys to an encrypted file</div>
                  </div>
                </div>
                <div className="text-white/20 group-hover:text-white/60 text-lg">›</div>
              </button>

              <button className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-white/40 group-hover:text-white/80"><Download size={18} /></div>
                  <div className="text-left">
                    <div className="text-sm text-white/90">Import Encrypted Keys</div>
                    <div className="text-[10px] text-white/40">Restore keys from an encrypted file</div>
                  </div>
                </div>
                <div className="text-white/20 group-hover:text-white/60 text-lg">›</div>
              </button>

              <button className="flex items-center justify-between p-3 rounded-xl hover:bg-red-500/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-red-400/70 group-hover:text-red-400"><Trash2 size={18} /></div>
                  <div className="text-left">
                    <div className="text-sm text-red-200 group-hover:text-red-400 transition-colors">Clear All Keys</div>
                    <div className="text-[10px] text-white/40">Remove all saved API keys</div>
                  </div>
                </div>
                <div className="text-white/20 group-hover:text-red-400/60 text-lg">›</div>
              </button>

              <button className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-500/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-500/70 group-hover:text-emerald-500"><CheckSquare size={18} /></div>
                  <div className="text-left">
                    <div className="text-sm text-emerald-100 group-hover:text-emerald-400 transition-colors">Validate All Keys</div>
                    <div className="text-[10px] text-white/40">Check all keys for validity</div>
                  </div>
                </div>
                <div className="text-white/20 group-hover:text-emerald-500/60 text-lg">›</div>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};