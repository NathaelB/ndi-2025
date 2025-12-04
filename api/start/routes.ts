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
