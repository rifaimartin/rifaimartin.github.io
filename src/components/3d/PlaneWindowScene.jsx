import React, { useState, useRef, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Clouds, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

// Dimensions & exact aperture clipping curves matching authentic aircraft proportions
const W_WIDTH = 200;
const W_HEIGHT = 300;
const CANVAS_W = 600;
const CANVAS_H = 900;

const at = { top: 132, bottom: 716, left: 79, right: 520 };
const ws = 170;
const zm = { top: 179, bottom: 653, left: 118, right: 481 };
const Om = 150;
const Fm = 723;
const Am = 210;
const vd = (Fm - Am) / CANVAS_H; // ~0.57
const TRAVEL_PX = W_HEIGHT * vd; // ~171px

const makeClip = (box, radius, padding) =>
  `inset(${(box.top - padding) / CANVAS_H * 100}% ${(CANVAS_W - box.right - padding) / CANVAS_W * 100}% ${(CANVAS_H - box.bottom - padding) / CANVAS_H * 100}% ${(box.left - padding) / CANVAS_W * 100}% round ${(radius + padding) / 3}px)`;

const clipGlass = makeClip(zm, Om, 2);
const clipShutterTrack = makeClip(at, ws, 6);
const clipButton = makeClip(at, ws, 0);

const handleBoxStyle = {
  left: `${at.left / 3}px`,
  top: `${at.top / 3}px`,
  width: `${(at.right - at.left) / 3}px`,
  height: `${(at.bottom - at.top) / 3}px`,
  borderRadius: `${ws / 3}px`
};

const skyGradientDay = "linear-gradient(to bottom, #5CADF4 0%, #94CCFB 33%, #C8E6FB 45%, #FFFFFF 50%)";
const skyGradientNight = "linear-gradient(to bottom, #070e1b 0%, #0d1a30 33%, #142442 45%, #1a2f52 50%)";

// Fallback 2D Parallax Cloud Layer
function CloudFallback({ isDark }) {
  const fallbackClouds = [
    { left: "-30%", top: "34%", width: "105%", opacity: isDark ? 0.4 : 0.7 },
    { left: "30%", top: "30%", width: "100%", opacity: isDark ? 0.3 : 0.6 },
    { left: "-15%", top: "46%", width: "135%", opacity: isDark ? 0.5 : 0.95 }
  ];

  return (
    <>
      {fallbackClouds.map((style, idx) => (
        <img
          key={idx}
          src="./cloud.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          style={{ position: 'absolute', pointerEvents: 'none', ...style }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: '64% 0 0 0',
          background: isDark
            ? 'linear-gradient(to bottom, rgba(13,26,48,0) 0%, #0a1322 70%)'
            : 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 70%)'
        }}
      />
    </>
  );
}

// 3D Shimmering Ocean Normal Wave Shader
function OceanPlane({ isDark }) {
  const meshRef = useRef();
  const timeRef = useRef(0);

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('./waternormals.jpg');
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uNormalMap: { value: texture },
      uIsDark: { value: isDark ? 1.0 : 0.0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform sampler2D uNormalMap;
      uniform float uIsDark;
      varying vec2 vUv;

      void main() {
        vec2 uv = vUv * 120.0;
        vec2 uv1 = uv * 0.8 + vec2(uTime * 0.02, uTime * 0.01);
        vec2 uv2 = uv * 0.5 - vec2(uTime * 0.015, uTime * 0.008);
        vec3 n1 = texture2D(uNormalMap, uv1).rgb * 2.0 - 1.0;
        vec3 n2 = texture2D(uNormalMap, uv2).rgb * 2.0 - 1.0;
        float waves = (n1.r + n2.r) * 0.5;

        vec3 deepBlue  = mix(vec3(0.00, 0.25, 0.60), vec3(0.00, 0.05, 0.15), uIsDark);
        vec3 midBlue   = mix(vec3(0.05, 0.40, 0.75), vec3(0.02, 0.10, 0.25), uIsDark);
        vec3 lightBlue = mix(vec3(0.20, 0.60, 0.90), vec3(0.05, 0.20, 0.40), uIsDark);

        vec3 colour = mix(deepBlue, midBlue, waves * 0.7);
        colour = mix(colour, lightBlue, waves * waves * 0.3);

        float glint = pow(clamp(waves + 0.1, 0.0, 1.0), 8.0) * (uIsDark > 0.5 ? 0.08 : 0.22);
        colour += vec3(0.8, 0.9, 1.0) * glint;

        float horizonFade = smoothstep(0.0, 0.6, vUv.y);
        vec3 hazeColour = mix(vec3(0.96, 0.98, 1.00), vec3(0.08, 0.14, 0.24), uIsDark);
        colour = mix(colour, hazeColour, horizonFade * 0.98);

        gl_FragColor = vec4(colour, 1.0);
      }
    `
  }), [texture, isDark]);

  useFrame((_, delta) => {
    timeRef.current += Math.min(delta, 1 / 30);
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = timeRef.current;
      meshRef.current.material.uniforms.uIsDark.value = isDark ? 1.0 : 0.0;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.42, 0, 0]}
      position={[0, -1.9, 0.8]}
    >
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial attach="material" {...shaderArgs} />
    </mesh>
  );
}

// High Altitude Cirrus Cloud Planes
function CirrusPlanes({ isDark }) {
  const meshesRef = useRef([]);
  const planesData = useMemo(() => [
    { x: 0, y: 2, z: -24, w: 18, h: 1, opacity: 0.2, speed: 0.001 },
    { x: -4, y: 2.1, z: -24, w: 18, h: 1, opacity: 0.6, speed: 0.001 },
    { x: 3, y: 1.5, z: -24, w: 18, h: 1, opacity: 0.2, speed: 0.001 },
    { x: 2, y: 1.3, z: -24, w: 18, h: 1, opacity: 0.4, speed: 0.001 },
    { x: -5, y: 1.9, z: -24, w: 18, h: 1, opacity: 0.3, speed: 0.001 },
    { x: -4, y: 1, z: -40, w: 40, h: 10, opacity: 1, speed: 0.001 }
  ], []);

  const materials = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('./CirrusCloud.png');
    return planesData.map(p => new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: p.opacity * (isDark ? 0.4 : 1.0),
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
  }, [planesData, isDark]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    meshesRef.current.forEach((m, idx) => {
      if (m) {
        m.position.x -= dt * planesData[idx].speed;
        if (m.position.x < -6) m.position.x = 6;
      }
    });
  });

  return (
    <>
      {planesData.map((p, idx) => (
        <mesh
          key={idx}
          ref={el => (meshesRef.current[idx] = el)}
          position={[p.x, p.y, p.z]}
          material={materials[idx]}
        >
          <planeGeometry args={[p.w, p.h]} />
        </mesh>
      ))}
    </>
  );
}

// 3D Moving Cloud Puff
function CloudPuff({ position, speed, opacity, segments, bounds, volume, seed, resetX, color, shadowColor }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.position.x -= Math.min(delta, 1 / 30) * speed;
      if (groupRef.current.position.x < -resetX) {
        groupRef.current.position.x = resetX;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Cloud
        opacity={opacity}
        color={color}
        segments={segments}
        bounds={bounds}
        volume={volume}
        seed={seed}
        position={[0, bounds[1] * 0.15, 0]}
      />
      <Cloud
        opacity={opacity * 0.7}
        color={shadowColor}
        segments={Math.floor(segments * 0.7)}
        bounds={[bounds[0], bounds[1] * 0.5, bounds[2]]}
        volume={volume * 0.6}
        seed={seed + 100}
        position={[0, -bounds[1] * 0.25, 0]}
      />
    </group>
  );
}

// Full 3D Multi-deck Clouds Scene
function VolumetricCloudScene({ isDark }) {
  return (
    <>
      <ambientLight intensity={isDark ? 1.0 : 3.0} color={isDark ? '#64748b' : '#e8f4ff'} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 2.0} color={isDark ? '#94a3b8' : '#fff8f0'} />

      {/* High-altitude Cirrus Sky */}
      <CirrusPlanes isDark={isDark} />

      {/* 3D Drei Cloud Cluster */}
      <Clouds texture="./cloud.png" limit={400}>
        {/* Deep Horizon Clouds */}
        <CloudPuff position={[-1.5, -0.8, -16]} speed={0.04} opacity={0.35} segments={10} bounds={[1.5, 0.4, 0.4]} volume={0.4} seed={1} resetX={4} color={isDark ? "#334155" : "#c8d8e8"} shadowColor={isDark ? "#1e293b" : "#4a6a8a"} />
        <CloudPuff position={[0.5, -0.8, -16]} speed={0.03} opacity={0.3} segments={10} bounds={[1.8, 0.4, 0.4]} volume={0.4} seed={2} resetX={4} color={isDark ? "#334155" : "#d0dce8"} shadowColor={isDark ? "#1e293b" : "#4a6a8a"} />
        <CloudPuff position={[2.5, -0.8, -16]} speed={0.04} opacity={0.32} segments={10} bounds={[1.6, 0.4, 0.4]} volume={0.4} seed={3} resetX={4} color={isDark ? "#334155" : "#c8d8e8"} shadowColor={isDark ? "#1e293b" : "#4a6a8a"} />
        <CloudPuff position={[-3, -0.85, -16]} speed={0.03} opacity={0.28} segments={10} bounds={[1.4, 0.35, 0.35]} volume={0.35} seed={10} resetX={4} color={isDark ? "#334155" : "#d0dce8"} shadowColor={isDark ? "#1e293b" : "#4a6a8a"} />

        {/* Mid Deck Fluffy Cumulus */}
        <CloudPuff position={[-1, -0.95, -9]} speed={0.08} opacity={0.55} segments={14} bounds={[2.2, 0.7, 0.7]} volume={0.7} seed={4} resetX={4} color={isDark ? "#475569" : "#f0f4f8"} shadowColor={isDark ? "#1e293b" : "#8aa0b8"} />
        <CloudPuff position={[1, -0.9, -9]} speed={0.07} opacity={0.5} segments={14} bounds={[2, 0.65, 0.65]} volume={0.65} seed={5} resetX={4} color={isDark ? "#475569" : "#eef2f8"} shadowColor={isDark ? "#1e293b" : "#5a7898"} />
        <CloudPuff position={[-3, -1, -9]} speed={0.09} opacity={0.48} segments={12} bounds={[1.8, 0.6, 0.6]} volume={0.6} seed={6} resetX={4} color={isDark ? "#475569" : "#f0f4f8"} shadowColor={isDark ? "#1e293b" : "#5a7898"} />
        <CloudPuff position={[3, -0.62, -9]} speed={0.08} opacity={0.5} segments={12} bounds={[2, 0.6, 0.6]} volume={0.6} seed={11} resetX={4} color={isDark ? "#475569" : "#eef2f8"} shadowColor={isDark ? "#1e293b" : "#5a7898"} />

        {/* Near Fast-Drifting Cloud Deck */}
        <CloudPuff position={[0, -1.3, -2.5]} speed={0.48} opacity={0.7} segments={18} bounds={[3, 1, 1]} volume={1} seed={7} resetX={5} color={isDark ? "#64748b" : "#ffffff"} shadowColor={isDark ? "#1e293b" : "#7a8fa8"} />
        <CloudPuff position={[-2, -1.4, -2.5]} speed={0.52} opacity={0.65} segments={16} bounds={[2.8, 0.9, 0.9]} volume={0.9} seed={8} resetX={5} color={isDark ? "#64748b" : "#fffef8"} shadowColor={isDark ? "#1e293b" : "#7a8fa8"} />
        <CloudPuff position={[2, -1.5, -2.5]} speed={0.44} opacity={0.6} segments={16} bounds={[2.5, 0.9, 0.9]} volume={0.9} seed={9} resetX={5} color={isDark ? "#64748b" : "#ffffff"} shadowColor={isDark ? "#1e293b" : "#7a8fa8"} />
        <CloudPuff position={[-4, -1.2, -2.5]} speed={0.5} opacity={0.62} segments={16} bounds={[2.6, 0.85, 0.85]} volume={0.85} seed={12} resetX={5} color={isDark ? "#64748b" : "#fffef8"} shadowColor={isDark ? "#1e293b" : "#7a8fa8"} />
      </Clouds>
    </>
  );
}

// Master 3D Viewport
function ThreeWindowViewport({ isDark, paused }) {
  const frameloop = paused ? 'demand' : 'always';

  return (
    <>
      {/* Ocean Sea Layer */}
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        camera={{ position: [0, 0, 2], fov: 60 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        frameloop={frameloop}
        flat
      >
        <OceanPlane isDark={isDark} />
      </Canvas>

      {/* Cloud Particle Scene */}
      <Canvas
        style={{ position: 'absolute', inset: 0 }}
        camera={{ position: [0, 0, 3], fov: 70 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        frameloop={frameloop}
      >
        <VolumetricCloudScene isDark={isDark} />
      </Canvas>
    </>
  );
}

// Photorealistic Window Image Helper
function WindowImage({ src, shade, dim, style }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable="false"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
        filter: `brightness(${1 - shade * dim})`,
        ...style
      }}
    />
  );
}

// Main Interactive Aircraft Window Component
export default function PlaneWindowScene({ isDark, onShadeChange, onShadeDrag }) {
  // Shade ratio: 0 (fully open / daylight) to 1 (fully pulled down / dark mode)
  const [shade, setShade] = useState(() => (isDark ? 1 : 0));
  const [dragging, setDragging] = useState(false);
  const pointerStartRef = useRef(null);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(0);

  // Synchronize shade if theme is changed externally (e.g. from dock)
  useEffect(() => {
    if (!dragging) {
      setShade(isDark ? 1 : 0);
      if (onShadeDrag) onShadeDrag(isDark ? 1 : 0);
    }
  }, [isDark, dragging, onShadeDrag]);

  // Spring animation to target position
  const animateTo = useCallback((target) => {
    cancelAnimationFrame(rafRef.current);
    soundFx.playShadeSnap();

    const startVal = shade;
    const distance = target - startVal;
    const startTime = performance.now();
    const duration = 280; // ms

    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = startVal + distance * easeOutCubic(progress);
      setShade(current);
      if (onShadeDrag) onShadeDrag(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setShade(target);
        if (onShadeDrag) onShadeDrag(target);
        if (onShadeChange) {
          onShadeChange(target > 0.5);
        }
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [shade, onShadeChange, onShadeDrag]);

  const handlePointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    cancelAnimationFrame(rafRef.current);
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setDragging(true);
    soundFx.playShadeSlide();
    pointerStartRef.current = {
      y: e.clientY,
      fromShade: shade,
      time: performance.now()
    };
  };

  const handlePointerMove = (e) => {
    if (!dragging || !pointerStartRef.current) return;
    const deltaY = e.clientY - pointerStartRef.current.y;
    const newShade = Math.max(0, Math.min(1, pointerStartRef.current.fromShade + deltaY / TRAVEL_PX));

    const now = performance.now();
    const dt = (now - pointerStartRef.current.time) / 1000;
    if (dt > 0) {
      velocityRef.current = (newShade - shade) / dt;
    }
    pointerStartRef.current.time = now;
    setShade(newShade);
    if (onShadeDrag) onShadeDrag(newShade);
  };

  const handlePointerUp = (e) => {
    if (!dragging) return;
    setDragging(false);
    e.currentTarget.releasePointerCapture?.(e.pointerId);
    pointerStartRef.current = null;

    // Velocity-based snap or position-based snap
    if (velocityRef.current > 0.8) {
      animateTo(1);
    } else if (velocityRef.current < -0.8) {
      animateTo(0);
    } else {
      animateTo(shade > 0.5 ? 1 : 0);
    }
  };

  const isClosed = shade > 0.92;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      style={{
        position: 'relative',
        width: `${W_WIDTH}px`,
        height: `${W_HEIGHT}px`,
        margin: '0 auto',
        isolation: 'isolate',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {/* 1. Sky & Cloud WebGL Aperture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clipGlass,
          WebkitClipPath: clipGlass,
          background: isDark ? skyGradientNight : skyGradientDay
        }}
      >
        <Suspense fallback={<CloudFallback isDark={isDark} />}>
          <ThreeWindowViewport isDark={isDark} paused={isClosed} />
        </Suspense>
      </div>

      {/* 2. Inner Recessed Bezel & Depth Layer */}
      <WindowImage src="./window-back.webp" shade={shade} dim={0.86} />

      {/* 3. Sliding Aircraft Sunblind Shutter */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clipShutterTrack,
          WebkitClipPath: clipShutterTrack,
          pointerEvents: 'none'
        }}
      >
        <WindowImage
          src="./window-shutter.webp"
          shade={shade}
          dim={0.82}
          style={{
            transform: `translate3d(0, ${-(1 - shade) * vd * 100}%, 0)`
          }}
        />

        {/* Shutter Track Inner Shadow Mask */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            ...handleBoxStyle,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 11px rgba(28, 25, 22, 0.42), inset 0 0 3px rgba(28, 25, 22, 0.30)',
            maskImage: 'url(./window-shutter.webp)',
            WebkitMaskImage: 'url(./window-shutter.webp)',
            maskSize: '200px 300px',
            WebkitMaskSize: '200px 300px',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: `${-79 / 3}px ${-132 / 3 - (1 - shade) * TRAVEL_PX}px`,
            WebkitMaskPosition: `${-79 / 3}px ${-132 / 3 - (1 - shade) * TRAVEL_PX}px`
          }}
        />
      </div>

      {/* 4. Outer Fuselage Window Bezel Frame */}
      <WindowImage src="./window-front.webp" shade={shade} dim={0.8} />

      {/* 5. Ambient Occlusion Multiply Overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          maskImage: 'url(./window-front.webp)',
          WebkitMaskImage: 'url(./window-front.webp)',
          maskSize: 'cover',
          WebkitMaskSize: 'cover',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          pointerEvents: 'none',
          mixBlendMode: 'multiply',
          opacity: shade * 0.55,
          background: 'linear-gradient(to bottom, #6a6e78 0%, #878b95 38%, #a2a7ae 100%)'
        }}
      />

      {/* 6. Drag & Pull Handle Interactive Layer */}
      <button
        type="button"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-pressed={shade > 0.5}
        title={shade > 0.5 ? "Tarik ke atas untuk buka jendela (Day Mode)" : "Tarik ke bawah untuk tutup jendela (Night Mode)"}
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: clipButton,
          WebkitClipPath: clipButton,
          background: 'none',
          border: 0,
          padding: 0,
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        <span
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            whiteSpace: 'nowrap'
          }}
        >
          {shade > 0.5 ? "Open the window shade" : "Close the window shade"}
        </span>
      </button>
    </div>
  );
}
