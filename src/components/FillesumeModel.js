import React, { Suspense, useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ mouse, scale, isDragging }) {
  const { scene } = useGLTF(process.env.NODE_ENV === 'production' ? './fillesume_3dlogo.glb' : `${process.env.PUBLIC_URL}/fillesume_3dlogo.glb`);
  const modelRef = useRef();
  const gooeyRef = useRef({ scaleX: 1, scaleY: 1, scaleZ: 1 });
  
  // Apply Night Shadz color to all materials
  useEffect(() => {
    if (scene) {
      const nightShadzColor = new THREE.Color('#AE3647');
      
      scene.traverse((child) => {
        if (child.isMesh) {
          // Create a new material with the Night Shadz color
          child.material = new THREE.MeshStandardMaterial({
            color: nightShadzColor,
            metalness: 0.0,
            roughness: 0.8,
            emissive: nightShadzColor,
            emissiveIntensity: 0.1,
          });
        }
      });
    }
  }, [scene]);
  
  useFrame((state) => {
    if (modelRef.current && mouse) {
      // Subtle tilt based on mouse position
      const targetRotationY = (mouse.x - 0.5) * 0.3;
      const targetRotationX = (mouse.y - 0.5) * 0.2;
      
      modelRef.current.rotation.y += (targetRotationY - modelRef.current.rotation.y) * 0.05;
      modelRef.current.rotation.x += (targetRotationX - modelRef.current.rotation.x) * 0.05;
      
      // Gooey scale effect when dragging
      if (isDragging) {
        const time = state.clock.elapsedTime;
        const intensity = 0.4;
        
        // Create gooey squash and stretch effect
        const squashX = 1 + Math.sin(time * 6) * intensity;
        const squashY = 1 + Math.sin(time * 4 + 1) * intensity;
        const squashZ = 1 + Math.sin(time * 8 + 2) * intensity;
        
        gooeyRef.current.scaleX += (squashX - gooeyRef.current.scaleX) * 0.15;
        gooeyRef.current.scaleY += (squashY - gooeyRef.current.scaleY) * 0.15;
        gooeyRef.current.scaleZ += (squashZ - gooeyRef.current.scaleZ) * 0.15;
        
        modelRef.current.scale.set(
          scale[0] * gooeyRef.current.scaleX,
          scale[1] * gooeyRef.current.scaleY,
          scale[2] * gooeyRef.current.scaleZ
        );
      } else {
        // Smooth return to original scale
        gooeyRef.current.scaleX += (1 - gooeyRef.current.scaleX) * 0.08;
        gooeyRef.current.scaleY += (1 - gooeyRef.current.scaleY) * 0.08;
        gooeyRef.current.scaleZ += (1 - gooeyRef.current.scaleZ) * 0.08;
        
        modelRef.current.scale.set(
          scale[0] * gooeyRef.current.scaleX,
          scale[1] * gooeyRef.current.scaleY,
          scale[2] * gooeyRef.current.scaleZ
        );
      }
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
          <ambientLight intensity={0.8} />
          <directionalLight position={[2, 2, 2]} intensity={0.3} />
          <Model mouse={mouse} scale={getScale()} isDragging={isDragging} />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('./fillesume_3dlogo.glb');

export default FillesumeModel;
