import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Seaweed({ scale }) {
  const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3d/seaweed.glb`);
  const modelRef = useRef();
  
  // Keep original textures from the GLB file
  
  // Gentle floating animation like seaweed in water
  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle swaying motion
      modelRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
      modelRef.current.rotation.x = Math.cos(time * 0.3) * 0.05;
      
      // Subtle floating movement (add to base position)
      modelRef.current.position.y = -1.0 + Math.sin(time * 0.4) * 0.1;
    }
  });
  
  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={scale} 
      position={[0, 1, 0]}
    />
  );
}

const SeaweedModel = ({ width = '100%', height }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Get responsive height and scale based on screen size
  const getResponsiveSettings = () => {
    if (height) return { height, scale: [1.0, 1.0, 1.0] };
    
    const screenWidth = windowSize.width;
    
    if (screenWidth <= 480) {
      return { height: 250, scale: [0.8, 0.8, 0.8] };
    } else if (screenWidth <= 768) {
      return { height: 300, scale: [0.9, 0.9, 0.9] };
    } else if (screenWidth <= 1024) {
      return { height: 300, scale: [1.0, 1.0, 1.0] };
    } else if (screenWidth <= 1200) {
      return { height: 350, scale: [1.1, 1.1, 1.1] };
    } else {
      return { height: 400, scale: [1.2, 1.2, 1.2] };
    }
  };
  
  const { height: containerHeight, scale } = getResponsiveSettings();
  
  return (
    <div 
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: `${containerHeight}px`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        backgroundColor: 'var(--orchid-white)'
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, windowSize.width <= 768 ? 4 : 5], 
          fov: windowSize.width <= 768 ? 50 : 45 
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Seaweed scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload(`${process.env.PUBLIC_URL}/3d/seaweed.glb`);

export default SeaweedModel;
