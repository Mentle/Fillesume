import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CircularText from './CircularText';

function EarthGlobe({ mouse, isDragging }) {
  const meshRef = useRef();
  
  // Load Earth texture from local public folder
  const earthTexture = useLoader(
    THREE.TextureLoader,
    './earth_texture.jpg'
  );
  
  // Enhance texture brightness and fix orientation
  useEffect(() => {
    if (earthTexture) {
      earthTexture.colorSpace = THREE.SRGBColorSpace;
      earthTexture.flipY = false;
      earthTexture.wrapS = THREE.ClampToEdgeWrapping;
      earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    }
  }, [earthTexture]);

  useFrame((state) => {
    if (meshRef.current) {
      // Auto rotation
      meshRef.current.rotation.y += 0.005;
      
      // Mouse interaction only when dragging
      if (mouse && isDragging) {
        const targetRotationX = (mouse.y - 0.5) * 0.3;
        const targetRotationZ = (mouse.x - 0.5) * 0.3;
        
        meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
        meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.05;
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[1, -1, 1]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshLambertMaterial 
        map={earthTexture}
      />
    </mesh>
  );
}

const Globe = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (event) => {
    if (isDragging) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (event) => {
    if (isDragging && event.touches.length > 0) {
      const touch = event.touches[0];
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width;
      const y = (touch.clientY - rect.top) / rect.height;
      setMouse({ x, y });
    }
  };

  return (
    <div 
      style={{
        width: '300px',
        height: '300px',
        margin: '0 auto 40px',
        cursor: 'grab',
        position: 'relative'
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
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={3.0} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} />
        <EarthGlobe mouse={mouse} isDragging={isDragging} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.5}
        />
      </Canvas>
      <CircularText text="FROM EARTH TO EARTH • FROM EARTH TO EARTH • " radius={140} />
    </div>
  );
};

export default Globe;
