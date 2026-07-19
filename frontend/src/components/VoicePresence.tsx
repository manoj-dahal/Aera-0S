/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { HolographicCore } from './HolographicCore';
import { AmbientParticleField } from './AmbientParticleField';
import { motion } from 'framer-motion';

export type VoiceState = 'offline' | 'connecting' | 'idle' | 'listening' | 'thinking' | 'speaking' | 'executing' | 'success' | 'warning' | 'error';

interface VoicePresenceProps {
  state: VoiceState;
}

export const VoicePresence: React.FC<VoicePresenceProps> = ({ state }) => {
  if (state === 'offline') {
    return (
      <div className="w-64 h-64 opacity-10 flex items-center justify-center">
        <img src="/aera-logo.png" alt="AERA Offline" className="w-32 h-32 grayscale object-contain drop-shadow-2xl" />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-w-[300px] min-h-[300px] relative flex items-center justify-center">
      
      {/* 2D Overlay Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`absolute w-56 h-56 rounded-full border border-[#48E8FF]/20 
          ${state === 'listening' ? 'animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]' : ''} 
          ${state === 'thinking' ? 'animate-[spin_4s_linear_infinite] border-dashed border-2' : ''}`} 
        />
        <div className="absolute w-64 h-64 rounded-full border border-[#7CF3FF]/10 animate-[spin_10s_linear_infinite_reverse]" />
      </div>

      {/* Layer 5: AERA Eye Symbol (Uploaded Image) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 mix-blend-screen">
        <motion.img 
          src="/aera-logo.png"
          alt="AERA Core"
          animate={{
            scale: state === 'listening' ? [1, 1.15, 1] : state === 'speaking' ? [0.95, 1.05, 0.95] : 1,
            opacity: state === 'thinking' ? [0.7, 1, 0.7] : 1
          }}
          transition={{
            repeat: Infinity,
            duration: state === 'listening' ? 1 : state === 'speaking' ? 0.3 : 2,
            ease: "easeInOut"
          }}
          className={`w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(72,232,255,0.9)] ${
            state === 'error' ? 'hue-rotate-180 brightness-50' : 
            state === 'warning' ? 'hue-rotate-[-60deg]' : ''
          }`}
        />
      </div>

      {/* 3D Holographic Base Layer */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="absolute inset-0 z-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#48E8FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a2be2" />
        
        {/* We keep the mesh slightly larger so the 2D logo sits inside it nicely */}
        <HolographicCore state={state as any} />
        <AmbientParticleField state={state} />

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.2} 
            luminanceSmoothing={0.9} 
            height={300} 
            intensity={state === 'thinking' ? 2.5 : state === 'listening' ? 1.8 : 1.2} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};