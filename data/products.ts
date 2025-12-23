export interface Product {
  id: string
  name: string
  color: 'green' | 'white'
  basePrice: number // Prix sans flocage
  flocagePrice: number // Prix avec flocage
  images: {
    front: string
    back: string
    gallery?: string[] // Images supplémentaires
  }
  description: string
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
  },
]

