import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PartId } from '../types';

// Extend JSX.IntrinsicElements to include React Three Fiber elements
// We need to ensure these are defined in the global JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      primitive: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      color: any;
    }
  }
}

// Depending on the React/TS version, the JSX namespace might be under React
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      primitive: any;
      meshStandardMaterial: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
      color: any;
    }
  }
}

interface SceneProps {
  onPartSelect: (id: PartId | null) => void;
  selectedPartId: PartId | null;
}

// Reusable component for interactive parts
const PartMesh = ({ 
  id, 
  geometry, 
  material,
  position, 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color,
  onSelect,
  isSelected,
  children
}: {
  id: PartId;
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  color?: string;
  onSelect: (id: PartId) => void;
  isSelected: boolean;
  children?: React.ReactNode;
}) => {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && isSelected) {
      // Pulse effect for selected item
      const t = state.clock.getElapsedTime();
      meshRef.current.scale.setScalar(1 + Math.sin(t * 5) * 0.02);
    } else if (meshRef.current) {
        meshRef.current.scale.setScalar(1);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHover(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    setHover(false);
    document.body.style.cursor = 'auto';
  };

  const finalColor = isSelected ? '#3b82f6' : (hovered ? '#60a5fa' : (color || 'white'));

  return (
    <group position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)} scale={new THREE.Vector3(...scale)}>
      {children ? (
        <group
          onClick={(e) => { e.stopPropagation(); onSelect(id); }}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {children}
        </group>
      ) : (
        <mesh
          ref={meshRef}
          geometry={geometry}
          onClick={(e) => { e.stopPropagation(); onSelect(id); }}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {material ? (
            <primitive object={material} attach="material" color={finalColor} />
          ) : (
            <meshStandardMaterial 
                color={finalColor} 
                roughness={id === 'platter' ? 0.1 : 0.6}
                metalness={id === 'platter' ? 0.9 : 0.4}
            />
          )}
        </mesh>
      )}
    </group>
  );
};

const HDDModel = ({ onPartSelect, selectedPartId }: { onPartSelect: (id: PartId) => void, selectedPartId: PartId | null }) => {
  
  // Geometries
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const cylGeo = new THREE.CylinderGeometry(1, 1, 1, 32);

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      
      {/* 1. Base Casting */}
      <PartMesh 
        id="base" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'base'}
        position={[0, -0.2, 0]} 
        color="#2d3748"
      >
        {/* Main Base Plate */}
        <mesh geometry={boxGeo} scale={[4.5, 0.2, 6]} position={[0, 0, 0]}>
            <meshStandardMaterial color={selectedPartId === 'base' ? '#3b82f6' : '#1a202c'} roughness={0.8} />
        </mesh>
        {/* Side Walls */}
        <mesh geometry={boxGeo} scale={[0.2, 0.8, 6]} position={[2.15, 0.4, 0]}>
            <meshStandardMaterial color={selectedPartId === 'base' ? '#3b82f6' : '#1a202c'} />
        </mesh>
        <mesh geometry={boxGeo} scale={[0.2, 0.8, 6]} position={[-2.15, 0.4, 0]}>
            <meshStandardMaterial color={selectedPartId === 'base' ? '#3b82f6' : '#1a202c'} />
        </mesh>
        <mesh geometry={boxGeo} scale={[4.5, 0.8, 0.2]} position={[0, 0.4, -2.9]}>
            <meshStandardMaterial color={selectedPartId === 'base' ? '#3b82f6' : '#1a202c'} />
        </mesh>
        <mesh geometry={boxGeo} scale={[4.5, 0.8, 0.2]} position={[0, 0.4, 2.9]}>
            <meshStandardMaterial color={selectedPartId === 'base' ? '#3b82f6' : '#1a202c'} />
        </mesh>
      </PartMesh>

      {/* 2. Platters */}
      <PartMesh 
        id="platter" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'platter'}
        position={[0, 0.1, -0.5]}
        color="#e2e8f0"
      >
         {/* Top Platter */}
         <mesh geometry={cylGeo} scale={[1.8, 0.05, 1.8]} position={[0, 0.15, 0]}>
            <meshStandardMaterial 
                color={selectedPartId === 'platter' ? '#3b82f6' : '#e2e8f0'} 
                roughness={0.1} 
                metalness={0.95} 
            />
         </mesh>
         {/* Bottom Platter */}
         <mesh geometry={cylGeo} scale={[1.8, 0.05, 1.8]} position={[0, -0.05, 0]}>
            <meshStandardMaterial 
                color={selectedPartId === 'platter' ? '#3b82f6' : '#e2e8f0'} 
                roughness={0.1} 
                metalness={0.95} 
            />
         </mesh>
      </PartMesh>

      {/* 3. Spindle */}
      <PartMesh 
        id="spindle" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'spindle'}
        position={[0, 0.15, -0.5]}
        geometry={cylGeo}
        scale={[0.3, 0.25, 0.3]} // Taller for 2 platters
        color="#a0aec0"
      />

      {/* 4. Actuator Assembly (Magnet) */}
      <PartMesh 
        id="actuator" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'actuator'}
        position={[-1.2, 0.1, 1.5]}
        color="#718096"
      >
        {/* Magnet Housing */}
        <mesh geometry={cylGeo} scale={[0.8, 0.2, 0.8]} position={[0, 0, 0]}>
           <meshStandardMaterial color={selectedPartId === 'actuator' ? '#3b82f6' : '#718096'} metalness={0.6} />
        </mesh>
        <mesh geometry={boxGeo} scale={[1, 0.2, 1]} position={[0.5, 0, 0.5]} rotation={[0, Math.PI/4, 0]}>
           <meshStandardMaterial color={selectedPartId === 'actuator' ? '#3b82f6' : '#718096'} metalness={0.6} />
        </mesh>
      </PartMesh>

       {/* 5. Actuator Axis */}
       <PartMesh 
        id="actuator_axis" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'actuator_axis'}
        position={[-1.2, 0.25, 1.5]}
        geometry={cylGeo}
        scale={[0.1, 0.35, 0.1]}
        color="#4a5568"
      />

      {/* 6. Actuator Arm */}
      <PartMesh 
        id="arm" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'arm'}
        position={[-0.7, 0.2, 0.7]} // Midpoint roughly
        rotation={[0, -0.5, 0]}
        color="#cbd5e0"
      >
        {/* Top Arm */}
        <mesh geometry={boxGeo} scale={[0.4, 0.05, 2.0]} position={[0, 0.08, 0]}>
             <meshStandardMaterial color={selectedPartId === 'arm' ? '#3b82f6' : '#cbd5e0'} metalness={0.8} />
        </mesh>
        {/* Bottom Arm */}
        <mesh geometry={boxGeo} scale={[0.4, 0.05, 2.0]} position={[0, -0.08, 0]}>
             <meshStandardMaterial color={selectedPartId === 'arm' ? '#3b82f6' : '#cbd5e0'} metalness={0.8} />
        </mesh>
      </PartMesh>

      {/* 7. Head / Slider */}
      <PartMesh 
        id="head" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'head'}
        position={[-0.2, 0.18, -0.15]} 
        color="#d69e2e"
      >
        <mesh geometry={boxGeo} scale={[0.1, 0.05, 0.15]} position={[0, 0.08, 0]}>
            <meshStandardMaterial color={selectedPartId === 'head' ? '#3b82f6' : '#d69e2e'} />
        </mesh>
         <mesh geometry={boxGeo} scale={[0.1, 0.05, 0.15]} position={[0, -0.08, 0]}>
            <meshStandardMaterial color={selectedPartId === 'head' ? '#3b82f6' : '#d69e2e'} />
        </mesh>
      </PartMesh>

      {/* 8. Ribbon Cable */}
      <PartMesh 
        id="ribbon" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'ribbon'}
        position={[-0.5, 0.1, 2.2]} 
        rotation={[0.2, 0, 0]}
        color="#dd6b20"
      >
         <mesh geometry={boxGeo} scale={[0.8, 0.02, 0.8]}>
            <meshStandardMaterial color={selectedPartId === 'ribbon' ? '#3b82f6' : '#dd6b20'} />
         </mesh>
      </PartMesh>

      {/* 9. SCSI Connector */}
      <PartMesh 
        id="connector_scsi" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'connector_scsi'}
        position={[1.0, 0, 3.1]} 
        color="#1a202c"
      >
        <mesh geometry={boxGeo} scale={[1.8, 0.3, 0.3]}>
             <meshStandardMaterial color={selectedPartId === 'connector_scsi' ? '#3b82f6' : '#1a202c'} />
        </mesh>
         {/* Pins simulation */}
         <mesh geometry={boxGeo} scale={[1.6, 0.1, 0.1]} position={[0, 0, 0.15]}>
             <meshStandardMaterial color="#ecc94b" />
        </mesh>
      </PartMesh>

      {/* 10. Power Connector */}
      <PartMesh 
        id="connector_power" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'connector_power'}
        position={[-0.8, 0, 3.1]} 
        color="#edf2f7"
      >
         <mesh geometry={boxGeo} scale={[1.0, 0.3, 0.3]}>
             <meshStandardMaterial color={selectedPartId === 'connector_power' ? '#3b82f6' : '#edf2f7'} />
         </mesh>
         <mesh geometry={cylGeo} scale={[0.05, 0.2, 0.05]} position={[-0.3, 0, 0.15]} rotation={[1.57,0,0]} >
            <meshStandardMaterial color="#2d3748" />
         </mesh>
         <mesh geometry={cylGeo} scale={[0.05, 0.2, 0.05]} position={[0, 0, 0.15]} rotation={[1.57,0,0]} >
            <meshStandardMaterial color="#2d3748" />
         </mesh>
         <mesh geometry={cylGeo} scale={[0.05, 0.2, 0.05]} position={[0.3, 0, 0.15]} rotation={[1.57,0,0]} >
            <meshStandardMaterial color="#2d3748" />
         </mesh>
      </PartMesh>

      {/* 11. Jumpers */}
      <PartMesh 
        id="jumper_pins" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'jumper_pins'}
        position={[-1.8, 0, 3.1]} 
        color="#d4af37"
      >
          {/* Pins block */}
         <mesh geometry={boxGeo} scale={[0.6, 0.2, 0.2]} >
             <meshStandardMaterial color={selectedPartId === 'jumper_pins' ? '#3b82f6' : '#d4af37'} />
         </mesh>
      </PartMesh>

       <PartMesh 
        id="jumper" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'jumper'}
        position={[-1.8, 0.05, 3.2]} 
        color="#38a169"
      >
          {/* Plastic cap */}
         <mesh geometry={boxGeo} scale={[0.15, 0.15, 0.15]} >
             <meshStandardMaterial color={selectedPartId === 'jumper' ? '#3b82f6' : '#38a169'} />
         </mesh>
      </PartMesh>

      {/* 12. Tape Seal */}
      <PartMesh 
        id="tape_seal" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'tape_seal'}
        position={[2.3, 0.4, 0]} 
        color="#ecc94b"
      >
        {/* Side tape */}
        <mesh geometry={boxGeo} scale={[0.05, 0.6, 3]}>
             <meshStandardMaterial color={selectedPartId === 'tape_seal' ? '#3b82f6' : '#ecc94b'} transparent opacity={0.8} />
        </mesh>
      </PartMesh>

      {/* 13. Cover Mounting Holes */}
       <PartMesh 
        id="cover_mount_holes" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'cover_mount_holes'}
        position={[0, 0, 0]} 
        color="#718096"
      >
        {/* 4 Corner holes on top of the rim */}
        <mesh geometry={cylGeo} scale={[0.15, 0.05, 0.15]} position={[2.1, 0.85, -2.8]}>
             <meshStandardMaterial color={selectedPartId === 'cover_mount_holes' ? '#3b82f6' : '#a0aec0'} />
        </mesh>
        <mesh geometry={cylGeo} scale={[0.15, 0.05, 0.15]} position={[-2.1, 0.85, -2.8]}>
             <meshStandardMaterial color={selectedPartId === 'cover_mount_holes' ? '#3b82f6' : '#a0aec0'} />
        </mesh>
        <mesh geometry={cylGeo} scale={[0.15, 0.05, 0.15]} position={[-2.1, 0.85, 2.8]}>
             <meshStandardMaterial color={selectedPartId === 'cover_mount_holes' ? '#3b82f6' : '#a0aec0'} />
        </mesh>
         <mesh geometry={cylGeo} scale={[0.15, 0.05, 0.15]} position={[2.1, 0.85, 2.8]}>
             <meshStandardMaterial color={selectedPartId === 'cover_mount_holes' ? '#3b82f6' : '#a0aec0'} />
        </mesh>
      </PartMesh>

      {/* 14. Case Mounting Holes */}
      <PartMesh 
        id="case_mount_holes" 
        onSelect={onPartSelect} 
        isSelected={selectedPartId === 'case_mount_holes'}
        position={[0, 0, 0]} 
        color="#718096"
      >
        {/* Holes on the right side wall */}
        <mesh geometry={cylGeo} scale={[0.1, 0.1, 0.1]} position={[2.25, 0.4, -2.0]} rotation={[0,0,1.57]}>
             <meshStandardMaterial color={selectedPartId === 'case_mount_holes' ? '#3b82f6' : '#4a5568'} />
        </mesh>
        <mesh geometry={cylGeo} scale={[0.1, 0.1, 0.1]} position={[2.25, 0.4, 0]} rotation={[0,0,1.57]}>
             <meshStandardMaterial color={selectedPartId === 'case_mount_holes' ? '#3b82f6' : '#4a5568'} />
        </mesh>
        <mesh geometry={cylGeo} scale={[0.1, 0.1, 0.1]} position={[2.25, 0.4, 2.0]} rotation={[0,0,1.57]}>
             <meshStandardMaterial color={selectedPartId === 'case_mount_holes' ? '#3b82f6' : '#4a5568'} />
        </mesh>
      </PartMesh>

    </group>
  );
};

const HDDScene: React.FC<SceneProps> = ({ onPartSelect, selectedPartId }) => {
  return (
    <Canvas shadows camera={{ position: [5, 8, 5], fov: 45 }}>
      <color attach="background" args={['#0f172a']} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="city" />

      {/* Interactive Model */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
        <HDDModel onPartSelect={onPartSelect} selectedPartId={selectedPartId} />
      </Float>
      
      <OrbitControls 
        enablePan={false} 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 2} 
        autoRotate={!selectedPartId}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default HDDScene;