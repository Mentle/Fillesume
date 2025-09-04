import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ mouse, scale, isDragging }) {
  const { scene } = useGLTF(process.env.NODE_ENV === 'production' ? './fillesume_3dlogo.glb' : `${process.env.PUBLIC_URL}/fillesume_3dlogo.glb`);
  const modelRef = useRef();
  const gooeyRef = useRef({ scaleX: 1, scaleY: 1, scaleZ: 1 });
  const meltRef = useRef({ intensity: 0, time: 0 });
  
  // Apply Night Shadz color to all materials
  useEffect(() => {
    if (scene) {
      const nightShadzColor = new THREE.Color('#AE3647');
      
      scene.traverse((child) => {
        if (child.isMesh) {
          // Create a new material with pure Night Shadz color - no shading
          child.material = new THREE.MeshBasicMaterial({
            color: nightShadzColor,
          });
        }
      });
    }
  }, [scene]);
  
  useFrame((state) => {
    if (modelRef.current && mouse) {
      // Subtle tilt based on mouse position
      const targetRotationY = (mouse.x - 0.5) * 0.3;
      
      modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.05;
      const targetRotationX = (mouse.y - 0.5) * 0.2;
      
      modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.05;
      
      // Psychedelic spiral/wave effect - always active
      const time = state.clock.elapsedTime;
      
      // Set intensity based on interaction state
      if (isDragging) {
        // Increase effect intensity when interacting
        meltRef.current.intensity = Math.min(meltRef.current.intensity + 0.025, 1.0);
      } else {
        // Keep subtle animation when not interacting
        meltRef.current.intensity = Math.max(meltRef.current.intensity - 0.01, 0.3);
      }
      
      const intensity = meltRef.current.intensity;
      
      // Smooth 70s-style psychedelic waves with slower frequencies
      const slowTime = time * 0.8; // Slower overall movement for smoother feel
      
      // Uzumaki-style spiral effect - subtle but hypnotic
      const spiralPhase1 = Math.sin(slowTime * 1.2) * 0.08 * intensity;
      const spiralPhase2 = Math.cos(slowTime * 0.9 + Math.PI/4) * 0.06 * intensity;
      const spiralRotation = spiralPhase1 + spiralPhase2;
      
      // Smooth flowing waves with 70s psychedelic feel
      const wave1 = Math.sin(slowTime * 2.1) * 0.15 * intensity;
      const wave2 = Math.sin(slowTime * 1.7 + Math.PI/3) * 0.12 * intensity;
      const wave3 = Math.cos(slowTime * 2.4 + Math.PI/2) * 0.1 * intensity;
      const wave4 = Math.sin(slowTime * 1.3 + Math.PI/6) * 0.08 * intensity;
      
      // Gentle wave combinations for fluid movement
      const waveX = wave1 + wave2 * 0.6 + Math.sin(slowTime * 0.5) * 0.05 * intensity;
      const waveY = wave2 + wave3 * 0.7 + Math.cos(slowTime * 0.7) * 0.04 * intensity;
      const waveZ = wave3 + wave1 * 0.5 + Math.sin(slowTime * 0.3) * 0.03 * intensity;
      
      // Subtle breathing effect for organic feel
      const pulse1 = Math.sin(slowTime * 1.1) * 0.06 * intensity;
      const pulse2 = Math.cos(slowTime * 0.9 + Math.PI/4) * 0.05 * intensity;
      const pulse3 = Math.sin(slowTime * 1.4 + Math.PI/3) * 0.04 * intensity;
      
      const scaleX = 1 + pulse1 + waveX * 0.25;
      const scaleY = 1 + pulse2 + waveY * 0.2;
      const scaleZ = 1 + pulse3 + waveZ * 0.25;
      
      // Smoother interpolation for fluid movement
      gooeyRef.current.scaleX += (scaleX - gooeyRef.current.scaleX) * 0.08;
      gooeyRef.current.scaleY += (scaleY - gooeyRef.current.scaleY) * 0.08;
      gooeyRef.current.scaleZ += (scaleZ - gooeyRef.current.scaleZ) * 0.08;
      
      modelRef.current.scale.set(
        scale[0] * gooeyRef.current.scaleX,
        scale[1] * gooeyRef.current.scaleY,
        scale[2] * gooeyRef.current.scaleZ
      );
      
      // Apply spiral rotation
      modelRef.current.rotation.z = spiralRotation;
      
      // Smoother wavy position movement for 70s feel
      modelRef.current.position.x = waveX * 0.18;
      modelRef.current.position.y = 0.5 + waveY * 0.12;
      modelRef.current.position.z = waveZ * 0.08;
    }
  });
  
  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={scale} 
      position={[0, 0.5, 0]}
    />
  );
}

const FillesumeModel = () => {
  const [mouse, setMouse] = React.useState({ x: 0.5, y: 0.5 });
  const [windowSize, setWindowSize] = React.useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Calculate responsive scale based on screen size
  const getScale = () => {
    if (windowSize.width <= 480) {
      return [0.4, 0.4, 0.4]; // Small mobile
    } else if (windowSize.width <= 768) {
      return [0.6, 0.6, 0.6]; // Mobile/tablet
    } else if (windowSize.width <= 1024) {
      return [1, 1, 1]; // Tablet/small desktop
    } else if (windowSize.width <= 1440) {
      return [1.2, 1.2, 1.2]; // Desktop
    } else {
      return [1.2, 1.2, 1.2]; // Large desktop
    }
  };
  
  // Calculate responsive camera settings
  const getCameraSettings = () => {
    if (windowSize.width <= 768) {
      return { position: [0, 0, 5], fov: 50 };
    } else {
      return { position: [0, 0, 6], fov: 45 };
    }
  };
  
  const handleMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setMouse({ x, y });
  }, []);
  
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleTouchMove = (event) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    }
  };
  
  const handleTouchStart = useCallback(() => {
    setIsDragging(true);
  }, []);
  
  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const cameraSettings = getCameraSettings();
  
  return (
    <div 
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%',
        zIndex: 2
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      <Canvas
        camera={cameraSettings}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Model mouse={mouse} scale={getScale()} isDragging={isDragging} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('./fillesume_3dlogo.glb');

export default FillesumeModel;
