import { Request, Response } from 'express'
import { User, UserService } from '.'
import { UserErrorBuilder } from '../errors'
import { View } from '../services/view'

export class UserController {
  error: UserErrorBuilder = new UserErrorBuilder()
  userService: UserService = new UserService()
  viewer: View = new View(User)

  public getMyUser = (req: Request, res: Response) => (res.json(this.viewer.getView(req.user)))

  public updateMyUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedUser = await this.userService.updateAndReturnUser(req)
      res.json(this.viewer.getView(updatedUser))
    } catch (err) {
      err = this.error.mapError(err)
      res.status(err.code).json(err)
    }
  }
}