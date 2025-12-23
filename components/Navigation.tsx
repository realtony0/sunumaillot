'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/products', label: 'Produits' },
    { href: '/about', label: 'À Propos' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-lg border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 sm:space-x-3" onClick={closeMobileMenu}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl sm:text-3xl"
              >
                🇸🇳
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="text-lg sm:text-xl font-semibold text-gray-900"
              >
                sunumaillot
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                const isActive = item.href === '/' 
                  ? pathname === '/' 
                  : pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all rounded-lg ${
                      isActive
                        ? 'text-senegal-green bg-senegal-green/5'
                        : 'text-gray-700 hover:text-senegal-green hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-senegal-green rounded-full"
                        initial={false}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-senegal-green transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = item.href === '/' 
                    ? pathname === '/' 
                    : pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`block px-4 py-3 text-base font-medium rounded-xl transition-all touch-manipulation ${
                          isActive
                            ? 'text-senegal-green bg-senegal-green/10'
                            : 'text-gray-700 hover:text-senegal-green hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

