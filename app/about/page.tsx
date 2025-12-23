'use client'

import { motion } from 'framer-motion'
import { Trophy, Calendar, Users, Heart, Flag } from 'lucide-react'
import Link from 'next/link'

export default function About() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-senegal-green/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-senegal-yellow/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light mb-4 sm:mb-6 text-gray-900 tracking-tight"
          >
            Les Lions de la Teranga
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 px-4"
          >
            L'équipe nationale du Sénégal à la Coupe d'Afrique des Nations
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 md:space-y-16">
          {/* Team Presentation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-senegal-green/30 transition-all"
          >
            <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 text-gray-900 flex items-center gap-3 sm:gap-4 flex-wrap">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-senegal-green/10 rounded-2xl flex items-center justify-center"
              >
                <Users className="w-6 h-6 text-senegal-green" />
              </motion.div>
              Présentation de l'Équipe
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              L'équipe nationale de football du Sénégal, surnommée les <strong className="text-senegal-green">Lions de la Teranga</strong> (mention historique), 
              représente le Sénégal dans les compétitions internationales de football. 
              Fondée en 1960, elle est gérée par la Fédération sénégalaise de football.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Le terme "Teranga" signifie hospitalité en wolof, reflétant les valeurs de générosité 
              et d'accueil chaleureux qui caractérisent le peuple sénégalais. L'équipe nationale 
              incarnent cette fierté nationale sur le terrain de football.
            </p>
          </motion.div>

          {/* CAN History */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-senegal-yellow/30 transition-all"
          >
            <h2 className="text-3xl font-light mb-6 text-gray-900 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-senegal-yellow/10 rounded-2xl flex items-center justify-center"
              >
                <Trophy className="w-6 h-6 text-senegal-yellow" />
              </motion.div>
              Histoire au CAN
            </h2>
            <div className="space-y-6 text-gray-700">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4"
              >
                <Calendar className="w-6 h-6 text-senegal-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Champion 2021</h3>
                  <p className="text-lg leading-relaxed">
                    Le Sénégal a remporté sa première Coupe d'Afrique des Nations en 2021 au Cameroun, 
                    battant l'Égypte en finale aux tirs au but. Cette victoire historique a marqué 
                    l'apogée de plusieurs années de progression constante.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 mt-6"
              >
                <Calendar className="w-6 h-6 text-senegal-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Finaliste 2019 et 2002</h3>
                  <p className="text-lg leading-relaxed">
                    Avant leur victoire en 2021, l'équipe nationale avait atteint la finale 
                    à deux reprises, en 2002 et 2019, démontrant leur régularité au plus haut niveau 
                    du football africain.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4 mt-6"
              >
                <Calendar className="w-6 h-6 text-senegal-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Participation régulière</h3>
                  <p className="text-lg leading-relaxed">
                    Le Sénégal participe régulièrement à la CAN depuis les années 1960, 
                    établissant une tradition de compétitivité et de passion pour le football.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* National Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl border-2 border-gray-100 shadow-lg hover:shadow-xl hover:border-senegal-red/30 transition-all"
          >
            <h2 className="text-3xl font-light mb-6 text-gray-900 flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-senegal-red/10 rounded-2xl flex items-center justify-center"
              >
                <Heart className="w-6 h-6 text-senegal-red" />
              </motion.div>
              Fierté et Identité Nationale
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              L'équipe nationale du Sénégal n'est pas seulement une équipe de football, 
              ils sont le symbole de la fierté sénégalaise et de l'unité nationale. 
              Chaque match est l'occasion pour tout un peuple de se rassembler et de célébrer 
              ensemble les valeurs qui définissent le Sénégal.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Flag className="w-8 h-8 text-senegal-green" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Les Couleurs Nationales</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-senegal-green rounded-lg shadow-md"></div>
                    <span className="text-gray-700 font-medium">Vert</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-senegal-yellow rounded-lg shadow-md"></div>
                    <span className="text-gray-700 font-medium">Jaune</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-senegal-red rounded-lg shadow-md"></div>
                    <span className="text-gray-700 font-medium">Rouge</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-3xl font-light mb-6 text-gray-900">
              Rejoignez le mouvement
            </p>
            <p className="text-lg text-gray-600 mb-10">
              Portez les couleurs du Sénégal et montrez votre soutien à l'équipe nationale
            </p>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-senegal-green to-senegal-green/90 hover:from-senegal-green/90 hover:to-senegal-green text-white font-semibold rounded-2xl transition-all shadow-xl shadow-senegal-green/30 text-lg"
              >
                Acheter votre maillot
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
