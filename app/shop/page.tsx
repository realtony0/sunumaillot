'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import JerseyPreview from '@/components/JerseyPreview'
import { ShoppingCart, AlertCircle } from 'lucide-react'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const BASE_PRICE = 10000 // Prix sans flocage
const FLOCAGE_PRICE = 12000 // Prix avec flocage
// Numéro WhatsApp pour les commandes
const WHATSAPP_NUMBER = '+221 77 698 64 28'

export default function Shop() {
  const [selectedColor, setSelectedColor] = useState<'green' | 'white'>('green')
  const [selectedSize, setSelectedSize] = useState<string>('M')
  const [hasFlocage, setHasFlocage] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'orange-money' | 'wave' | 'livraison' | ''>('')

  const currentPrice = hasFlocage ? FLOCAGE_PRICE : BASE_PRICE

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
    
- Couleur: ${selectedColor === 'green' ? 'Vert' : 'Blanc'}
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

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Maillot Officiel
          </h1>
          <p className="text-gray-400 text-lg">
            Personnalisez votre maillot du Sénégal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Jersey Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-24"
          >
            <JerseyPreview
              color={selectedColor}
              name={hasFlocage ? playerName : ''}
              number={hasFlocage ? playerNumber : ''}
              hasFlocage={hasFlocage}
            />
          </motion.div>

          {/* Customization Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Color Selector */}
            <div>
              <label className="block text-lg font-semibold mb-4 text-gray-200">
                Couleur du maillot
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedColor('green')}
                  className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                    selectedColor === 'green'
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/30'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="w-full h-24 bg-gradient-to-b from-senegal-green to-[#006B2E] rounded mb-2"></div>
                  <p className="text-sm font-medium text-gray-300">Vert</p>
                </button>
                <button
                  onClick={() => setSelectedColor('white')}
                  className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                    selectedColor === 'white'
                      ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/30'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="w-full h-24 bg-gradient-to-b from-white to-gray-100 rounded mb-2 border border-gray-300"></div>
                  <p className="text-sm font-medium text-gray-300">Blanc</p>
                </button>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-lg font-semibold mb-4 text-gray-200">
                Taille
              </label>
              <div className="grid grid-cols-5 gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 px-2 rounded-lg font-bold transition-all ${
                      selectedSize === size
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Flocage Option */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-lg font-semibold text-gray-200">
                  Flocage personnalisé
                </label>
                <button
                  onClick={() => {
                    setHasFlocage(!hasFlocage)
                    if (!hasFlocage) {
                      // Reset when enabling
                      setPlayerName('')
                      setPlayerNumber('')
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    hasFlocage ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      hasFlocage ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Ajoutez votre nom et numéro sur le maillot. La vue 3D est disponible avec le flocage.
              </p>

              {hasFlocage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 mt-4"
                >
                  {/* Name Customization */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Nom (flocage)
                    </label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                      placeholder="Votre nom"
                      maxLength={15}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Maximum 15 caractères
                    </p>
                  </div>

                  {/* Number Customization */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
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
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-senegal-green/10 to-senegal-yellow/10 border-2 border-senegal-green/20 p-6 rounded-2xl">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-900">Prix</span>
                <div className="flex items-baseline gap-3">
                  {hasFlocage && (
                    <span className="text-lg text-gray-500 line-through">
                      {BASE_PRICE.toLocaleString()} XOF
                    </span>
                  )}
                  <span className="text-3xl font-bold text-senegal-green">
                    {currentPrice.toLocaleString()} XOF
                  </span>
                </div>
              </div>
              {hasFlocage && (
                <p className="text-sm text-senegal-green mt-2 font-medium">
                  +2 000 XOF pour le flocage personnalisé
                </p>
              )}
            </div>

            {/* Warning */}
            <div className="bg-senegal-red/20 border border-senegal-red/50 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-senegal-red mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <strong className="text-senegal-red">Important:</strong> Les maillots personnalisés 
                avec flocage ne sont pas remboursables. Veuillez vérifier attentivement vos informations 
                avant de commander.
              </p>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-5 sm:p-6">
              <label className="block text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                Méthode de paiement
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('orange-money')}
                  className={`p-4 rounded-xl border-2 transition-all text-left min-h-[80px] touch-manipulation ${
                    paymentMethod === 'orange-money'
                      ? 'border-senegal-green bg-senegal-green/20 shadow-lg'
                      : 'border-white/30 bg-white/5 hover:border-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'orange-money'
                        ? 'border-senegal-green bg-senegal-green'
                        : 'border-white/50'
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
                      <div className="font-semibold text-white text-sm sm:text-base">Orange Money</div>
                      <div className="text-xs text-white/70">Paiement mobile</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('wave')}
                  className={`p-4 rounded-xl border-2 transition-all text-left min-h-[80px] touch-manipulation ${
                    paymentMethod === 'wave'
                      ? 'border-senegal-green bg-senegal-green/20 shadow-lg'
                      : 'border-white/30 bg-white/5 hover:border-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'wave'
                        ? 'border-senegal-green bg-senegal-green'
                        : 'border-white/50'
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
                      <div className="font-semibold text-white text-sm sm:text-base">Wave</div>
                      <div className="text-xs text-white/70">Paiement mobile</div>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('livraison')}
                  className={`p-4 rounded-xl border-2 transition-all text-left min-h-[80px] touch-manipulation ${
                    paymentMethod === 'livraison'
                      ? 'border-senegal-green bg-senegal-green/20 shadow-lg'
                      : 'border-white/30 bg-white/5 hover:border-white/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'livraison'
                        ? 'border-senegal-green bg-senegal-green'
                        : 'border-white/50'
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
                      <div className="font-semibold text-white text-sm sm:text-base">À la livraison</div>
                      <div className="text-xs text-white/70">Paiement cash</div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-600/50 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Commander via WhatsApp
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

