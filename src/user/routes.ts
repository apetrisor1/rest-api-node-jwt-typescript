import { Router } from 'express'
import { AuthController } from '../auth'
import { UserController } from '.'

export class UserRoutes {
  public router: Router
  public authController: AuthController = new AuthController()
  public userController: UserController = new UserController()

  constructor() {
    this.router = Router()
    this.routes()
  }
  routes() {
    this.router.get('/me',
      this.authController.token,
      this.userController.getMyUser
    )
    this.router.put('/me',
      this.authController.token,
      this.userController.updateMyUser
    )
  }
}
