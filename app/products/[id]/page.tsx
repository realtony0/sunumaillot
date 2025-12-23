'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { products } from '@/data/products'
import { ShoppingCart, AlertCircle, ArrowLeft, Check, Globe } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
// Numéro WhatsApp pour les commandes
const WHATSAPP_NUMBER = '+221 77 698 64 28'

export default function ProductDetailPage() {
  const params = useParams()
  const product = products.find((p) => p.id === params.id)

  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [hasFlocage, setHasFlocage] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [imageView, setImageView] = useState<'front' | 'back'>('front')
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<'orange-money' | 'wave' | 'livraison' | ''>('')

  if (!product) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <p className="text-gray-600">Produit non trouvé</p>
      </div>
    )
  }

  const currentPrice = hasFlocage ? product.flocagePrice : product.basePrice

  const handleOrder = () => {
    if (!paymentMethod) {
      alert('Veuillez sélectionner une méthode de paiement')
      return
    }

    const paymentMethodText = 
      paymentMethod === 'orange-money' ? 'Orange Money' :
      paymentMethod === 'wave' ? 'Wave' :
      'Paiement à la livraison'

    const message = `Bonjour, je souhaite commander un maillot du Sénégal:
    
- Modèle: ${product.name}
- Couleur: ${product.color === 'green' ? 'Vert' : 'Blanc'}
- Taille: ${selectedSize}
${hasFlocage ? '- Avec flocage personnalisé' : '- Sans flocage'}
${playerName ? `- Nom: ${playerName}` : ''}
${playerNumber ? `- Numéro: ${playerNumber}` : ''}

Prix: ${currentPrice.toLocaleString()} XOF
Méthode de paiement: ${paymentMethodText}`

    const phoneNumber = WHATSAPP_NUMBER.replace(/\s/g, '').replace('+', '')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const allImages = [
    product.images.front,
    ...(product.images.back ? [product.images.back] : []),
    ...(product.images.gallery || [])
  ]

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-senegal-green mb-6 sm:mb-8 transition-colors group touch-manipulation min-h-[44px]"
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            </motion.div>
            <span className="text-sm sm:text-base">Retour aux produits</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[3/4] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-100"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedGalleryImage || imageView}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={selectedGalleryImage || (imageView === 'back' && product.images.back ? product.images.back : product.images.front)}
                    alt={`${product.name}`}
                    fill
                    className="object-contain p-4 sm:p-6 md:p-8"
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Image Toggle - Only show if back image exists */}
            {product.images.back && (
              <div className="flex gap-2 sm:gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setImageView('front')
                    setSelectedGalleryImage(null)
                  }}
                  className={`flex-1 min-h-[48px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all touch-manipulation ${
                    imageView === 'front' && !selectedGalleryImage
                      ? 'border-senegal-green bg-senegal-green text-white shadow-lg shadow-senegal-green/30'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-senegal-green/50 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">Vue avant</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setImageView('back')
                    setSelectedGalleryImage(null)
                  }}
                  className={`flex-1 min-h-[48px] p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all touch-manipulation ${
                    imageView === 'back' && !selectedGalleryImage
                      ? 'border-senegal-green bg-senegal-green text-white shadow-lg shadow-senegal-green/30'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-senegal-green/50 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">Vue dos</span>
                </motion.button>
              </div>
            )}

            {/* Gallery Thumbnails */}
            {product.images.gallery && product.images.gallery.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Galerie</p>
                <div className="grid grid-cols-3 gap-3">
                  {product.images.gallery.map((img, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedGalleryImage(img)
                        setImageView('front')
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedGalleryImage === img
                          ? 'border-senegal-green shadow-lg'
                          : 'border-gray-200 hover:border-senegal-green/50'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Info & Customization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Product Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-3 sm:mb-4 tracking-tight"
              >
                {product.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-base sm:text-lg leading-relaxed"
              >
                {product.description}
              </motion.p>
            </div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pb-4 sm:pb-6 border-b border-gray-200"
            >
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl md:text-5xl font-light text-senegal-green">
                  {currentPrice.toLocaleString()} XOF
                </span>
                {hasFlocage && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs sm:text-sm text-gray-500 line-through"
                  >
                    {product.basePrice.toLocaleString()} XOF
                  </motion.span>
                )}
              </div>
              {hasFlocage && (
                <p className="text-xs sm:text-sm text-senegal-green mt-2 font-medium">
                  +2 000 XOF pour le flocage personnalisé
                </p>
              )}
            </motion.div>

            {/* Size Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4 uppercase tracking-wider">
                Taille
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {SIZES.map((size, index) => (
                  <motion.button
                    key={size}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`min-h-[48px] py-3 sm:py-4 px-1 sm:px-2 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all relative touch-manipulation ${
                      selectedSize === size
                        ? 'bg-senegal-green text-white shadow-lg shadow-senegal-green/30'
                        : 'bg-white text-gray-700 hover:bg-senegal-green/5 border-2 border-gray-200 hover:border-senegal-green/50'
                    }`}
                  >
                    {selectedSize === size && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-senegal-yellow rounded-full p-1"
                      >
                        <Check className="w-3 h-3 text-senegal-green" />
                      </motion.div>
                    )}
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Flocage Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:border-senegal-green/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Flocage personnalisé
                  </label>
                  <p className="text-xs text-gray-500 mt-1">+2 000 XOF</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setHasFlocage(!hasFlocage)
                    if (!hasFlocage) {
                      setPlayerName('')
                      setPlayerNumber('')
                    }
                  }}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors touch-manipulation ${
                    hasFlocage ? 'bg-senegal-green' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle flocage"
                >
                  <motion.span
                    layout
                    className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
                    animate={{
                      x: hasFlocage ? 28 : 4,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </motion.button>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Ajoutez votre nom et numéro sur le maillot.
              </p>

              <AnimatePresence>
                {hasFlocage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 mt-4 pt-4 border-t border-gray-200"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Nom (flocage)
                      </label>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                        placeholder="Votre nom"
                        maxLength={15}
                        className="w-full min-h-[48px] px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-senegal-green transition-all"
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Maximum 15 caractères
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium mb-2 text-gray-700">
                        Numéro (1-99)
                      </label>
                      <input
                        type="number"
                        value={playerNumber}
                        onChange={(e) => {
                          const num = e.target.value
                          if (num === '' || (parseInt(num) >= 1 && parseInt(num) <= 99)) {
                            setPlayerNumber(num)
                          }
                        }}
                        placeholder="10"
                        min="1"
                        max="99"
                        className="w-full min-h-[48px] px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-senegal-green transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-senegal-green/10 to-senegal-yellow/10 border-2 border-senegal-green/20 rounded-2xl p-5 flex items-center gap-4"
            >
              <Globe className="w-6 h-6 text-senegal-green flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Livraison internationale</p>
                <p className="text-sm text-gray-600">Nous livrons partout dans le monde</p>
              </div>
            </motion.div>

            {/* Warning */}
            <AnimatePresence>
              {hasFlocage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-senegal-red/10 border-2 border-senegal-red/30 rounded-2xl p-4 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-senegal-red mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-senegal-red">
                    <strong>Important:</strong> Les maillots personnalisés avec flocage ne sont pas remboursables.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Payment Method Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="bg-white border-2 border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:border-senegal-green/30 transition-colors"
            >
              <label className="block text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
                Méthode de paiement
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('orange-money')}
                  className={`p-4 rounded-xl border-2 transition-all text-left min-h-[80px] touch-manipulation ${
                    paymentMethod === 'orange-money'
                      ? 'border-senegal-green bg-senegal-green/10 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-senegal-green/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'orange-money'
                        ? 'border-senegal-green bg-senegal-green'
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'orange-money' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">Orange Money</div>
                      <div className="text-xs text-gray-500">Paiement mobile</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('wave')}
                  className={`p-4 rounded-xl border-2 transition-all text-left min-h-[80px] touch-manipulation ${
                    paymentMethod === 'wave'
                      ? 'border-senegal-green bg-senegal-green/10 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-senegal-green/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'wave'
                        ? 'border-senegal-green bg-senegal-green'
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'wave' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">Wave</div>
                      <div className="text-xs text-gray-500">Paiement mobile</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('livraison')}
                  className={`p-4 rounded-xl border-2 transition-all text-left min-h-[80px] touch-manipulation ${
                    paymentMethod === 'livraison'
                      ? 'border-senegal-green bg-senegal-green/10 shadow-lg'
                      : 'border-gray-200 bg-gray-50 hover:border-senegal-green/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'livraison'
                        ? 'border-senegal-green bg-senegal-green'
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'livraison' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 bg-white rounded-full"
                        />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">À la livraison</div>
                      <div className="text-xs text-gray-500">Paiement cash</div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Order Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleOrder}
              className="w-full min-h-[56px] py-4 sm:py-5 bg-gradient-to-r from-senegal-green to-senegal-green/90 hover:from-senegal-green/90 hover:to-senegal-green text-white font-semibold rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-senegal-green/30 flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg touch-manipulation"
            >
              <ShoppingCart className="w-5 h-5" />
              Commander via WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
