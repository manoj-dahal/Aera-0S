/**
 * ============================================================================
 * AERA OS
 * MADE By Manoj Dahal
 * Copyright (c) 2026 Manoj Dahal
 * ============================================================================
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HolographicCoreProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking' | 'executing' | 'error' | 'success' | 'warning' | 'connecting' | 'offline';
}

export const HolographicCore: React.FC<HolographicCoreProps> = ({ state }) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate a highly detailed sphere geometry to act as the point-cloud
  // detail = 32 yields ~10,242 vertices perfectly mimicking the reference image
  const { positions, initialPositions } = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(1.4, 32);
    const posAttribute = geometry.attributes.position;
    const posArray = new Float32Array(posAttribute.array);
    return { positions: posArray, initialPositions: new Float32Array(posArray) };
  }, []);

  useFrame((scene) => {
    if (!pointsRef.current) return;
    
    const time = scene.clock.getElapsedTime();

    // Setup base animation variables based on AERA's Voice State
    let speed = 1.0;
    let distortionAmount = 0.05;
    let frequency = 4.0;
    let color = new THREE.Color('#48E8FF');

    switch (state) {
      case 'connecting':
        speed = 1.0;
        distortionAmount = 0.08;
        frequency = 2.5;
        color = new THREE.Color('#4facfe'); // Memory check syncing tone
        break;
      case 'idle':
        speed = 0.5;
        distortionAmount = 0.05;
        frequency = 3.0;
        break;
      case 'listening':
        speed = 2.5;
        distortionAmount = 0.15;
        frequency = 6.0;
        color = new THREE.Color('#ffffff'); // High contrast while listening
        break;
      case 'thinking':
        speed = 1.5;
        distortionAmount = 0.1;
        frequency = 8.0;
        color = new THREE.Color('#7CF3FF');
        break;
      case 'speaking':
        speed = 4.0;
        distortionAmount = 0.25;
        frequency = 5.0; // Rapid audio-reactive waveform emulation
        break;
      case 'executing':
      case 'success':
        speed = 2.0;
        distortionAmount = 0.12;
        frequency = 4.0;
        color = new THREE.Color('#32FFB0'); // Success Green
        break;
      case 'error':
        speed = 0.2;
        distortionAmount = 0.3;
        frequency = 2.0;
        color = new THREE.Color('#FF4D6D'); // Error Red
        break;
      default:
        break;
    }

    // Apply 3D wave displacement to every point in the sphere
    for (let i = 0; i < positions.length; i += 3) {
      const ix = initialPositions[i];
      const iy = initialPositions[i+1];
      const iz = initialPositions[i+2];

      // 3D Sine Wave Noise generation based on position and time
      const noise = 
        Math.sin(ix * frequency + time * speed) * 
        Math.cos(iy * frequency + time * speed) * 
        Math.sin(iz * frequency + time * speed);
        
      // Displace the vertex along its normal (which for a sphere at origin is just its normalized position)
      const displacement = 1 + noise * distortionAmount;

      positions[i] = ix * displacement;
      positions[i+1] = iy * displacement;
      positions[i+2] = iz * displacement;
    }

    // Update the GPU buffer
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Base rotation
    pointsRef.current.rotation.y = time * (speed * 0.1);
    pointsRef.current.rotation.z = time * 0.05;

    // Smoothly interpolate the color state
    (pointsRef.current.material as THREE.PointsMaterial).color.lerp(color, 0.1);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015} // Thin, dense dots exactly like the reference image
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};