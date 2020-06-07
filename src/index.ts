require('dotenv').config()
import express from 'express'

import { setupMainRoutes } from './routes'
import { setupMiddlewares } from './util'
import { setupMongoConnection } from './services/dataAccess'

class Server {
  public app: express.Application

  constructor() {
    this.app = express()
    setupMongoConnection()
    setupMiddlewares(this.app)
    setupMainRoutes(this.app)
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(
        '  API is running at http://localhost:%d',
        this.app.get('port')
      )
    })
  }
}

const server = new Server()

server.start()
