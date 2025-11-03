import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Olive({ scale }) {
  const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3d/olive.glb`);
  const modelRef = useRef();
  
  // Keep original textures from the GLB file
  
  // Multi-axis rotation animation for the round olive pit
  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.elapsedTime;
      
      // Continuous rotation on Y axis (primary)
      modelRef.current.rotation.y = time * 0.4;
      
      // Slower rotation on X axis for tumbling effect
      modelRef.current.rotation.x = time * 0.25;
      
      // Even slower rotation on Z axis for complete 3D movement
      modelRef.current.rotation.z = time * 0.15;
      
      // Subtle bobbing motion (centered)
      modelRef.current.position.y = -0.2 + Math.sin(time * 0.5) * 0.1;
    }
  });
  
  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={scale} 
      position={[0, 0, 0]}
    />
  );
}

const OliveModel = ({ width = '100%', height }) => {
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
          <Olive scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload(`${process.env.PUBLIC_URL}/3d/olive.glb`);

export default OliveModel;
