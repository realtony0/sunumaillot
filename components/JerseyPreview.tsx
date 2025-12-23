'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface JerseyPreviewProps {
  color: 'green' | 'white'
  name: string
  number: string
  hasFlocage: boolean
}

export default function JerseyPreview({ color, name, number, hasFlocage }: JerseyPreviewProps) {
  const textColor = color === 'green' ? 'white' : 'black'
  const jerseyImage = color === 'green' ? '/vert_avant.jpeg' : '/blanc_avant.jpeg'
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200"
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
          {hasFlocage && number && (
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
          {hasFlocage && name && (
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
    </div>
  )
}
