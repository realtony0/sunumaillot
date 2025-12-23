'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { products } from '@/data/products'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function ProductsPage() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 text-gray-900 tracking-tight px-4">
            Nos Maillots
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto px-4">
            Découvrez notre collection de maillots officiels du Sénégal
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
            >
              <Link href={`/products/${product.id}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={product.images.front}
                        alt={product.name}
                        fill
                        className="object-contain p-6 sm:p-8 md:p-12"
                        unoptimized
                      />
                    </motion.div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Product Info */}
                  <div className="p-5 sm:p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-light text-gray-900 mb-2 group-hover:text-senegal-green transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100">
                      <div>
                        <span className="text-2xl sm:text-3xl font-light text-senegal-green block">
                          {product.basePrice.toLocaleString()} XOF
                        </span>
                        <span className="text-xs text-gray-500">À partir de</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center text-senegal-green group-hover:text-senegal-green/80 transition-colors touch-manipulation min-h-[44px]"
                      >
                        <span className="text-xs sm:text-sm font-semibold mr-2">Voir détails</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
