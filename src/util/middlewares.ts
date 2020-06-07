import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'

export const setupMiddlewares = (app: express.Application): void => {
  app.set('port', process.env.PORT || 3000)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(compression())
  app.use(cors())
  app.use(passport.initialize())
  app.use(passport.session())
}