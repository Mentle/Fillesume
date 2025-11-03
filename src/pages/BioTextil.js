import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MixingStation from '../components/MixingStation';
import './BioTextil.css';

gsap.registerPlugin(ScrollTrigger);

// Liquid particles for seaweed dissolve effect
function LiquidParticles({ visible, position, stage }) {
  const particlesRef = useRef();
  const materialRef = useRef();
  const particleCount = 150;
  const startTime = useRef(null);
  
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Start in a tighter cluster
      positions[i * 3] = (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3 - 0.5; // Centered around seaweed position
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: Math.random() * 0.01 - 0.005, // Slight downward drift
        z: (Math.random() - 0.5) * 0.015,
      });
    }
    
    return { positions, velocities };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current && visible) {
      if (!startTime.current) startTime.current = state.clock.elapsedTime;
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      const elapsed = state.clock.elapsedTime - startTime.current;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particles.velocities[i].x;
        positions[i * 3 + 1] += particles.velocities[i].y;
        positions[i * 3 + 2] += particles.velocities[i].z;
        
        // Add swirling motion (liquid-like)
        const angle = time * 0.5 + i * 0.1;
        const radius = 0.02;
        positions[i * 3] += Math.cos(angle) * radius;
        positions[i * 3 + 2] += Math.sin(angle) * radius;
        
        // Keep particles in bounds
        if (Math.abs(positions[i * 3]) > 1.5) positions[i * 3] *= -0.3;
        if (Math.abs(positions[i * 3 + 1]) > 1.5) positions[i * 3 + 1] *= -0.3;
        if (Math.abs(positions[i * 3 + 2]) > 1.5) positions[i * 3 + 2] *= -0.3;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Start small and grow (liquid droplets forming)
      const growthProgress = Math.min(1, elapsed / 1.5);
      const particleSize = 0.02 + growthProgress * 0.04;
      
      // Fade out before fibers appear (stage 2.9 to 3.0)
      const fadeProgress = Math.max(0, Math.min(1, (stage - 2.9) / 0.1));
      const opacity = 0.7 * (1 - fadeProgress);
      
      if (materialRef.current) {
        materialRef.current.size = particleSize;
        materialRef.current.opacity = opacity;
      }
    } else {
      startTime.current = null;
    }
  });
  
  return (
    <points ref={particlesRef} position={position} visible={visible}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={0.02} 
        color="#2E8B57" 
        transparent 
        opacity={0.7} 
      />
    </points>
  );
}

// Particle system for grinding effect
function GrindingParticles({ visible, position, stage }) {
  const particlesRef = useRef();
  const materialRef = useRef();
  const particleCount = 100;
  const startTime = useRef(null);
  
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    
    return { positions, velocities };
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current && visible) {
      if (!startTime.current) startTime.current = state.clock.elapsedTime;
      
      const positions = particlesRef.current.geometry.attributes.position.array;
      const elapsed = state.clock.elapsedTime - startTime.current;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particles.velocities[i].x;
        positions[i * 3 + 1] += particles.velocities[i].y;
        positions[i * 3 + 2] += particles.velocities[i].z;
        
        // Wrap around
        if (Math.abs(positions[i * 3]) > 1) positions[i * 3] *= -0.5;
        if (Math.abs(positions[i * 3 + 1]) > 1) positions[i * 3 + 1] *= -0.5;
        if (Math.abs(positions[i * 3 + 2]) > 1) positions[i * 3 + 2] *= -0.5;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Grow particles over time (from 0.03 to 0.08)
      const growthProgress = Math.min(1, elapsed / 2); // Grow over 2 seconds
      const particleSize = 0.03 + growthProgress * 0.05;
      
      // Fade out particles before seaweed appears (stage 2.0 to 2.2)
      const fadeProgress = Math.max(0, Math.min(1, (stage - 2.0) / 0.2));
      const opacity = 0.8 * (1 - fadeProgress);
      
      if (materialRef.current) {
        materialRef.current.size = particleSize;
        materialRef.current.opacity = opacity;
      }
    } else {
      startTime.current = null;
    }
  });
  
  return (
    <points ref={particlesRef} position={position} visible={visible}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={0.03} 
        color="#8B4513" 
        transparent 
        opacity={0.8} 
      />
    </points>
  );
}

// Olive model component
function OliveStage({ stage }) {
  const { scene: oliveScene } = useGLTF(`${process.env.PUBLIC_URL}/3d/olive.glb`);
  const { scene: pitScene } = useGLTF(`${process.env.PUBLIC_URL}/3d/pit.glb`);
  const oliveRef = useRef();
  const pitRef = useRef();
  
  // Keep original textures - don't override materials
  
  useFrame(() => {
    if (oliveRef.current && pitRef.current) {
      // Transition from olive to pit based on stage progress
      // Stage 1.0 = olive visible, stage 1.4 = pit visible, stage 1.8 = pit breaking starts
      const oliveTransition = Math.max(0, Math.min(1, (stage - 1) / 0.4)); // 1.0 to 1.4
      const pitBreakProgress = Math.max(0, Math.min(1, (stage - 1.8) / 0.4)); // 1.8 to 2.2
      
      // Completely hide olive when transition is complete
      oliveRef.current.visible = oliveTransition < 0.99;
      
      // Fade out olive
      oliveRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = 1 - oliveTransition;
          child.material.depthWrite = oliveTransition < 0.5; // Prevent z-fighting
        }
      });
      
      // Fade in pit, then break it apart
      pitRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = Math.max(0, 1 - pitBreakProgress * 1.5);
          child.material.depthWrite = true;
        }
      });
      
      // Scale animation - olive shrinks, pit appears
      const oliveScale = 1 - oliveTransition * 0.3;
      oliveRef.current.scale.set(oliveScale, oliveScale, oliveScale);
      
      const pitScale = (0.8 + oliveTransition * 0.2) * (1 + pitBreakProgress * 0.3);
      pitRef.current.scale.set(pitScale, pitScale, pitScale);
      
      // Break apart animation - pit fragments scatter
      if (pitBreakProgress > 0) {
        const time = Date.now() * 0.001;
        pitRef.current.rotation.x = pitBreakProgress * Math.sin(time * 2) * 0.3;
        pitRef.current.rotation.y = pitBreakProgress * time * 0.5;
        pitRef.current.rotation.z = pitBreakProgress * Math.cos(time * 1.5) * 0.2;
      }
    }
  });
  
  return (
    <group>
      <primitive ref={oliveRef} object={oliveScene.clone()} scale={[1, 1, 1]} position={[0, 0, 0]} />
      <primitive ref={pitRef} object={pitScene.clone()} scale={[0.8, 0.8, 0.8]} position={[0, 0, 0]} />
    </group>
  );
}

// Seaweed model component
function SeaweedStage({ stage }) {
  const { scene } = useGLTF(`${process.env.PUBLIC_URL}/3d/seaweed.glb`);
  const seaweedRef = useRef();
  
  useFrame((state) => {
    if (seaweedRef.current) {
      const time = state.clock.elapsedTime;
      
      // Entrance animation: slide up from bottom (stage 2.2 to 2.5)
      const entranceProgress = Math.max(0, Math.min(1, (stage - 2.2) / 0.3));
      const easeProgress = entranceProgress * entranceProgress * (3 - 2 * entranceProgress); // Smooth ease
      
      // Dissolve/grind animation: stage 2.7 to 3.0
      const dissolveProgress = Math.max(0, Math.min(1, (stage - 2.7) / 0.3));
      
      // Start position: -3 (below screen), end position: -0.5 (slightly below center)
      const baseY = -3 + easeProgress * 2.5;
      
      // Add gentle floating animation once in position
      const floatY = entranceProgress >= 1 && dissolveProgress < 0.5 ? Math.sin(time * 0.5) * 0.1 : 0;
      
      seaweedRef.current.position.y = baseY + floatY;
      
      // Gentle rotation, then chaotic wobble during dissolve
      if (dissolveProgress > 0) {
        seaweedRef.current.rotation.x = Math.sin(time * 5) * 0.3 * dissolveProgress;
        seaweedRef.current.rotation.y = Math.cos(time * 4) * 0.4 * dissolveProgress;
        seaweedRef.current.rotation.z = Math.sin(time * 6) * 0.2 * dissolveProgress;
      } else {
        seaweedRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      }
      
      // Scale down and fade out during dissolve (melting effect)
      const dissolveScale = 1 - dissolveProgress * 0.7;
      seaweedRef.current.scale.set(dissolveScale, dissolveScale, dissolveScale);
      
      // Fade in during entrance, fade out during dissolve
      const baseOpacity = easeProgress * (1 - dissolveProgress * 1.2);
      
      seaweedRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true;
          child.material.opacity = Math.max(0, baseOpacity);
        }
      });
    }
  });
  
  return <primitive ref={seaweedRef} object={scene.clone()} scale={[1, 1, 1]} position={[0, -3, 0]} />;
}

// Fiber component (reusing procedural wool)
function FiberStage() {
  const groupRef = useRef();
  
  const fiberMesh = React.useMemo(() => {
    const group = new THREE.Group();
    const colors = [
      new THREE.Color(0xfdfbf7),
      new THREE.Color(0xfff8f0),
      new THREE.Color(0xf5f3ed),
    ];
    
    // Create curly fibers
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const radius = 0.2 + Math.random() * 0.3;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      const sphereRadius = 0.03 + Math.random() * 0.04;
      const geometry = new THREE.SphereGeometry(sphereRadius, 5, 5);
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        roughness: 1.0,
        metalness: 0,
      });
      
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, z);
      group.add(sphere);
    }
    
    return group;
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.1;
    }
  });
  
  return <primitive ref={groupRef} object={fiberMesh} />;
}

// Biomaterial strips
function BiomaterialStrips() {
  const stripsRef = useRef();
  
  const strips = React.useMemo(() => {
    const group = new THREE.Group();
    const stripCount = 8;
    
    for (let i = 0; i < stripCount; i++) {
      const geometry = new THREE.PlaneGeometry(0.3, 1.5);
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#F5E6D3'),
        roughness: 0.8,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });
      
      const strip = new THREE.Mesh(geometry, material);
      strip.position.x = (i - stripCount / 2) * 0.4;
      strip.rotation.x = Math.PI / 2;
      group.add(strip);
    }
    
    return group;
  }, []);
  
  return <primitive ref={stripsRef} object={strips} />;
}

// Main 3D Scene
function BioTextilScene({ stage }) {
  const cameraRef = useRef();
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-3, -3, -3]} intensity={0.3} />
      
      {/* Stage 1: Olive to Pit */}
      <group visible={stage >= 1 && stage < 2.2} position={[0, 0, 0]}>
        <OliveStage stage={stage} />
      </group>
      
      {/* Stage 1.8: Grinding particles - start when pit begins breaking */}
      <GrindingParticles visible={stage >= 1.8 && stage < 2.5} position={[0, 0, 0]} stage={stage} />
      
      {/* Stage 2: Seaweed */}
      <group visible={stage >= 2.2 && stage < 3} position={[0, 0, 0]}>
        <Suspense fallback={null}>
          <SeaweedStage stage={stage} />
        </Suspense>
      </group>
      
      {/* Stage 2.7: Liquid particles - seaweed dissolving */}
      <LiquidParticles visible={stage >= 2.7 && stage < 3.1} position={[0, 0, 0]} stage={stage} />
      
      {/* Stage 3: Fibers */}
      <group visible={stage >= 3 && stage < 4} position={[0, 0, 0]}>
        <FiberStage />
      </group>
      
      {/* Stage 4: Biomaterial */}
      <group visible={stage >= 4} position={[0, 0, 0]}>
        <BiomaterialStrips />
      </group>
    </>
  );
}

const BioTextil = () => {
  const [stage, setStage] = React.useState(0);
  const [showMixing, setShowMixing] = React.useState(false);
  const [mixingComplete, setMixingComplete] = React.useState(false);
  const canvasContainerRef = useRef();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.biotextil-timeline',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.canvas-container',
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (progress < 0.25) {
            setStage(1 + progress * 4);
          } else if (progress < 0.5) {
            setStage(2 + (progress - 0.25) * 4);
          } else if (progress < 0.6) {
            setStage(3 + (progress - 0.5) * 4);
          } else if (progress < 0.65) {
            // Transition to mixing station
            if (!showMixing && !mixingComplete) {
              setShowMixing(true);
            }
          } else if (progress < 0.85) {
            setStage(4 + (progress - 0.65) * 4);
          } else {
            setStage(5 + (progress - 0.85) * 4);
          }
        },
      });
    });
    
    return () => ctx.revert();
  }, [showMixing, mixingComplete]);
  
  const handleMixingComplete = () => {
    setMixingComplete(true);
    setShowMixing(false);
  };
  
  return (
    <div className="biotextil-page">
      <Navbar />
      
      <div className="biotextil-timeline">
        {/* Pinned Canvas */}
        <div className="canvas-container" ref={canvasContainerRef}>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Suspense fallback={null}>
              <BioTextilScene stage={stage} />
            </Suspense>
          </Canvas>
        </div>
        
        {/* Scroll Sections */}
        <div className="scroll-sections">
          <section className="stage-section stage-1">
            <div className="stage-content">
              <h2>01. MOLIDO</h2>
              <p>Olive pits are ground into fine particles</p>
            </div>
          </section>
          
          <section className="stage-section stage-2">
            <div className="stage-content">
              <h2>02. ALGINATE</h2>
              <p>Alginate is extracted from brown algae</p>
            </div>
          </section>
          
          <section className="stage-section stage-3">
            <div className="stage-content">
              <h2>03. ORGANIC FIBERS</h2>
              <p>Natural fibers are mixed with the bio-compound</p>
            </div>
          </section>
          
          <section className="stage-section stage-4">
            <div className="stage-content">
              <h2>04. BIOMATERIAL</h2>
              <p>Biomaterial is created and cut into garments</p>
            </div>
          </section>
        </div>
      </div>
      
      {/* Interactive Mixing Station */}
      {showMixing && (
        <div className="mixing-station-overlay">
          <MixingStation onComplete={handleMixingComplete} />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

// Preload models
useGLTF.preload(`${process.env.PUBLIC_URL}/3d/olive.glb`);
useGLTF.preload(`${process.env.PUBLIC_URL}/3d/pit.glb`);
useGLTF.preload(`${process.env.PUBLIC_URL}/3d/seaweed.glb`);

export default BioTextil;
