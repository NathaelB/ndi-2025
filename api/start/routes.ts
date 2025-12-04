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

openapi.registerRoutes()

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.get('/live', [HealthCheckController, 'live'])
    router.get('/ready', [HealthCheckController, 'ready'])
  })
  .prefix('/api/health')
