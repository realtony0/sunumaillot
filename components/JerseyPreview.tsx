'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Box, ImageIcon } from 'lucide-react'

// Import dynamique du composant 3D pour éviter le SSR
const Jersey3D = dynamic(() => import('./Jersey3D'), {
  ssr: false,
  loading: () => (
      <div className="w-full h-[500px] bg-gradient-to-b from-stone-100 to-stone-50 rounded-2xl flex items-center justify-center border border-stone-200">
        <div className="text-stone-600 animate-pulse">Chargement de la vue 3D...</div>
      </div>
  ),
})

interface JerseyPreviewProps {
  color: 'green' | 'white'
  name: string
  number: string
  hasFlocage: boolean
}

export default function JerseyPreview({ color, name, number, hasFlocage }: JerseyPreviewProps) {
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const textColor = color === 'green' ? 'white' : 'black'
  const jerseyImage = color === 'green' ? '/vert_avant.jpeg' : '/blanc_avant.jpeg'
  
  // La vue 3D n'est disponible que si le flocage est activé
  const canUse3D = hasFlocage && (name || number)
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Mode Toggle - seulement si flocage activé */}
      {hasFlocage && canUse3D && (
        <div className="flex gap-2 mb-4 justify-center">
          <button
            onClick={() => setViewMode('2d')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === '2d'
                ? 'bg-stone-800 text-white shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            <ImageIcon className="w-4 h-4 inline mr-2" />
            2D
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === '3d'
                ? 'bg-stone-800 text-white shadow-md'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-stone-300'
            }`}
          >
            <Box className="w-4 h-4 inline mr-2" />
            3D
          </button>
        </div>
      )}

      {(!hasFlocage || !canUse3D || viewMode === '2d') ? (
        <motion.div
          key="2d"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-lg border border-stone-200"
        >
          {/* Enhanced Image Container with filters */}
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
            <Image
              src={jerseyImage}
              alt={`Maillot Sénégal ${color === 'green' ? 'vert' : 'blanc'}`}
              fill
              className="object-contain brightness-110 contrast-105 saturate-110"
              priority
              unoptimized
              quality={95}
            />
            
            {/* Number overlay with enhanced styling */}
            {number && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 8rem)',
                  color: textColor,
                  textShadow: color === 'green' 
                    ? '3px 3px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.3)' 
                    : '3px 3px 6px rgba(0,0,0,0.9), 0 0 15px rgba(0,0,0,0.6)',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '900',
                  letterSpacing: '-0.02em',
                  WebkitTextStroke: color === 'green' ? '1px rgba(0,0,0,0.3)' : '1px rgba(255,255,255,0.3)',
                }}
              >
                {number}
              </motion.div>
            )}

            {/* Name overlay with enhanced styling */}
            {name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 font-bold uppercase tracking-wider text-center"
                style={{
                  fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                  color: textColor,
                  textShadow: color === 'green' 
                    ? '2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.6)' 
                    : '2px 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.6)',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: '700',
                  maxWidth: '80%',
                  letterSpacing: '0.1em',
                }}
              >
                {name}
              </motion.div>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="3d"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Jersey3D color={color} name={name} number={number} />
        </motion.div>
      )}
    </div>
  )
}

