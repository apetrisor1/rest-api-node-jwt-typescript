import { AuthRoutes } from './auth'
import { UserRoutes } from './user'
import express from 'express'

export const setupMainRoutes = (app: express.Application): void => {
  app.use('/api/auth', new AuthRoutes().router)
  app.use('/api/user', new UserRoutes().router)
}
