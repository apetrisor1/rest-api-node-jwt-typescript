import { Router } from 'express'
import { AuthController } from '.'

export class AuthRoutes {
  public router: Router
  public authController: AuthController = new AuthController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.post('/register',
      this.authController.masterKey,
      this.authController.register
    )
    this.router.post('/login',
      this.authController.masterKey,
      this.authController.login
    )
  }
}
