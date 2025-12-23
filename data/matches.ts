export interface Match {
  id: string
  opponent: string
  date: string // Format: YYYY-MM-DD
  time: string // Format: HH:MM
  status: 'upcoming' | 'live' | 'finished'
  score?: {
    senegal: number
    opponent: number
  }
  isActive: boolean // Seul le prochain match est actif
}

export interface Prediction {
  id: string
  matchId: string
  email: string
  score: {
    senegal: number
    opponent: number
  }
  timestamp: number
  isWinner?: boolean
  promoCode?: string
}

// Matchs de poule du Sénégal - CAN 2025
// Dates estimées (à ajuster selon le calendrier officiel)
export const matches: Match[] = [
  {
    id: 'match-1',
    opponent: 'À déterminer',
    date: '2025-01-13',
    time: '20:00',
    status: 'upcoming',
    isActive: true, // Premier match actif
  },
  {
    id: 'match-2',
    opponent: 'À déterminer',
    date: '2025-01-17',
    time: '17:00',
    status: 'upcoming',
    isActive: false,
  },
  {
    id: 'match-3',
    opponent: 'À déterminer',
    date: '2025-01-21',
    time: '20:00',
    status: 'upcoming',
    isActive: false,
  },
]

// Fonction pour obtenir le prochain match actif
export function getActiveMatch(): Match | null {
  return matches.find(m => m.isActive && m.status === 'upcoming') || null
}

// Fonction pour obtenir toutes les prédictions depuis localStorage
export function getPredictions(): Prediction[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem('predictions')
  return stored ? JSON.parse(stored) : []
}

// Fonction pour sauvegarder une prédiction
export function savePrediction(prediction: Omit<Prediction, 'id' | 'timestamp'>): boolean {
  if (typeof window === 'undefined') return false
  
  const predictions = getPredictions()
  const activeMatch = getActiveMatch()
  
  if (!activeMatch) return false
  
  // Vérifier si l'email a déjà fait une prédiction pour ce match
  const existingPrediction = predictions.find(
    p => p.matchId === activeMatch.id && p.email === prediction.email
  )
  
  if (existingPrediction) return false
  
  // Créer la nouvelle prédiction
  const newPrediction: Prediction = {
    ...prediction,
    id: `pred-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    timestamp: Date.now(),
  }
  
  predictions.push(newPrediction)
  localStorage.setItem('predictions', JSON.stringify(predictions))
  
  return true
}

// Fonction pour obtenir le nombre de prédictions pour un match
export function getPredictionCount(matchId: string): number {
  const predictions = getPredictions()
  return predictions.filter(p => p.matchId === matchId).length
}

// Fonction pour valider les gagnants après un match
export function validateWinners(matchId: string, actualScore: { senegal: number; opponent: number }): Prediction[] {
  const predictions = getPredictions()
  const matchPredictions = predictions
    .filter(p => p.matchId === matchId)
    .sort((a, b) => a.timestamp - b.timestamp) // Trier par ordre chronologique
  
  // Trouver les prédictions exactes
  const winners = matchPredictions.filter(
    p => p.score.senegal === actualScore.senegal && p.score.opponent === actualScore.opponent
  )
  
  // Prendre les 5 premiers gagnants
  const topWinners = winners.slice(0, 5)
  
  // Générer des codes promo pour les gagnants
  topWinners.forEach((winner, index) => {
    const promoCode = `PREDICT50-${matchId.slice(-3).toUpperCase()}-${(index + 1).toString().padStart(2, '0')}`
    winner.isWinner = true
    winner.promoCode = promoCode
    
    // Mettre à jour dans localStorage
    const allPredictions = getPredictions()
    const predictionIndex = allPredictions.findIndex(p => p.id === winner.id)
    if (predictionIndex !== -1) {
      allPredictions[predictionIndex] = winner
      localStorage.setItem('predictions', JSON.stringify(allPredictions))
    }
  })
  
  return topWinners
}

