'use client'

import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, Environment } from '@react-three/drei'
import { Mesh, DoubleSide } from 'three'
import { RotateCcw } from 'lucide-react'

interface Jersey3DProps {
  color: 'green' | 'white'
  name: string
  number: string
}

function JerseyMesh({ color, name, number }: Jersey3DProps) {
  const meshRef = useRef<Mesh>(null)
  const textColor = color === 'green' ? '#ffffff' : '#000000'
  const jerseyColor = color === 'green' ? '#00853F' : '#ffffff'
  
  return (
    <group>
      {/* Maillot principal avec forme plus réaliste */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2.5, 0.3]} />
        <meshStandardMaterial 
          color={jerseyColor} 
          roughness={0.4}
          metalness={0.05}
          side={DoubleSide}
        />
      </mesh>

      {/* Bande jaune (haut) */}
      {color === 'green' && (
        <mesh position={[0, 1.1, 0.16]}>
          <boxGeometry args={[2.1, 0.15, 0.1]} />
          <meshStandardMaterial color="#FCD116" />
        </mesh>
      )}

      {/* Bande rouge (bas) */}
      {color === 'green' && (
        <mesh position={[0, -1.1, 0.16]}>
          <boxGeometry args={[2.1, 0.15, 0.1]} />
          <meshStandardMaterial color="#E31B23" />
        </mesh>
      )}

      {/* Numéro sur le dos - Utilisation de Text sans police personnalisée */}
      {number && (
        <Text
          position={[0, 0.2, 0.16]}
          fontSize={0.8}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor={color === 'green' ? '#000000' : '#ffffff'}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff"
        >
          {number}
        </Text>
      )}

      {/* Nom sur le dos */}
      {name && (
        <Text
          position={[0, -0.8, 0.16]}
          fontSize={0.15}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          maxWidth={1.5}
          outlineWidth={0.03}
          outlineColor={color === 'green' ? '#000000' : '#ffffff'}
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff"
        >
          {name.toUpperCase()}
        </Text>
      )}

      {/* Éclairage amélioré */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.6} />
      <pointLight position={[0, 0, 5]} intensity={0.5} />
    </group>
  )
}

export default function Jersey3D({ color, name, number }: Jersey3DProps) {
  const controlsRef = useRef<any>(null)

  const resetRotation = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-b from-stone-100 to-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-lg">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={true}
            autoRotateSpeed={0.8}
            enableDamping={true}
            dampingFactor={0.05}
          />
          <JerseyMesh color={color} name={name} number={number} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      
      {/* Contrôles UI */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <button
          onClick={resetRotation}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-sm font-medium backdrop-blur-sm transition-all shadow-lg"
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Réinitialiser
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 bg-stone-800/80 backdrop-blur-md px-3 py-2 rounded-xl text-white text-xs border border-stone-700">
        <p>🖱️ Glissez pour tourner • 🔍 Pincez pour zoomer</p>
      </div>
    </div>
  )
}

