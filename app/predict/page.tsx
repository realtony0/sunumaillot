'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Trophy, CheckCircle, XCircle, Clock, Calendar, Users, AlertCircle } from 'lucide-react'
import { matches, getActiveMatch, savePrediction, getPredictionCount, getPredictions, type Prediction } from '@/data/matches'

export default function PredictPage() {
  const [activeMatch, setActiveMatch] = useState(getActiveMatch())
  const [senegalScore, setSenegalScore] = useState<string>('')
  const [opponentScore, setOpponentScore] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string>('')
  const [predictionCount, setPredictionCount] = useState(0)
  const [userPrediction, setUserPrediction] = useState<Prediction | null>(null)

  useEffect(() => {
    if (activeMatch) {
      const count = getPredictionCount(activeMatch.id)
      setPredictionCount(count)
      
      // Vérifier si l'utilisateur a déjà fait une prédiction
      const predictions = getPredictions()
      const stored = localStorage.getItem('userEmail')
      if (stored) {
        const existing = predictions.find(
          p => p.matchId === activeMatch.id && p.email === stored
        )
        if (existing) {
          setUserPrediction(existing)
          setSenegalScore(existing.score.senegal.toString())
          setOpponentScore(existing.score.opponent.toString())
          setEmail(existing.email)
          setIsSubmitted(true)
        }
      }
    }
  }, [activeMatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (!senegalScore || !opponentScore || !email) {
      setError('Veuillez remplir tous les champs')
      return
    }

    const senegal = parseInt(senegalScore)
    const opponent = parseInt(opponentScore)

    if (isNaN(senegal) || isNaN(opponent) || senegal < 0 || opponent < 0) {
      setError('Les scores doivent être des nombres positifs')
      return
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Veuillez entrer une adresse email valide')
      return
    }

    if (!activeMatch) {
      setError('Aucun match actif pour le moment')
      return
    }

    // Sauvegarder la prédiction
    const success = savePrediction({
      matchId: activeMatch.id,
      email: email.trim().toLowerCase(),
      score: { senegal, opponent },
    })

    if (!success) {
      setError('Vous avez déjà fait une prédiction pour ce match')
      return
    }

    // Sauvegarder l'email pour la session
    localStorage.setItem('userEmail', email.trim().toLowerCase())

    setIsSubmitted(true)
    setPredictionCount(getPredictionCount(activeMatch.id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-senegal-green mb-6 sm:mb-8 transition-colors group touch-manipulation min-h-[44px] px-3 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center px-4 py-2 bg-senegal-yellow/10 text-senegal-yellow rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Jeu Concours
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-4 sm:mb-6 text-gray-900 tracking-tight">
            🎯 Devine le Score
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            Prédisez le score exact du prochain match du Sénégal et gagnez <span className="font-semibold text-senegal-green">50% de réduction</span> sur votre maillot !
          </p>
        </motion.div>

        {/* Matchs List */}
        <div className="space-y-4 mb-8 sm:mb-12">
          {matches.map((match, index) => {
            const isActive = match.isActive && match.status === 'upcoming'
            const count = getPredictionCount(match.id)
            
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 sm:p-6 rounded-2xl border-2 transition-all ${
                  match.status === 'finished'
                    ? 'border-senegal-green/30 bg-senegal-green/5 shadow-md'
                    : isActive
                    ? 'border-senegal-green bg-senegal-green/5 shadow-lg'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🇸🇳</span>
                      <span className="font-semibold text-gray-900">Sénégal</span>
                      <span className="text-gray-400">vs</span>
                      <span className="font-semibold text-gray-900">{match.opponent}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(match.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {match.time}
                      </div>
                      {match.status === 'finished' && match.score && (
                        <div className="flex items-center gap-2 font-bold text-senegal-green">
                          <span>Score final:</span>
                          <span>🇸🇳 {match.score.senegal} - {match.score.opponent} {match.opponent}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{count} prédictions</span>
                      </div>
                    </div>
                    {match.status === 'finished' ? (
                      <span className="px-3 py-1 bg-senegal-green/20 text-senegal-green rounded-full text-sm font-semibold border border-senegal-green/30">
                        Terminé
                      </span>
                    ) : isActive ? (
                      <span className="px-3 py-1 bg-senegal-green text-white rounded-full text-sm font-semibold">
                        Actif
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded-full text-sm">
                        Bientôt
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Prediction Form */}
        {activeMatch && activeMatch.status === 'upcoming' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 md:p-10 shadow-xl"
          >
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl sm:text-3xl font-light mb-2 text-gray-900">
                  Prédisez le score
                </h2>
                <p className="text-gray-600 mb-6 sm:mb-8">
                  Match : <span className="font-semibold">Sénégal vs {activeMatch.opponent}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                        Score Sénégal
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={senegalScore}
                        onChange={(e) => setSenegalScore(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-senegal-green transition-all"
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                        Score {activeMatch.opponent}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={opponentScore}
                        onChange={(e) => setOpponentScore(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-senegal-green transition-all"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-senegal-green focus:border-senegal-green transition-all"
                      placeholder="votre@email.com"
                      required
                    />
                    <p className="mt-2 text-xs text-gray-500">
                      Vous recevrez votre code promo par email si vous gagnez
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-senegal-red/10 border-2 border-senegal-red/30 rounded-xl p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-senegal-red flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-senegal-red">{error}</p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full min-h-[56px] py-4 sm:py-5 bg-gradient-to-r from-senegal-green to-senegal-green/90 hover:from-senegal-green/90 hover:to-senegal-green text-white font-semibold rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-senegal-green/30 text-base sm:text-lg touch-manipulation"
                  >
                    Valider ma prédiction
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 bg-senegal-green rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl sm:text-3xl font-light mb-4 text-gray-900">
                  Prédiction enregistrée !
                </h3>
                <p className="text-gray-600 mb-6">
                  Votre prédiction : <span className="font-semibold text-gray-900">Sénégal {senegalScore} - {opponentScore} {activeMatch.opponent}</span>
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  Nous vous enverrons votre code promo par email si vous faites partie des 5 gagnants !
                </p>
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-senegal-green text-white rounded-xl font-semibold transition-all shadow-lg"
                  >
                    Voir les maillots
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Rules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-12 bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 md:p-10"
        >
          <h2 className="text-2xl sm:text-3xl font-light mb-6 text-gray-900 flex items-center gap-3">
            <Trophy className="w-6 h-6 text-senegal-yellow" />
            Règles du Jeu
          </h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>Prédisez le <strong>score exact</strong> du prochain match du Sénégal</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>Les <strong>5 premiers participants</strong> avec le bon score gagnent <strong>50% de réduction</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>Une seule prédiction par personne et par match</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>Le code promo est envoyé par email après validation du résultat</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>Offre valable sur tous les maillots (avec ou sans flocage)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>Code valable <strong>30 jours</strong> après le match</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-senegal-green flex-shrink-0 mt-0.5" />
              <p>En cas d'égalité, les premiers à avoir prédit gagnent (ordre chronologique)</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-senegal-yellow/10 border-2 border-senegal-yellow/30 rounded-xl">
            <p className="text-sm text-gray-700">
              <strong>💡 Astuce :</strong> Plus vous participez tôt, plus vous avez de chances de gagner en cas d'égalité !
            </p>
          </div>
        </motion.div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-senegal-green/10 rounded-full">
            <Users className="w-5 h-5 text-senegal-green" />
            <span className="text-gray-700 font-semibold">
              {predictionCount}/20 places restantes
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

