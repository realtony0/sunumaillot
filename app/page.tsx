'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Users, Flag, Sparkles, Star, ShoppingBag } from 'lucide-react'
import { products } from '@/data/products'

export default function Home() {
  const featuredProducts = products.slice(0, 2)

  return (
    <div className="pt-16">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-senegal-green/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-senegal-yellow/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-senegal-red/5 rounded-full blur-3xl"
          />
        </div>

        {/* Floating Jersey Images */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -15 }}
            animate={{ opacity: 0.15, x: 0, rotate: -10 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute left-0 top-1/4 w-64 h-80 opacity-10"
          >
            <Image
              src="/vert_avant.jpeg"
              alt="Maillot vert"
              fill
              className="object-contain"
              unoptimized
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 15 }}
            animate={{ opacity: 0.15, x: 0, rotate: 10 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="absolute right-0 top-1/3 w-64 h-80 opacity-10"
          >
            <Image
              src="/blanc_avant.jpeg"
              alt="Maillot blanc"
              fill
              className="object-contain"
              unoptimized
            />
          </motion.div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-senegal-green/10 to-senegal-yellow/10 border border-senegal-green/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-senegal-green" />
              <span className="text-sm font-semibold text-gray-700">Maillots Officiels CAN 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-6 sm:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-senegal-green via-senegal-yellow to-senegal-green px-4 tracking-tight"
            >
              Sunu Maillot
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-4 sm:mb-6 max-w-4xl mx-auto font-bold px-4 leading-tight"
            >
              Portez la fierté du{' '}
              <span className="text-senegal-green">Sénégal</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 font-medium"
            >
              Maillots officiels avec personnalisation disponible. 
              <span className="block mt-2 text-senegal-green font-semibold">Livraison internationale ✈️</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 133, 63, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center min-h-[56px] px-8 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-senegal-green via-senegal-green to-senegal-green/90 hover:from-senegal-green/90 hover:via-senegal-green hover:to-senegal-green text-white font-bold rounded-2xl transition-all shadow-2xl shadow-senegal-green/40 text-lg sm:text-xl touch-manipulation group"
                >
                  <ShoppingBag className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                  Découvrir les maillots
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto px-4"
            >
              {[
                { label: 'Maillots', value: '2', icon: Star },
                { label: 'Personnalisation', value: 'Oui', icon: Sparkles },
                { label: 'Livraison', value: 'Mondiale', icon: Flag },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-senegal-green mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Predict the Score Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-senegal-green/5 via-white to-senegal-yellow/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: ['-50%', '50%'],
              y: ['-50%', '50%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-0 w-96 h-96 bg-senegal-green/10 rounded-full blur-3xl"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center px-4 py-2 bg-senegal-yellow/20 border-2 border-senegal-yellow/30 rounded-full mb-4"
            >
              <Trophy className="w-5 h-5 text-senegal-yellow mr-2" />
              <span className="text-sm font-bold text-gray-900">Jeu Concours</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-gray-900 tracking-tight">
              🎯 Devine le Score
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
              Prédisez le score exact du prochain match du Sénégal et gagnez{' '}
              <span className="font-bold text-senegal-green text-2xl">50% de réduction</span> sur votre maillot !
            </p>
            <p className="text-sm text-gray-600 mb-8">
              Les 5 premiers gagnants remportent la réduction. Une seule prédiction par match.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl border-2 border-senegal-green/20 p-6 sm:p-8 md:p-10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-senegal-green/5 rounded-xl">
                  <div className="text-3xl font-bold text-senegal-green mb-2">5</div>
                  <div className="text-sm text-gray-600">Gagnants</div>
                </div>
                <div className="text-center p-4 bg-senegal-yellow/5 rounded-xl">
                  <div className="text-3xl font-bold text-senegal-yellow mb-2">50%</div>
                  <div className="text-sm text-gray-600">Réduction</div>
                </div>
                <div className="text-center p-4 bg-senegal-red/5 rounded-xl">
                  <div className="text-3xl font-bold text-senegal-red mb-2">20</div>
                  <div className="text-sm text-gray-600">Places max</div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-senegal-green rounded-full"></div>
                  <span>Score exact requis pour gagner</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-senegal-green rounded-full"></div>
                  <span>Code promo envoyé par email après le match</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-senegal-green rounded-full"></div>
                  <span>Valable sur tous les maillots (30 jours)</span>
                </div>
              </div>

              <Link href="/predict">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0, 133, 63, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full min-h-[56px] py-4 sm:py-5 bg-gradient-to-r from-senegal-green to-senegal-green/90 hover:from-senegal-green/90 hover:to-senegal-green text-white font-bold rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-senegal-green/30 text-base sm:text-lg touch-manipulation flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Participer maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
              Nos <span className="text-senegal-green">Maillots</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez votre maillot officiel du Sénégal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-senegal-green/30">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={product.images.front}
                          alt={product.name}
                          fill
                          className="object-contain p-8 sm:p-12"
                          unoptimized
                          priority={index < 2}
                        />
                      </motion.div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Product Info */}
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 group-hover:text-senegal-green transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <span className="text-3xl sm:text-4xl font-bold text-senegal-green block">
                            {product.basePrice.toLocaleString()} XOF
                          </span>
                          <span className="text-xs text-gray-500">À partir de</span>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-senegal-green group-hover:text-senegal-green/80 transition-colors"
                        >
                          <span className="text-sm font-semibold mr-2">Voir</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section - Enhanced */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,_rgba(0,133,63,0.15)_1px,_transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
              Le Sénégal au <span className="text-senegal-green">CAN</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez l'histoire et la fierté du Sénégal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-white p-8 sm:p-10 rounded-3xl border-2 border-gray-100 hover:border-senegal-yellow/50 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-senegal-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-senegal-yellow/20 to-senegal-yellow/10 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-senegal-yellow" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Champion 2021</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Le Sénégal a remporté sa première Coupe d'Afrique des Nations en 2021, 
                  marquant l'histoire du football africain.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-white p-8 sm:p-10 rounded-3xl border-2 border-gray-100 hover:border-senegal-green/50 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-senegal-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-senegal-green/20 to-senegal-green/10 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-senegal-green" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Lions de la Teranga</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Surnom emblématique de l'équipe nationale, symbolisant la force, 
                  la fierté et l'hospitalité sénégalaise.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-white p-8 sm:p-10 rounded-3xl border-2 border-gray-100 hover:border-senegal-red/50 transition-all shadow-xl hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-senegal-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-senegal-red/20 to-senegal-red/10 rounded-2xl flex items-center justify-center mb-6"
                >
                  <Flag className="w-8 h-8 sm:w-10 sm:h-10 text-senegal-red" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Couleurs Nationales</h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  Vert, jaune et rouge - les couleurs du drapeau sénégalais, 
                  portées avec fierté sur chaque maillot.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link href="/about">
              <motion.button
                whileHover={{ x: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white border-2 border-senegal-green text-senegal-green hover:bg-senegal-green hover:text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-base sm:text-lg touch-manipulation"
              >
                En savoir plus sur le Sénégal au CAN
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
