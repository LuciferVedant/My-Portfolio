'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
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
          color={hovered ? '#818cf8' : '#4f46e5'}
          attach="material"
          distort={0.45}
          speed={3}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
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
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} wireframe />
      </mesh>
      <mesh ref={ring2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.9, 0.015, 16, 100]} />
        <meshStandardMaterial color="#a855f7" emissive="#7e22ce" emissiveIntensity={0.5} wireframe />
      </mesh>
    </>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 200;

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
      particlesRef.current.rotation.y += delta * 0.05;
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
      <pointsMaterial size={0.03} color="#c084fc" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div className="w-full h-[400px] md:h-[500px] relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#38bdf8" />
        <pointLight position={[0, 0, 5]} intensity={1} color="#a855f7" />

        <AnimatedSphere />
        <OrbitRings />
        <ParticleField />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-mono text-slate-400 bg-slate-900/60 px-3 py-1 rounded-full border border-white/5 pointer-events-none backdrop-blur-md">
        💡 Interactive 3D Canvas • Drag to rotate mesh
      </div>
    </div>
  );
}
