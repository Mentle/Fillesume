import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NaturalFiber({ scale }) {
  const groupRef = useRef();
  
  // Create procedural wool-like geometry
  const fiberMesh = useMemo(() => {
    const group = new THREE.Group();
    
    // Wool colors - creamy whites and natural wool tones
    const colors = [
      new THREE.Color(0xfdfbf7), // Off white
      new THREE.Color(0xfff8f0), // Cream white
      new THREE.Color(0xf5f3ed), // Warm white
      new THREE.Color(0xfaf8f3), // Ivory
    ];
    
    // Create the main wool ball structure with many small curly clusters
    const clusterCount = 200;
    
    for (let i = 0; i < clusterCount; i++) {
      // Random position on a sphere for natural wool ball shape
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.15 + Math.random() * 0.2;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Create curly wool fiber using a spiral curve
      const curlRadius = 0.03 + Math.random() * 0.02;
      const curlHeight = 0.1 + Math.random() * 0.08;
      const startAngle = Math.random() * Math.PI * 2; // Random starting rotation
      const rotationAxis = Math.random() * Math.PI * 2; // Random rotation axis
      const points = [];
      
      for (let j = 0; j < 12; j++) {
        const angle = startAngle + (j / 12) * Math.PI * 4; // Multiple rotations for curls
        const height = (j / 12) * curlHeight;
        
        // Apply random rotation around the axis
        const localX = Math.cos(angle) * curlRadius;
        const localY = Math.sin(angle) * curlRadius;
        const rotatedX = localX * Math.cos(rotationAxis) - localY * Math.sin(rotationAxis);
        const rotatedY = localX * Math.sin(rotationAxis) + localY * Math.cos(rotationAxis);
        
        points.push(
          new THREE.Vector3(
            x + rotatedX,
            y + rotatedY,
            z + height - curlHeight / 2
          )
        );
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeometry = new THREE.TubeGeometry(
        curve,
        16,
        0.015 + Math.random() * 0.01,
        6,
        false
      );
      
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 0.95,
        metalness: 0,
      });
      
      const curl = new THREE.Mesh(tubeGeometry, material);
      
      // Add random rotation to the entire curl
      curl.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      group.add(curl);
    }
    
    // Add fluffy spheres for wool texture
    const fluffCount = 400;
    for (let i = 0; i < fluffCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.25;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      // Create irregular "fluffy" spheres by distorting the geometry
      const sphereRadius = 0.025 + Math.random() * 0.04;
      const geometry = new THREE.SphereGeometry(sphereRadius, 5, 5);
      
      // Randomly distort vertices for fluffy appearance
      const positions = geometry.attributes.position;
      for (let j = 0; j < positions.count; j++) {
        const vertex = new THREE.Vector3(
          positions.getX(j),
          positions.getY(j),
          positions.getZ(j)
        );
        
        // Add random noise to make it fluffy/irregular
        const noise = 0.3 + Math.random() * 0.4;
        vertex.multiplyScalar(noise);
        
        positions.setXYZ(j, vertex.x, vertex.y, vertex.z);
      }
      geometry.computeVertexNormals();
      
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 1.0,
        metalness: 0,
        flatShading: true, // Makes it look more textured/fluffy
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      
      // Random rotation for more variation
      sphere.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      group.add(sphere);
    }
    
    return group;
  }, []);
  
  // Gentle floating and rotating animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Slow rotation for organic feel
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      groupRef.current.rotation.z = Math.cos(time * 0.25) * 0.1;
      
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.15;
      
      // Subtle scale pulsing for breathing effect
      const scalePulse = 1 + Math.sin(time * 0.4) * 0.05;
      groupRef.current.scale.set(
        scale[0] * scalePulse,
        scale[1] * scalePulse,
        scale[2] * scalePulse
      );
    }
  });
  
  return (
    <primitive 
      ref={groupRef}
      object={fiberMesh} 
      scale={scale}
      position={[0, 0, 0]}
    />
  );
}

const FiberModel = ({ width = '100%', height }) => {
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
          position: [0, 0, windowSize.width <= 768 ? 2 : 2.5], 
          fov: windowSize.width <= 768 ? 50 : 45 
        }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <directionalLight position={[-3, -3, -3]} intensity={0.3} />
        <Suspense fallback={null}>
          <NaturalFiber scale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FiberModel;
