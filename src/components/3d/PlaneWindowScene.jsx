import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

// Dynamic Ocean Wave GLSL Shader with Sun / Moon Specular & Horizon Haze
function OceanShaderPlane({ isDark }) {
  const meshRef = useRef();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uDeepColor: { value: new THREE.Color(isDark ? '#020b1c' : '#03285c') },
    uMidColor: { value: new THREE.Color(isDark ? '#061a38' : '#0d5ea6') },
    uLightColor: { value: new THREE.Color(isDark ? '#1e3a8a' : '#38bdf8') },
    uSunGlint: { value: new THREE.Color(isDark ? '#93c5fd' : '#ffffff') },
    uHazeColor: { value: new THREE.Color(isDark ? '#090d16' : '#e0f2fe') },
  }), [isDark]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uDeepColor.value.set(isDark ? '#020b1c' : '#03285c');
      meshRef.current.material.uniforms.uMidColor.value.set(isDark ? '#061a38' : '#0d5ea6');
      meshRef.current.material.uniforms.uLightColor.value.set(isDark ? '#1e3a8a' : '#38bdf8');
      meshRef.current.material.uniforms.uSunGlint.value.set(isDark ? '#93c5fd' : '#ffffff');
      meshRef.current.material.uniforms.uHazeColor.value.set(isDark ? '#090d16' : '#e0f2fe');
    }
  }, [isDark]);

  const vertexShader = `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;

      // Multi-harmonic Gerstner waves
      float w1 = sin(pos.x * 2.5 + uTime * 1.2) * 0.035;
      float w2 = cos(pos.y * 1.8 + uTime * 0.9) * 0.025;
      float w3 = sin((pos.x + pos.y) * 1.2 + uTime * 0.7) * 0.02;
      
      pos.z += w1 + w2 + w3;
      vWave = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vWave;
    uniform float uTime;
    uniform vec3 uDeepColor;
    uniform vec3 uMidColor;
    uniform vec3 uLightColor;
    uniform vec3 uSunGlint;
    uniform vec3 uHazeColor;

    void main() {
      // High-frequency animated ocean ripples
      vec2 uv = vUv * 90.0;
      float wave1 = sin(uv.x * 0.7 + uTime * 1.4 + cos(uv.y * 0.5 + uTime * 0.9));
      float wave2 = cos(uv.y * 0.9 - uTime * 1.1 + sin(uv.x * 0.6 + uTime * 0.8));
      float ripples = (wave1 + wave2) * 0.5;

      // Oceanic color transition
      vec3 color = mix(uDeepColor, uMidColor, ripples * 0.5 + 0.4);
      color = mix(color, uLightColor, clamp(ripples * ripples * 0.35, 0.0, 1.0));

      // Specular beam on sea surface
      float sunAxis = exp(-pow(vUv.x - 0.45, 2.0) * 12.0);
      float specular = pow(clamp(ripples + 0.2, 0.0, 1.0), 8.0) * 0.6 * sunAxis;
      color += uSunGlint * specular;

      // Horizon atmospheric haze fading out into distance
      float horizonFade = smoothstep(0.08, 0.7, vUv.y);
      color = mix(color, uHazeColor, horizonFade * 0.97);

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value += Math.min(delta, 0.033);
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.44, 0, 0]}
      position={[0, -2.2, -2.5]}
    >
      <planeGeometry args={[34, 34, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

// 3D Airplane Wing outside the window with blinking strobe navigation light
function AirplaneWing({ isDark }) {
  const strobeRef = useRef();

  useFrame((state) => {
    if (strobeRef.current) {
      // Periodic aviation strobe flash (every 1.2s with dual pulse)
      const t = state.clock.elapsedTime % 1.2;
      const flash = (t < 0.08 || (t > 0.16 && t < 0.24)) ? 1 : 0;
      strobeRef.current.intensity = flash * (isDark ? 5.0 : 3.5);
    }
  });

  return (
    <group position={[2.6, -0.6, -1.8]} rotation={[-0.1, -0.25, -0.15]}>
      {/* Main Swept Wing Body */}
      <mesh position={[-0.6, -0.1, -0.8]} rotation={[0, 0.4, 0]}>
        <boxGeometry args={[4.2, 0.08, 1.1]} />
        <meshStandardMaterial
          color={isDark ? "#334155" : "#e2e8f0"}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Upward Winglet Tip */}
      <mesh position={[1.4, 0.35, -0.3]} rotation={[0, 0.2, 0.8]}>
        <boxGeometry args={[0.08, 0.8, 0.4]} />
        <meshStandardMaterial
          color="#2c6fff"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Flashing Navigation Strobe Light */}
      <pointLight
        ref={strobeRef}
        position={[1.45, 0.75, -0.3]}
        color="#ffffff"
        distance={6}
        decay={2}
      />
      <mesh position={[1.45, 0.75, -0.3]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

// Night Sky Stars (when in dark mode)
function StarsField() {
  const starsRef = useRef();
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 6 + 0.5;
      pos[i * 3 + 2] = -Math.random() * 8 - 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        color="#ffffff"
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// Fluffy Volumetric Clouds
function CloudCluster({ position, scale, speed, opacity, resetX = 7, color = '#ffffff' }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x -= delta * speed;
      if (groupRef.current.position.x < -resetX) {
        groupRef.current.position.x = resetX;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.95}
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.75, -0.15, 0.2]} scale={0.78}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial
          color={color}
          roughness={0.95}
          transparent
          opacity={opacity * 0.92}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-0.75, -0.18, -0.15]} scale={0.82}>
        <sphereGeometry args={[1, 14, 14]} />
        <meshStandardMaterial
          color={color}
          roughness={0.95}
          transparent
          opacity={opacity * 0.88}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0.3, 0.35, -0.2]} scale={0.65}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color={color}
          roughness={0.95}
          transparent
          opacity={opacity * 0.95}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function CloudDeck({ isDark }) {
  const clouds = useMemo(() => [
    // Far slow cumulus banks
    { pos: [-4, 0.7, -13], scale: [4.2, 0.9, 1.8], speed: 0.12, opacity: 0.65, resetX: 9, color: isDark ? '#1e293b' : '#f8fafc' },
    { pos: [1.5, 0.8, -14], scale: [4.8, 1.0, 2.0], speed: 0.1, opacity: 0.6, resetX: 10, color: isDark ? '#1e293b' : '#ffffff' },
    { pos: [-7, 0.6, -12], scale: [3.8, 0.85, 1.6], speed: 0.14, opacity: 0.58, resetX: 9, color: isDark ? '#0f172a' : '#f1f5f9' },

    // Mid-level fluffy clouds
    { pos: [-2, -0.15, -6.5], scale: [3.0, 0.75, 1.4], speed: 0.38, opacity: 0.82, resetX: 7, color: isDark ? '#334155' : '#ffffff' },
    { pos: [2.8, -0.05, -7.5], scale: [3.4, 0.85, 1.5], speed: 0.32, opacity: 0.78, resetX: 8, color: isDark ? '#1e293b' : '#f8fafc' },
    { pos: [-5.5, -0.25, -6.8], scale: [2.8, 0.7, 1.3], speed: 0.36, opacity: 0.8, resetX: 7, color: isDark ? '#334155' : '#ffffff' },

    // Near passing fast cloud drifts
    { pos: [-0.5, -0.95, -2.8], scale: [2.2, 0.55, 1.1], speed: 0.88, opacity: 0.9, resetX: 6, color: isDark ? '#475569' : '#ffffff' },
    { pos: [-3.5, -1.05, -3.2], scale: [2.0, 0.5, 1.0], speed: 0.95, opacity: 0.85, resetX: 6, color: isDark ? '#334155' : '#ffffff' },
    { pos: [3.5, -0.85, -2.5], scale: [2.1, 0.52, 1.0], speed: 0.92, opacity: 0.88, resetX: 6, color: isDark ? '#475569' : '#ffffff' }
  ], [isDark]);

  return (
    <group>
      {clouds.map((c, i) => (
        <CloudCluster
          key={i}
          position={c.pos}
          scale={c.scale}
          speed={c.speed}
          opacity={c.opacity}
          resetX={c.resetX}
          color={c.color}
        />
      ))}
    </group>
  );
}

// Interactive Camera Parallax based on mouse cursor over window
function ParallaxCamera({ mousePos }) {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mousePos.x * 0.45, 0.06);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mousePos.y * 0.3, 0.06);
    state.camera.lookAt(mousePos.x * 0.2, mousePos.y * 0.1, -10);
  });
  return null;
}

export default function PlaneWindowScene({ isDark, onShadeChange }) {
  // Window Shade State: 0 = fully open (top), 100 = fully closed (bottom)
  const [shadeY, setShadeY] = useState(() => (isDark ? 100 : 0));
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Synchronize shade position if theme is toggled from dock
  useEffect(() => {
    if (!isDragging) {
      setShadeY(isDark ? 100 : 0);
    }
  }, [isDark]);

  // Drag handlers for window shade
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    soundFx.playShadeSlide();
  };

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Track mouse for 3D camera parallax
    const relX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const relY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x: relX, y: relY });

    if (isDragging) {
      const offsetY = e.clientY - rect.top;
      const pct = Math.max(0, Math.min(100, (offsetY / rect.height) * 100));
      setShadeY(pct);
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Snap to closed if dragged past 50%, else snap to open
      if (shadeY > 50) {
        setShadeY(100);
        soundFx.playShadeSnap();
        if (onShadeChange) onShadeChange(true); // Switch to Dark Mode!
      } else {
        setShadeY(0);
        soundFx.playShadeSnap();
        if (onShadeChange) onShadeChange(false); // Switch to Light Mode!
      }
    }
  };

  // Toggle shade on clicking the handle
  const toggleShade = (e) => {
    e.stopPropagation();
    soundFx.playShadeSnap();
    const willClose = shadeY <= 50;
    setShadeY(willClose ? 100 : 0);
    if (onShadeChange) {
      onShadeChange(willClose); // Toggle theme automatically
    }
  };

  useEffect(() => {
    const onUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (shadeY > 50) {
          setShadeY(100);
          if (onShadeChange) onShadeChange(true);
        } else {
          setShadeY(0);
          if (onShadeChange) onShadeChange(false);
        }
      }
    };
    window.addEventListener('pointerup', onUp);
    return () => window.removeEventListener('pointerup', onUp);
  }, [isDragging, shadeY, onShadeChange]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => {
        setMousePos({ x: 0, y: 0 });
        if (isDragging) setIsDragging(false);
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 52 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ParallaxCamera mousePos={mousePos} />
        
        {/* Sky Background Gradient (Day vs Night) */}
        <color attach="background" args={[isDark ? '#090d16' : '#93c5fd']} />

        {/* Sunlight vs Moonlight Lighting */}
        <ambientLight intensity={isDark ? 0.6 : 1.9} color={isDark ? '#38bdf8' : '#bae6fd'} />
        <directionalLight
          position={[7, 9, 5]}
          intensity={isDark ? 0.9 : 2.8}
          color={isDark ? '#93c5fd' : '#fffbeb'}
          castShadow
        />
        <pointLight position={[-4, 3, 2]} intensity={isDark ? 0.4 : 1.2} color={isDark ? '#1e3a8a' : '#60a5fa'} />

        {/* Stars at night */}
        {isDark && <StarsField />}

        {/* Ocean Horizon Waves */}
        <OceanShaderPlane isDark={isDark} />

        {/* Airplane Wingtip with Strobe Beacon */}
        <AirplaneWing isDark={isDark} />

        {/* Drifting Volumetric Cloud Deck */}
        <CloudDeck isDark={isDark} />
      </Canvas>

      {/* Double-Pane Airplane Glass Reflection Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: isDark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 40%, transparent 60%, rgba(255,255,255,0.04) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 40%, transparent 60%, rgba(255,255,255,0.08) 100%)',
          boxShadow: 'inset 0 0 24px rgba(0,0,0,0.4)',
          zIndex: 2
        }}
      />

      {/* Draggable Airplane Window Shade / Blinds */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: `${shadeY}%`,
          backgroundColor: isDark ? '#1f1e24' : '#e2e0dc',
          backgroundImage: isDark
            ? `
              repeating-linear-gradient(
                0deg,
                #18171d 0px,
                #18171d 6px,
                #26252d 7px,
                #26252d 18px
              )
            `
            : `
              repeating-linear-gradient(
                0deg,
                #d8d5cf 0px,
                #d8d5cf 6px,
                #ece9e4 7px,
                #ece9e4 18px
              )
            `,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
          borderBottom: isDark ? '4px solid #121116' : '4px solid #b8b4ad',
          transition: isDragging ? 'none' : 'height 0.42s cubic-bezier(0.23, 1, 0.32, 1)',
          zIndex: 5,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        {/* Pull Handle at Bottom Edge of Shade */}
        <div
          onPointerDown={handlePointerDown}
          onClick={toggleShade}
          style={{
            width: '64px',
            height: '14px',
            marginBottom: '4px',
            borderRadius: '6px',
            backgroundColor: isDark ? '#383742' : '#8a857e',
            border: isDark ? '1.5px solid #4a4957' : '1.5px solid #6b6762',
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            cursor: 'ns-resize',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
          title={shadeY > 50 ? "Slide Up to Open Window (Switch to Light Mode)" : "Drag Down to Close Window (Switch to Dark Mode)"}
        >
          <div style={{ width: '20px', height: '2px', backgroundColor: isDark ? '#6b6978' : '#e2e0dc', borderRadius: '1px' }} />
        </div>
      </div>

      {/* Floating Interactive Handle when Window is fully Open */}
      {shadeY === 0 && (
        <div
          onPointerDown={handlePointerDown}
          onClick={toggleShade}
          style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '68px',
            height: '14px',
            borderRadius: '6px',
            backgroundColor: isDark ? 'rgba(30, 29, 36, 0.85)' : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(4px)',
            border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid rgba(0,0,0,0.15)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            cursor: 'ns-resize',
            zIndex: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease, background-color 0.2s ease'
          }}
          title="Drag down to close shade (Dark Mode)"
        >
          <div style={{ width: '22px', height: '2px', backgroundColor: isDark ? '#94a3b8' : '#64748b', borderRadius: '1px' }} />
        </div>
      )}
    </div>
  );
}
