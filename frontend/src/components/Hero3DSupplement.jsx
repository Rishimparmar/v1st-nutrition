import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCw, ShieldCheck, Eye } from 'lucide-react';

// Generates an ultra-crisp, high-resolution procedural label texture with perfect hemispheric symmetry
function createSupplementLabelTexture(flavorColor, flavorName) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background deep dark carbon weave
  ctx.fillStyle = '#0C0C10';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle grid lines & carbon pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let x = 0; x < canvas.width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // =========================================================================
  // FRONT HEMISPHERE: u = 0.0 to 0.5 (x: 0 to 1024), EXACT CENTER at x = 512
  // =========================================================================
  const frontCenter = 512;

  // Top accent bar
  ctx.fillStyle = flavorColor;
  ctx.fillRect(frontCenter - 360, 95, 720, 14);

  // Geometric Brand Emblem
  ctx.save();
  ctx.translate(frontCenter, 185);
  ctx.fillStyle = flavorColor;
  ctx.beginPath();
  ctx.moveTo(0, -38);
  ctx.lineTo(34, 22);
  ctx.lineTo(-34, 22);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#0C0C10';
  ctx.font = 'bold 28px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('V1', 0, 16);
  ctx.restore();

  // Brand Name (Centered at 512)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 52px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('V1ST NUTRITION', frontCenter, 275);

  // Product Tier Subtitle (Centered at 512)
  ctx.fillStyle = flavorColor;
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.letterSpacing = '5px';
  ctx.textAlign = 'center';
  ctx.fillText('SURAT FLAGSHIP • KINETIC LABS FORMULATION', frontCenter, 320);

  // Main Product Title (Centered at 512)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 86px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('100% WHEY', frontCenter, 425);
  ctx.fillStyle = flavorColor;
  ctx.fillText('ISOLATE', frontCenter, 510);

  // Highlight Badge: Microfiltered Purity (Centered at 512)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.fillRect(frontCenter - 380, 545, 760, 48);
  ctx.fillStyle = '#E4E4E7';
  ctx.font = '600 21px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('CROSS-FLOW MICROFILTERED • ZERO ADDED SUGAR', frontCenter, 577);

  // Macro Pillars 4-Box Grid (Centered at 512, total width: 700px)
  const macros = [
    { val: '27G', lbl: 'PROTEIN' },
    { val: '5.9G', lbl: 'BCAA' },
    { val: '11.8G', lbl: 'EAA' },
    { val: '0G', lbl: 'SUGAR' },
  ];
  const boxWidth = 160;
  const boxGap = 16;
  const startX = frontCenter - (4 * boxWidth + 3 * boxGap) / 2;

  macros.forEach((m, idx) => {
    const bx = startX + idx * (boxWidth + boxGap);
    ctx.fillStyle = 'rgba(20, 20, 26, 0.9)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(bx, 625, boxWidth, 125);
    ctx.fillRect(bx, 625, boxWidth, 125);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 40px "Syne", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(m.val, bx + boxWidth / 2, 680);

    ctx.fillStyle = flavorColor;
    ctx.font = '700 17px "JetBrains Mono", monospace';
    ctx.fillText(m.lbl, bx + boxWidth / 2, 720);
  });

  // Selected Flavor Stripe Indicator (Centered at 512)
  ctx.fillStyle = flavorColor;
  ctx.fillRect(frontCenter - 350, 775, 700, 68);
  ctx.fillStyle = '#09090B';
  ctx.font = '900 28px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`FLAVOR: ${flavorName.toUpperCase()}`, frontCenter, 818);

  // Authenticity Seal Badge (Top right of front face)
  ctx.save();
  ctx.translate(frontCenter + 330, 200);
  ctx.beginPath();
  ctx.arc(0, 0, 56, 0, Math.PI * 2);
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.fill();

  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('100% GENUINE', 0, -16);
  ctx.font = '900 20px "Syne", sans-serif';
  ctx.fillText('NABL', 0, 8);
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.fillText('CERTIFIED', 0, 28);
  ctx.restore();

  // =========================================================================
  // BACK HEMISPHERE: u = 0.5 to 1.0 (x: 1024 to 2048), EXACT CENTER at x = 1536
  // =========================================================================
  const backCenter = 1536;
  const factWidth = 680;
  const factX = backCenter - factWidth / 2;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(factX, 95, factWidth, 800);

  // Nutrition Header
  ctx.fillStyle = '#000000';
  ctx.font = '900 40px "Syne", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('NUTRITION FACTS', factX + 30, 155);

  ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Serving Size: 1 Heaping Scoop (31g) | Servings: 32', factX + 30, 190);
  ctx.fillRect(factX + 30, 205, factWidth - 60, 7);

  ctx.font = '900 26px "Syne", sans-serif';
  ctx.fillText('Amount Per Serving', factX + 30, 245);
  ctx.fillText('Calories: 121 kcal', factX + 30, 280);
  ctx.fillRect(factX + 30, 295, factWidth - 60, 3.5);

  const facts = [
    { name: 'Total Protein (Pure Isolate)', val: '27.0 g', dv: '54%' },
    { name: 'Total Carbohydrates', val: '1.2 g', dv: '< 1%' },
    { name: '  Dietary Fiber', val: '0.0 g', dv: '0%' },
    { name: '  Added Sugars', val: '0.0 g', dv: '0%' },
    { name: 'Total Fat', val: '0.4 g', dv: '< 1%' },
    { name: '  Saturated Fat', val: '0.2 g', dv: '1%' },
    { name: 'Sodium', val: '115 mg', dv: '5%' },
    { name: 'Branched Chain Aminos (BCAA)', val: '5.9 g', dv: '—' },
    { name: 'Essential Amino Acids (EAA)', val: '11.8 g', dv: '—' },
    { name: 'Glutamine & Precursors', val: '4.6 g', dv: '—' },
  ];

  facts.forEach((item, i) => {
    const yPos = 330 + i * 34;
    ctx.font = i === 0 ? '800 18px "Plus Jakarta Sans", sans-serif' : '500 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#111827';
    ctx.fillText(item.name, factX + 30, yPos);
    ctx.textAlign = 'right';
    ctx.fillText(`${item.val}  (${item.dv})`, factX + factWidth - 30, yPos);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#E5E7EB';
    ctx.fillRect(factX + 30, yPos + 6, factWidth - 60, 1);
  });

  // FSSAI & Store details
  ctx.fillStyle = '#111827';
  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillText('FSSAI LIC NO: 10723026000412', factX + 30, 710);
  ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Manufactured for & Distributed by:', factX + 30, 736);
  ctx.font = '700 15px "Syne", sans-serif';
  ctx.fillText('V1ST NUTRITION - VELANJA RD, SURAT, GUJARAT', factX + 30, 760);
  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillText('BATCH: V1ST-2026-WH01  |  MFG: 01/2026  EXP: 07/2027', factX + 30, 786);

  // Barcode mock stripes
  for (let b = factX + 30; b < factX + factWidth - 30; b += Math.floor(Math.random() * 8) + 4) {
    ctx.fillRect(b, 808, Math.random() > 0.5 ? 4 : 2, 32);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.flipY = true;
  return texture;
}

// 4 Floating Minimalist 3D Accents
function FloatingAccents({ flavorColor }) {
  const capRef = useRef();
  const crystalRef = useRef();
  const ringRef = useRef();
  const shardRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (capRef.current) {
      capRef.current.position.y = 1.05 + Math.sin(t * 1.8) * 0.1 + py * 0.15;
      capRef.current.position.x = -2.1 + px * 0.12;
      capRef.current.rotation.x = t * 0.5 + py * 0.4;
      capRef.current.rotation.y = t * 0.7 + px * 0.4;
    }

    if (crystalRef.current) {
      crystalRef.current.position.y = 0.95 + Math.cos(t * 1.5) * 0.08 + py * 0.15;
      crystalRef.current.position.x = 2.1 + px * 0.12;
      crystalRef.current.rotation.y = t * 0.8;
      crystalRef.current.rotation.z = Math.sin(t * 0.7) * 0.25;
    }

    if (ringRef.current) {
      ringRef.current.position.y = -1.05 + Math.sin(t * 1.3) * 0.07 - py * 0.12;
      ringRef.current.position.x = 1.95 + px * 0.15;
      ringRef.current.rotation.x = 0.8 + t * 0.35;
      ringRef.current.rotation.y = t * 0.45;
    }

    if (shardRef.current) {
      shardRef.current.position.y = -0.9 + Math.cos(t * 1.6) * 0.08 - py * 0.12;
      shardRef.current.position.x = -1.95 + px * 0.15;
      shardRef.current.rotation.x = t * 0.6;
      shardRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group>
      {/* 1. Kinetic Peptide Capsule */}
      <group ref={capRef} position={[-2.1, 1.05, 0.4]} scale={[0.2, 0.2, 0.2]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 1.0, 32]} />
          <meshPhysicalMaterial
            color={flavorColor}
            metalness={0.88}
            roughness={0.18}
            clearcoat={0.6}
          />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color={flavorColor}
            metalness={0.88}
            roughness={0.18}
            clearcoat={0.6}
          />
        </mesh>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 1.0, 32]} />
          <meshPhysicalMaterial
            color="#141418"
            metalness={0.95}
            roughness={0.15}
            clearcoat={0.8}
          />
        </mesh>
        <mesh position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#141418"
            metalness={0.95}
            roughness={0.15}
            clearcoat={0.8}
          />
        </mesh>
      </group>

      {/* 2. Faceted Octahedron Crystal */}
      <mesh ref={crystalRef} position={[2.1, 0.95, -0.2]} scale={[0.28, 0.34, 0.28]}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={flavorColor}
          metalness={0.8}
          roughness={0.12}
          clearcoat={0.9}
          emissive={flavorColor}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 3. Orbital Precision Torus Ring */}
      <mesh ref={ringRef} position={[1.95, -1.05, 0.5]} scale={[0.4, 0.4, 0.4]}>
        <torusGeometry args={[1.0, 0.08, 16, 48]} />
        <meshPhysicalMaterial
          color="#222228"
          metalness={0.92}
          roughness={0.2}
          clearcoat={0.5}
        />
      </mesh>

      {/* 4. Micro Molecular Icosahedron */}
      <mesh ref={shardRef} position={[-1.95, -0.9, -0.3]} scale={[0.24, 0.24, 0.24]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#10B981"
          metalness={0.85}
          roughness={0.2}
          clearcoat={0.7}
          emissive="#10B981"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// 3D Supplement Container Mesh
function SupplementTub({ flavorColor, flavorName, isAutoRotate, targetAngle }) {
  const groupRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef(0);
  const userRotationY = useRef(0);

  // Generate canvas label texture
  const labelTexture = useMemo(() => {
    return createSupplementLabelTexture(flavorColor, flavorName);
  }, [flavorColor, flavorName]);

  // Update label texture on flavor change
  useEffect(() => {
    if (labelTexture) {
      labelTexture.needsUpdate = true;
    }
  }, [labelTexture, flavorColor, flavorName]);

  // Materials with high-end PBR properties
  const blackCarbonMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#121216',
      roughness: 0.32,
      metalness: 0.25,
      clearcoat: 0.45,
      clearcoatRoughness: 0.18,
      reflectivity: 0.6,
    });
  }, []);

  const titaniumCapMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#17171C',
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 0.4,
      clearcoatRoughness: 0.12,
    });
  }, []);

  const accentRingMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: flavorColor,
      metalness: 0.88,
      roughness: 0.22,
      emissive: flavorColor,
      emissiveIntensity: 0.35,
    });
  }, [flavorColor]);

  const labelMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      roughness: 0.22,
      metalness: 0.12,
      clearcoat: 0.55,
      clearcoatRoughness: 0.1,
      reflectivity: 0.55,
    });
  }, [labelTexture]);

  // Interaction & Levitation Physics in useFrame loop
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle sinusoidal levitation
    groupRef.current.position.y = -0.15 + Math.sin(time * 1.5) * 0.06;

    // Mouse tilt parallax interpolation
    const targetTiltX = -state.pointer.y * 0.22;
    const targetTiltZ = -state.pointer.x * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.06);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetTiltZ, 0.06);

    // Controlled rotation vs Auto-Spin vs Target Angle
    if (targetAngle !== null && targetAngle !== undefined) {
      userRotationY.current = THREE.MathUtils.lerp(userRotationY.current, targetAngle, 0.08);
      groupRef.current.rotation.y = userRotationY.current;
    } else if (isDragging) {
      groupRef.current.rotation.y = userRotationY.current;
    } else {
      if (Math.abs(rotationVelocity.current) > 0.0001) {
        userRotationY.current += rotationVelocity.current;
        rotationVelocity.current *= 0.94; // damping
      } else if (isAutoRotate) {
        userRotationY.current += delta * 0.4;
      }
      groupRef.current.rotation.y = userRotationY.current;
    }
  });

  // Pointer Drag Handlers
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, rotY: userRotationY.current };
    rotationVelocity.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const newRot = dragStart.current.rotY + deltaX * 0.008;
    rotationVelocity.current = (newRot - userRotationY.current);
    userRotationY.current = newRot;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      scale={[0.82, 0.82, 0.82]}
      position={[0, -0.15, 0]}
    >
      {/* 1. Main Tub Base Chamber */}
      <mesh position={[0, -0.2, 0]} material={blackCarbonMaterial}>
        <cylinderGeometry args={[1.35, 1.28, 2.5, 64]} />
      </mesh>

      {/* 2. Procedural Dynamic Label Sleeve: thetaStart: Math.PI / 2 centers the front label (u=0.25) facing camera! */}
      <mesh position={[0, -0.22, 0]} material={labelMaterial}>
        <cylinderGeometry args={[1.356, 1.306, 2.05, 64, 1, true, Math.PI / 2, Math.PI * 2]} />
      </mesh>

      {/* 3. Tub Top Shoulder Slope */}
      <mesh position={[0, 1.15, 0]} material={blackCarbonMaterial}>
        <cylinderGeometry args={[1.05, 1.35, 0.25, 64]} />
      </mesh>

      {/* 4. Metallic Flavor Accent Band Ring */}
      <mesh position={[0, 1.29, 0]} material={accentRingMaterial}>
        <cylinderGeometry args={[1.06, 1.06, 0.04, 64]} />
      </mesh>

      {/* 5. Screw Thread Collar */}
      <mesh position={[0, 1.36, 0]} material={blackCarbonMaterial}>
        <cylinderGeometry args={[0.98, 0.98, 0.12, 64]} />
      </mesh>

      {/* 6. Heavy Titanium Screw-Cap Lid with Beveled Grip */}
      <group position={[0, 1.55, 0]}>
        <mesh material={titaniumCapMaterial}>
          <cylinderGeometry args={[1.12, 1.12, 0.28, 64]} />
        </mesh>
        <mesh position={[0, 0.16, 0]} material={titaniumCapMaterial}>
          <cylinderGeometry args={[1.02, 1.12, 0.05, 64]} />
        </mesh>

        {/* Ribbed Vertical Grip Ridges around Lid rim */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2;
          const x = Math.cos(angle) * 1.125;
          const z = Math.sin(angle) * 1.125;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
              <boxGeometry args={[0.035, 0.26, 0.02]} />
              <meshPhysicalMaterial color="#1E1E24" metalness={0.96} roughness={0.14} clearcoat={0.4} />
            </mesh>
          );
        })}
      </group>

      {/* 7. Bottom Rim Ring */}
      <mesh position={[0, -1.48, 0]} material={blackCarbonMaterial}>
        <cylinderGeometry args={[1.28, 1.22, 0.08, 64]} />
      </mesh>
    </group>
  );
}

// Full 3D Hero Showcase Viewport
export default function Hero3DSupplement({
  activeFlavor = { name: 'Double Rich Chocolate', colorHex: '#5C3317' },
  onFlavorSelect,
}) {
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [targetAngle, setTargetAngle] = useState(null);
  const [viewMode, setViewMode] = useState('front');

  const toggleNutritionView = () => {
    if (viewMode === 'front') {
      setViewMode('nutrition');
      setIsAutoRotate(false);
      setTargetAngle(Math.PI); // 180 degrees flip to back
    } else {
      setViewMode('front');
      setIsAutoRotate(true);
      setTargetAngle(0); // Face front
    }
  };

  const handleReset = () => {
    setViewMode('front');
    setIsAutoRotate(true);
    setTargetAngle(0);
    setTimeout(() => setTargetAngle(null), 1000);
  };

  return (
    <div className="relative w-full h-[480px] lg:h-[580px] select-none rounded-3xl overflow-hidden glass-panel-elevated border border-white/10 shadow-elevated-glow">
      {/* Dynamic Ambient Background Glow matched with active flavor */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-25 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${activeFlavor.colorHex} 0%, #10B981 35%, transparent 70%)`,
        }}
      />

      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Floating 3D Badge Overlays */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold rounded-full bg-zinc-900/85 border border-emerald-500/35 text-emerald-400 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          KINETIC 3D LAB
        </span>
        <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-zinc-300 rounded-full bg-zinc-900/75 border border-white/10 backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          NABL LAB CERTIFIED
        </span>
      </div>

      {/* Viewport Control Buttons */}
      <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-zinc-900/85 p-1.5 rounded-2xl border border-white/10 backdrop-blur-lg shadow-lg">
        <button
          onClick={toggleNutritionView}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
            viewMode === 'nutrition'
              ? 'bg-emerald-500 text-black shadow-volt-glow'
              : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
          }`}
          title="Flip 180° to inspect full Nutrition Facts"
        >
          <Eye className="w-3.5 h-3.5" />
          {viewMode === 'nutrition' ? 'Viewing Facts' : 'Inspect Label'}
        </button>

        <button
          onClick={() => {
            setIsAutoRotate(!isAutoRotate);
            setTargetAngle(null);
          }}
          className={`p-2 rounded-xl transition-all duration-300 ${
            isAutoRotate
              ? 'bg-zinc-800 text-emerald-400'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
          }`}
          title={isAutoRotate ? 'Pause 360° Rotation' : 'Resume 360° Rotation'}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={handleReset}
          className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition duration-300"
          title="Reset View Orientation"
        >
          Reset
        </button>
      </div>

      {/* Interaction Hint */}
      <div className="absolute bottom-4 left-4 z-10 text-[11px] font-mono text-zinc-400 bg-black/50 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm pointer-events-none hidden sm:block">
        ✦ Drag cursor to rotate 360°
      </div>

      {/* 3D React Three Fiber Canvas with Perfect Viewport Framing */}
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="cursor-grab active:cursor-grabbing w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0.1, 5.8]} fov={38} />

        {/* Studio Lighting System */}
        <ambientLight intensity={0.7} color="#0E1311" />
        <directionalLight position={[3.8, 4.8, 4.0]} intensity={2.8} color="#F8FAFC" />
        <directionalLight position={[-4.5, 3.5, -3.5]} intensity={4.2} color="#10B981" />
        <directionalLight position={[4.2, -1.2, -3.2]} intensity={2.0} color="#F59E0B" />
        <directionalLight position={[0, 6.0, 0.5]} intensity={1.3} color="#E2E8F0" />

        {/* Suspended Protein & Energy Sparkles */}
        <Sparkles count={40} scale={6.0} size={2.8} speed={0.4} color="#10B981" opacity={0.6} />
        <Sparkles count={25} scale={5.0} size={2.2} speed={0.3} color="#F59E0B" opacity={0.45} />

        {/* Studio Reflections Environment */}
        <Environment preset="city" />

        {/* The 3D Supplement Tub Mesh */}
        <SupplementTub
          flavorColor={activeFlavor.colorHex}
          flavorName={activeFlavor.name}
          isAutoRotate={isAutoRotate}
          targetAngle={targetAngle}
        />

        {/* 4 Floating Minimalist 3D Accents */}
        <FloatingAccents flavorColor={activeFlavor.colorHex} />

        {/* Soft Contact Shadow on Studio Floor */}
        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.8}
          scale={8.0}
          blur={2.5}
          far={4.0}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
