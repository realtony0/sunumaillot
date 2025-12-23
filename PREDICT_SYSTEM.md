# Système "Devine le Score" - Documentation

## 📋 Vue d'ensemble

Le système "Devine le Score" permet aux utilisateurs de prédire le score exact du prochain match du Sénégal et de gagner 50% de réduction sur leur maillot.

## 🎯 Fonctionnalités

- **Prédiction de score** : Les utilisateurs peuvent prédire le score exact du prochain match
- **5 gagnants maximum** : Seuls les 5 premiers avec le bon score gagnent
- **Compteur affiché** : 20 places affichées (pour créer de l'urgence), mais seulement 5 gagnants réels
- **Déblocage progressif** : Seul le prochain match est actif, les autres sont verrouillés
- **Stockage LocalStorage** : Les prédictions sont stockées localement dans le navigateur

## 📁 Structure des fichiers

### `data/matches.ts`
- Contient la liste de tous les matchs de poule du Sénégal
- Gère les fonctions de stockage et validation des prédictions
- **À modifier** : Mettre à jour les dates et adversaires des matchs selon le calendrier officiel

### `app/predict/page.tsx`
- Page dédiée au jeu "Devine le Score"
- Formulaire de prédiction
- Affichage des règles et des matchs

### Section sur la home page
- Bannière attractive avec CTA vers `/predict`
- Compteur de participants

## 🔧 Configuration

### 1. Mettre à jour les matchs

Éditez `data/matches.ts` pour mettre à jour les matchs :

```typescript
export const matches: Match[] = [
  {
    id: 'match-1',
    opponent: 'Nom de l\'adversaire', // ⬅️ Modifier ici
    date: '2025-01-13', // ⬅️ Modifier ici (format YYYY-MM-DD)
    time: '20:00', // ⬅️ Modifier ici (format HH:MM)
    status: 'upcoming',
    isActive: true, // ⬅️ Seul le prochain match doit être true
  },
  // ... autres matchs
]
```

### 2. Après chaque match

1. **Mettre à jour le score réel** dans `data/matches.ts` :
```typescript
{
  id: 'match-1',
  // ...
  status: 'finished',
  score: {
    senegal: 2, // ⬅️ Score réel du Sénégal
    opponent: 1, // ⬅️ Score réel de l'adversaire
  },
  isActive: false,
}
```

2. **Débloquer le match suivant** :
```typescript
{
  id: 'match-2',
  // ...
  isActive: true, // ⬅️ Passer à true pour le prochain match
}
```

3. **Valider les gagnants** :
   - Utiliser la fonction `validateWinners()` dans `data/matches.ts`
   - Les 5 premiers gagnants recevront un code promo
   - Les codes sont générés automatiquement : `PREDICT50-MAT-01`, `PREDICT50-MAT-02`, etc.

## 📧 Gestion des codes promo

### Génération automatique
Les codes sont générés automatiquement au format : `PREDICT50-XXX-YY`
- `XXX` : 3 dernières lettres de l'ID du match
- `YY` : Numéro du gagnant (01 à 05)

### Envoi des codes
**Option 1 : Manuel**
- Les codes sont stockés dans les prédictions (localStorage)
- Vous pouvez les récupérer et les envoyer manuellement par email

**Option 2 : Automatique (à implémenter)**
- Intégrer un service d'email (SendGrid, Mailgun, etc.)
- Envoyer automatiquement les codes aux gagnants

### Utilisation des codes
Les clients utilisent le code lors de la commande WhatsApp. Vous devez :
1. Vérifier que le code est valide
2. Appliquer la réduction de 50%
3. Marquer le code comme utilisé

## 🎮 Fonctionnement

### Pour l'utilisateur
1. Visite la page `/predict` ou clique sur la section "Devine le Score" sur la home
2. Voit tous les matchs de poule (seul le prochain est actif)
3. Prédit le score exact du prochain match
4. Entre son email
5. Valide sa prédiction
6. Reçoit une confirmation
7. Après le match, si gagnant, reçoit un code promo par email

### Pour l'administrateur
1. Mettre à jour les matchs dans `data/matches.ts`
2. Après chaque match, mettre à jour le score réel
3. Valider les gagnants (automatique via `validateWinners()`)
4. Envoyer les codes promo aux gagnants
5. Débloquer le match suivant

## ⚠️ Limitations actuelles

- **Stockage LocalStorage** : Les prédictions sont stockées localement (perdues si l'utilisateur vide le cache)
- **Pas de backend** : Pas de base de données, tout est côté client
- **Validation manuelle** : Les gagnants doivent être validés manuellement après chaque match

## 🚀 Améliorations futures possibles

1. **Backend + Base de données** : Stocker les prédictions en base de données
2. **Email automatique** : Envoyer automatiquement les codes aux gagnants
3. **Dashboard admin** : Interface pour gérer les matchs et valider les gagnants
4. **Historique** : Afficher l'historique des matchs et des gagnants
5. **Notifications** : Notifier les utilisateurs quand un match se débloque

## 📝 Notes importantes

- **5 gagnants réels** : Seulement 5 personnes gagnent, même si plus de 5 ont le bon score
- **Ordre chronologique** : En cas d'égalité, les premiers à avoir prédit gagnent
- **Une prédiction par match** : Un utilisateur ne peut faire qu'une seule prédiction par match
- **Validation email** : L'email est utilisé pour identifier l'utilisateur et envoyer le code promo

## 🔒 Sécurité

- Les prédictions sont stockées localement (LocalStorage)
- Pas de validation côté serveur actuellement
- Pour la production, considérer :
  - Validation côté serveur
  - Protection contre le spam
  - Limitation du nombre de prédictions par IP/email

