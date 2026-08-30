'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <Sphere
        ref={meshRef}
        args={[1.6, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? '#5dffa0' : '#00ff66'}
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
          emissive="#00ff66"
          emissiveIntensity={hovered ? 0.5 : 0.25}
        />
      </Sphere>
    </Float>
  );
}

function WireframeShell() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2.35, 1]}>
      <meshBasicMaterial color="#00ff66" wireframe transparent opacity={0.25} />
    </Icosahedron>
  );
}

function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.4;
    if (ring2.current) ring2.current.rotation.x += delta * 0.3;
  });

  return (
    <>
      <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.7, 0.015, 16, 100]} />
        <meshStandardMaterial color="#2dffdc" emissive="#0f9e88" emissiveIntensity={0.7} wireframe />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[3.1, 0.012, 16, 100]} />
        <meshStandardMaterial color="#00ff66" emissive="#00b34a" emissiveIntensity={0.6} wireframe />
      </mesh>
    </>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 260;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.06;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.028} color="#5eead4" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.4} color="#00ff66" />
        <directionalLight position={[-10, -10, -5]} intensity={0.7} color="#2dffdc" />
        <pointLight position={[0, 0, 5]} intensity={1.1} color="#00ff66" />

        <AnimatedSphere />
        <WireframeShell />
        <OrbitRings />
        <ParticleField />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-widest text-emerald-400/80 bg-black/60 px-3 py-1 rounded-sm border border-emerald-500/20 pointer-events-none backdrop-blur-md">
        &gt; drag_to_rotate_mesh<span className="cursor-blink" />
      </div>
    </div>
  );
}
