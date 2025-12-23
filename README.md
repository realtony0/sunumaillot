# Senegal CAN - Maillot Officiel

Site e-commerce ultra-moderne et mobile-first dédié aux maillots de l'équipe nationale du Sénégal pour la Coupe d'Afrique des Nations (CAN).

## 🚀 Technologies

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icônes)

## 📦 Installation

```bash
npm install
```

## 🏃 Démarrage

Démarrer le serveur de développement :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🎨 Fonctionnalités

### Pages

1. **Accueil** (`/`)
   - Section hero avec slogan fort
   - Informations sur le Sénégal au CAN
   - Appel à l'action

2. **Boutique** (`/shop`)
   - Sélection de couleur (vert/blanc)
   - Sélection de taille (S, M, L, XL, XXL)
   - Personnalisation du flocage (nom et numéro)
   - Aperçu en temps réel du maillot
   - Intégration WhatsApp pour les commandes

3. **À Propos** (`/about`)
   - Présentation de l'équipe nationale
   - Histoire au CAN
   - Fierté et identité nationale

### Personnalisation

- **Nom** : Maximum 15 caractères, affiché en majuscules
- **Numéro** : Entre 1 et 99
- **Couleur du texte** : S'adapte automatiquement
  - Maillot vert → texte blanc
  - Maillot blanc → texte noir

## 🎨 Design

- **Thème sombre premium** : Fond noir (#0B0B0B)
- **Couleurs du Sénégal** :
  - Vert : #00853F
  - Jaune : #FCD116
  - Rouge : #E31B23
- **Typographie** : Inter / Poppins
- **Animations** : Framer Motion pour des transitions fluides

## 📱 Mobile-First

Le site est entièrement optimisé pour mobile avec une approche mobile-first.

## ⚠️ Important

- Les maillots personnalisés avec flocage ne sont **pas remboursables**
- Configuration WhatsApp : Modifier le numéro dans `/app/shop/page.tsx` (ligne avec `whatsappUrl`)

## 🛠️ Build

```bash
npm run build
npm start
```

## 📝 Notes

- Les images de maillot sont actuellement des placeholders CSS. Pour la production, remplacer par de vraies images dans le dossier `public/`.
- Le prix est configuré en XOF (Franc CFA Ouest-Africain) dans `/app/shop/page.tsx`.


