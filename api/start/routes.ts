/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import openapi from '@foadonis/openapi/services/main'
const HealthCheckController = () => import('#controllers/health_checks_controller')
const DiagnosticAnswersController = () => import('#controllers/diagnostic_answers_controller')
const QuestionsController = () => import('#controllers/questions_controller')
const DiagnosticsController = () => import('#controllers/diagnostics_controller')

openapi.registerRoutes()

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('/live', [HealthCheckController, 'live'])
        router.get('/ready', [HealthCheckController, 'ready'])
      })
      .prefix('/health')

    router
      .group(() => {
        // Routes pour les questions et catégories (lecture seule, sans scores)
        router.get('/questions', [QuestionsController, 'index'])
        router.get('/questions/:id', [QuestionsController, 'show'])
        router.get('/categories', [QuestionsController, 'categoriesWithQuestions'])
        router.get('/categories/:categoryId/questions', [QuestionsController, 'byCategory'])

        // Routes pour les diagnostics
        router.get('/diagnostics', [DiagnosticsController, 'index'])
        router.post('/diagnostics', [DiagnosticsController, 'store'])
        router.get('/diagnostics/:id', [DiagnosticsController, 'show'])
        router.delete('/diagnostics/:id', [DiagnosticsController, 'destroy'])
        router.post('/diagnostics/:id/calculate-score', [DiagnosticsController, 'calculateScore'])
        router.put('/diagnostics/:id/finalize', [DiagnosticsController, 'finalize'])
        router.patch('/diagnostics/:id/finalize', [DiagnosticsController, 'finalize'])

        // Routes pour les diagnostics par utilisateur
        router.get('/users/:userId/diagnostics', [DiagnosticsController, 'byUser'])

        // Récupérer toutes les réponses d'un diagnostic
        router.get('/diagnostics/:diagnosticId/answers', [DiagnosticAnswersController, 'index'])

        // Créer une nouvelle réponse pour un diagnostic
        router.post('/diagnostics/:diagnosticId/answers', [DiagnosticAnswersController, 'store'])

        // Créer/mettre à jour plusieurs réponses en une fois
        router.post('/diagnostics/:diagnosticId/answers/batch', [
          DiagnosticAnswersController,
          'batchStore',
        ])

        // Récupérer une réponse spécifique
        router.get('/answers/:id', [DiagnosticAnswersController, 'show'])

        // Mettre à jour une réponse
        router.put('/answers/:id', [DiagnosticAnswersController, 'update'])
        router.patch('/answers/:id', [DiagnosticAnswersController, 'update'])

        // Supprimer une réponse
        router.delete('/answers/:id', [DiagnosticAnswersController, 'destroy'])
      })
      .prefix('/v1')
  })
  .prefix('/api')
