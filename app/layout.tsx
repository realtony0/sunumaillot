import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sunu Maillot - Maillot Officiel du Sénégal',
  description: 'Sunu Maillot - Maillot officiel du Sénégal pour la Coupe d\'Afrique des Nations. Personnalisez votre maillot du Sénégal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

