'use client'

import { Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">sunumaillot</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Maillot officiel du Sénégal pour la Coupe d'Afrique des Nations
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Informations</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <span className="text-senegal-green">✓</span>
                Livraison internationale
              </li>
              <li className="flex items-center gap-2">
                <span className="text-senegal-green">✓</span>
                Maillots personnalisés
              </li>
              <li className="flex items-center gap-2">
                <span className="text-senegal-green">✓</span>
                Support client
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Contact</h3>
            <div className="space-y-2 text-xs sm:text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-senegal-green flex-shrink-0" />
                <a href="tel:+221777289979" className="hover:text-senegal-green transition-colors">+221 77 728 99 79</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-senegal-green flex-shrink-0" />
                <a href="tel:+221776986428" className="hover:text-senegal-green transition-colors">+221 77 698 64 28</a>
                <span className="text-xs text-senegal-green ml-1">(Commandes WhatsApp)</span>
              </p>
            </div>
            <p className="text-senegal-red text-xs sm:text-sm mt-3 sm:mt-4 font-medium">
              ⚠️ Les maillots personnalisés ne sont pas remboursables
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-senegal-green/20 text-center text-xs sm:text-sm text-gray-600">
          <p>© 2025 sunumaillot - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}

