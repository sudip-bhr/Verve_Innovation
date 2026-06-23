import React, { Suspense, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';

// ─── 3D Model ─────────────────────────────────────────────────────────────────
// useGLTF suspends the component until the .glb is fully downloaded.
// onLoaded fires on the FIRST rendered frame (via useFrame), so the
// cross-fade happens exactly when the model is truly visible — not just
// when the JS promise resolves.
function Model({ onLoaded }) {
  const { scene } = useGLTF('/3dsvg.glb');
  const ref = React.useRef();
  const hasNotified = React.useRef(false);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.5;
      // Notify once after the very first rendered frame
      if (!hasNotified.current) {
        hasNotified.current = true;
        onLoaded?.();
      }
    }
  });

  return <primitive object={scene} ref={ref} scale={1.6} position={[0, 0, 0]} />;
}

// ─── Premium CSS Placeholder ──────────────────────────────────────────────────
// Renders instantly (zero network cost), maintains the brand aesthetic,
// and cross-fades out once the 3D model draws its first frame.
function AnimatedPlaceholder({ visible }) {
  return (
    <div
      className="absolute inset-0 flex justify-center items-center pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease-out',
        willChange: 'opacity',
      }}
    >
      {/* Outer spinning ring — orange */}
      <div
        className="absolute rounded-full border border-verve-orange/20"
        style={{ width: '520px', height: '520px', animation: 'spin 18s linear infinite' }}
      />
      {/* Middle ring — counter-rotating blue */}
      <div
        className="absolute rounded-full border border-verve-blue/15"
        style={{ width: '380px', height: '380px', animation: 'spin 12s linear infinite reverse' }}
      />
      {/* Inner ring */}
      <div
        className="absolute rounded-full border border-verve-orange/10"
        style={{ width: '260px', height: '260px', animation: 'spin 8s linear infinite' }}
      />
      {/* Pulsing orange glow blob */}
      <div
        className="absolute rounded-full bg-verve-orange/8"
        style={{ width: '220px', height: '220px', filter: 'blur(40px)', animation: 'pulse 3s ease-in-out infinite' }}
      />
      {/* Pulsing blue glow blob */}
      <div
        className="absolute rounded-full bg-verve-blue/8"
        style={{ width: '140px', height: '140px', filter: 'blur(50px)', animation: 'pulse 4s ease-in-out infinite reverse' }}
      />
      {/* Orbital accent dots */}
      {[0, 90, 180, 270].map((deg) => (
        <div
          key={deg}
          className="absolute w-1.5 h-1.5 rounded-full bg-verve-orange/50"
          style={{
            transform: `rotate(${deg}deg) translateY(-190px)`,
            animation: `pulse 2.5s ease-in-out ${(deg / 360) * 1.5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Hero3DModel (default export) ─────────────────────────────────────────────
export default function Hero3DModel() {
  // Model loading is temporarily disabled due to missing 3dsvg.glb
  // const [modelReady, setModelReady] = useState(false);
  // const handleLoaded = useCallback(() => setModelReady(true), []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30 md:opacity-50 blur-[6px] flex justify-center items-center">
      {/* CSS placeholder — shows instantly, staying permanently visible while model is disabled */}
      <AnimatedPlaceholder visible={true} />

      {/* Canvas wrapper — disabled to prevent 404 / JSON parsing error on missing asset */}
      {/* 
      <div
        className="w-full h-full max-w-[750px] max-h-[750px]"
        style={{
          opacity: modelReady ? 1 : 0,
          transition: 'opacity 1.4s ease-in',
          willChange: 'opacity',
        }}
      >
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
              <Model onLoaded={handleLoaded} />
            </Float>
          </Suspense>
        </Canvas>
      </div>
      */}
    </div>
  );
}
