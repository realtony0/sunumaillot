export interface Product {
  id: string
  name: string
  color: 'green' | 'white'
  basePrice: number // Prix sans flocage
  flocagePrice: number // Prix avec flocage
  images: {
    front: string
    back?: string // Optionnel pour les rétros et blousons
    gallery?: string[] // Images supplémentaires
  }
  description: string
  category?: 'maillot' | 'retro' | 'blouson' // Type de produit
}

export const products: Product[] = [
  {
    id: 'maillot-blanc',
    name: 'Maillot Domicile',
    color: 'white',
    basePrice: 8000,
    flocagePrice: 10000,
    images: {
      front: '/blanc_avant.jpeg',
      back: '/blanc_dos.jpeg',
      gallery: [
        '/51f8e11c-b95e-465b-84b3-329684958667.jpeg',
      ],
    },
    description: 'Maillot officiel du Sénégal - Domicile. Portez les couleurs emblématiques du Sénégal.',
    category: 'maillot',
  },
  {
    id: 'maillot-vert',
    name: 'Maillot Extérieur',
    color: 'green',
    basePrice: 8000,
    flocagePrice: 10000,
    images: {
      front: '/vert_avant.jpeg',
      back: '/vert_dos.jpeg',
      gallery: [
        '/333 Senegal 2024 Home & Away Kits Released (1).jpg',
        '/puma_445162_777166_03_20241129T124135_01.jpg',
      ],
    },
    description: 'Maillot officiel du Sénégal - Extérieur. Élégant et moderne, parfait pour soutenir l\'équipe.',
    category: 'maillot',
  },
  // Maillots Rétros
  {
    id: 'retro-1986',
    name: 'Maillot Rétro 1986',
    color: 'green',
    basePrice: 10000,
    flocagePrice: 12000,
    images: {
      front: '/retro-1986.jpeg',
      gallery: [],
    },
    description: 'Maillot rétro du Sénégal - Édition 1986. Revivez les moments historiques du football sénégalais.',
    category: 'retro',
  },
  {
    id: 'retro-2002',
    name: 'Maillot Rétro 2002',
    color: 'white',
    basePrice: 8000,
    flocagePrice: 10000,
    images: {
      front: '/retro-2002.jpeg',
      gallery: ['/retro-2002vert.jpeg'],
    },
    description: 'Maillot rétro du Sénégal - Édition 2002. Commémoration de la finale de la CAN 2002.',
    category: 'retro',
  },
  // Blousons
  {
    id: 'blouson-senegal',
    name: 'Blouson Sénégal',
    color: 'green',
    basePrice: 35000,
    flocagePrice: 35000, // Pas de flocage disponible sur les blousons
    images: {
      front: '/blousonsn.jpeg',
      gallery: [
        '/blousonsn1.jpeg',
        '/blousonsn2.jpeg',
        '/blousonsn3.jpeg',
        '/blousonsn4.jpeg',
      ],
    },
    description: 'Blouson officiel du Sénégal. Restez au chaud tout en affichant votre soutien aux Lions de la Teranga.',
    category: 'blouson',
  },
]

