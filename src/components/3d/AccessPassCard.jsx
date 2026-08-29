import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

// Helper to render procedural 2D Boarding Pass canvas texture
function createBoardingPassTexture(isDark = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1440;
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1440);
  if (isDark) {
    bgGrad.addColorStop(0, '#1c1b22');
    bgGrad.addColorStop(0.5, '#16151a');
    bgGrad.addColorStop(1, '#0e0d11');
  } else {
    bgGrad.addColorStop(0, '#ffffff');
    bgGrad.addColorStop(0.5, '#faf8f8');
    bgGrad.addColorStop(1, '#f0eded');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1440);

  // Decorative border
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, 964, 1380);

  // Top Lanyard Clip hole indicator
  ctx.fillStyle = isDark ? '#2e2d36' : '#dcd8e3';
  ctx.beginPath();
  ctx.arc(512, 60, 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = isDark ? '#4b4859' : '#b0abb8';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Header: Flight / Boarding Header
  ctx.fillStyle = '#2c6fff';
  ctx.fillRect(50, 110, 924, 130);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('BOARDING PASS / FLIGHT RM-2026', 80, 165);

  ctx.font = '500 22px "JetBrains Mono", monospace';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.fillText('CLASS: FIRST CLASS MIDDLEWARE • SEAT: 1A (PROD)', 80, 205);

  // Profile Information
  ctx.fillStyle = isDark ? '#f2efe9' : '#17160f';
  ctx.font = 'bold 54px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('MUHAMMAD RIFAI', 80, 320);

  ctx.font = '600 28px "JetBrains Mono", monospace';
  ctx.fillStyle = '#2c6fff';
  ctx.fillText('SQUAD LEAD & IT MIDDLEWARE ENGINEER', 80, 370);

  ctx.fillStyle = isDark ? '#9e9da6' : '#6b6973';
  ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SPECIALIZATION: HIGH-THROUGHPUT SWITCHING & BANKING INTEGRATION', 80, 415);

  // Grid Stats Box
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  ctx.fillRect(80, 460, 864, 220);
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  ctx.strokeRect(80, 460, 864, 220);

  const drawStat = (label, val, x, y) => {
    ctx.fillStyle = isDark ? '#8a8894' : '#8c8b82';
    ctx.font = '600 18px "JetBrains Mono", monospace';
    ctx.fillText(label.toUpperCase(), x, y);
    ctx.fillStyle = isDark ? '#f8f7f5' : '#111111';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(val, x, y + 45);
  };

  drawStat('Role & Team', 'SQUAD LEAD @ BCA DIGITAL', 110, 520);
  drawStat('Core Focus', 'MULTI-BILLER & QRIS', 520, 520);
  drawStat('Gate Check', 'GATE 01 (PROD)', 110, 610);
  drawStat('Status', 'CRUISING ✈️', 520, 610);

  // Holographic NFC Chip Symbol
  ctx.save();
  ctx.translate(810, 300);
  const chipGrad = ctx.createLinearGradient(-40, -40, 40, 40);
  chipGrad.addColorStop(0, '#f59e0b');
  chipGrad.addColorStop(0.5, '#fbbf24');
  chipGrad.addColorStop(1, '#d97706');
  ctx.fillStyle = chipGrad;
  ctx.fillRect(-40, -40, 80, 80);
  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 3;
  ctx.strokeRect(-40, -40, 80, 80);

  // Chip lines
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  ctx.strokeRect(-25, -25, 50, 50);
  ctx.beginPath();
  ctx.moveTo(-40, 0); ctx.lineTo(-25, 0);
  ctx.moveTo(40, 0); ctx.lineTo(25, 0);
  ctx.moveTo(0, -40); ctx.lineTo(0, -25);
  ctx.moveTo(0, 40); ctx.lineTo(0, 25);
  ctx.stroke();
  ctx.restore();

  // Highlight Features
  ctx.fillStyle = isDark ? '#e4e2e6' : '#2d2c30';
  ctx.font = '500 22px "JetBrains Mono", monospace';
  ctx.fillText('KEY PROTOCOLS: ISO 8583 • BI-FAST • QRIS (MPM/CPM/NFC) • KAFKA', 80, 740);

  // Perforated line
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 10]);
  ctx.beginPath();
  ctx.moveTo(50, 820);
  ctx.lineTo(974, 820);
  ctx.stroke();
  ctx.setLineDash([]); // reset

  // Barcode Section at Bottom
  ctx.fillStyle = isDark ? '#ffffff' : '#111111';
  const startX = 80;
  const barcodeY = 880;
  const barcodeH = 140;

  // Draw simulated barcode lines
  const pattern = [3, 1, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1, 2, 4, 1, 3, 2, 1, 4, 3, 2, 1, 3, 4, 2, 1, 4, 2, 1, 3, 4, 1, 2, 3, 4, 1, 2, 3, 1, 4, 2, 3, 1, 4, 2, 1, 3, 4, 2, 1, 3, 4];
  let curX = startX;
  for (let i = 0; i < pattern.length && curX < 750; i++) {
    const width = pattern[i] * 3;
    if (i % 2 === 0) {
      ctx.fillRect(curX, barcodeY, width, barcodeH);
    }
    curX += width + 2;
  }

  // QR Code Graphic on right
  ctx.fillStyle = isDark ? '#ffffff' : '#000000';
  ctx.fillRect(780, 880, 160, 160);
  ctx.fillStyle = isDark ? '#1c1b22' : '#ffffff';
  ctx.fillRect(790, 890, 140, 140);
  ctx.fillStyle = isDark ? '#ffffff' : '#000000';
  // QR pattern simulation
  ctx.fillRect(800, 900, 40, 40);
  ctx.fillRect(870, 900, 40, 40);
  ctx.fillRect(800, 970, 40, 40);
  ctx.fillRect(850, 950, 20, 20);
  ctx.fillRect(880, 970, 30, 30);

  // Flight Footer
  ctx.fillStyle = isDark ? '#8a8894' : '#8c8b82';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText('NO: 0029-RM-BCA-2026 • JAKARTA - CGK', 80, 1070);
  ctx.fillText('TAP OR SWIPE TO VALIDATE IDENTITY & ENTER PORTFOLIO', 80, 1110);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// 3D Card Mesh with realistic spring/swing dynamics
function CardModel({ onGranted, isDark }) {
  const cardRef = useRef();
  const lanyardRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const texture = useMemo(() => createBoardingPassTexture(isDark), [isDark]);

  // Target rotations and positions for spring physics
  const target = useRef({
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
  });

  const handlePointerMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    
    target.current.x = x * 0.8;
    target.current.y = y * 0.5;
    target.current.rotY = x * 0.6;
    target.current.rotX = -y * 0.5;
    target.current.rotZ = -x * 0.2;
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!cardRef.current) return;

    // Smooth lerping towards target with natural pendulum damping
    const lerpSpeed = isDragging ? 12 : 5;
    cardRef.current.position.x = THREE.MathUtils.lerp(cardRef.current.position.x, target.current.x, delta * lerpSpeed);
    cardRef.current.position.y = THREE.MathUtils.lerp(cardRef.current.position.y, target.current.y, delta * lerpSpeed);
    
    // Slight idle float
    const floatRot = Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    cardRef.current.rotation.x = THREE.MathUtils.lerp(cardRef.current.rotation.x, target.current.rotX, delta * 6);
    cardRef.current.rotation.y = THREE.MathUtils.lerp(cardRef.current.rotation.y, target.current.rotY + floatRot, delta * 6);
    cardRef.current.rotation.z = THREE.MathUtils.lerp(cardRef.current.rotation.z, target.current.rotZ, delta * 6);

    // Lanyard anchor updates
    if (lanyardRef.current) {
      lanyardRef.current.position.x = cardRef.current.position.x * 0.3;
      lanyardRef.current.rotation.z = cardRef.current.position.x * -0.15;
    }
  });

  const handleCardClick = () => {
    soundFx.playNfcSuccess();
    if (onGranted) {
      onGranted();
    }
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Lanyard Strap */}
      <group ref={lanyardRef} position={[0, 2.6, -0.2]}>
        <mesh position={[-0.2, 0, 0]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.08, 2.5, 0.02]} />
          <meshStandardMaterial color="#2c6fff" roughness={0.7} />
        </mesh>
        <mesh position={[0.2, 0, 0]} rotation={[0, 0, -0.08]}>
          <boxGeometry args={[0.08, 2.5, 0.02]} />
          <meshStandardMaterial color="#2c6fff" roughness={0.7} />
        </mesh>
        {/* Metal Carabiner Clip */}
        <mesh position={[0, -1.2, 0.05]}>
          <cylinderGeometry args={[0.1, 0.1, 0.25, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 3D Boarding Pass Card */}
      <group
        ref={cardRef}
        position={[0, 0, 0]}
        onClick={handleCardClick}
        onPointerOver={() => { setHovered(true); soundFx.playHover(); }}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => { setIsDragging(true); soundFx.playCardClick(); }}
        onPointerUp={() => setIsDragging(false)}
      >
        {/* Card Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 3.1, 0.04]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.35}
            metalness={0.25}
            clearcoat={0.6}
            clearcoatRoughness={0.2}
          />
        </mesh>

        {/* Clear Plastic Holder Case */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.3, 3.25, 0.07]} />
          <meshPhysicalMaterial
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.85}
            thickness={0.2}
            ior={1.45}
            color="#ffffff"
          />
        </mesh>
      </group>
    </group>
  );
}

export default function AccessPassCard({ onGranted, isDark }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 8, 5]} intensity={2.4} castShadow />
        <pointLight position={[-4, -3, 3]} intensity={1.2} color="#2c6fff" />
        <pointLight position={[3, -2, 2]} intensity={0.8} color="#38bdf8" />

        <CardModel onGranted={onGranted} isDark={isDark} />
      </Canvas>
    </div>
  );
}
