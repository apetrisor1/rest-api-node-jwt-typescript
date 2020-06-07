import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { AUTH, EXCEPTIONS } from '../CONSTANTS'
import { AuthErrorBuilder } from '../errors'
import { User } from '../user'
import { JwtService, UserService, View } from '../services'

export class AuthController {
  error: AuthErrorBuilder = new AuthErrorBuilder()
  jwtService: JwtService = new JwtService()
  userService: UserService = new UserService()
  viewer: View = new View(User)

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return next(err)
      if (!user) {
        const err = this.error.buildUnauthorizedError(AUTH.LOGIN, info.message)
        return res.status(err.code).json(err)
      } else {
        res.status(200).send({
          token: this.jwtService.getToken({ id: user._id }),
          user: this.viewer.getView(user)
        })
      }
    })(req, res, next)
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.userService.addUser(req.body)
      res.status(200).send({
        token: this.jwtService.getToken({ id: user._id }),
        user: this.viewer.getView(user)
       })
    } catch (err) {
      err = this.error.mapError(err)
      res.status(err.code).json(err)
    }
  }

  public masterKey = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('masterKey', (err, user, info) => {
      if (err || !user) {
        const response = this.error.buildUnauthorizedError(AUTH.MASTER_KEY, EXCEPTIONS.INVALID_MASTER_KEY)
        return res.status(response.code).json(response)
      } else {
        return next()
      }
    })(req, res, next)
  }

  public token = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('token', (err, user, info) => {
      if (err) {
        const response = this.error.mapError(err)
        return res.status(response.code).json(response)
      } else if (!user) {
        const response = this.error.buildUnauthorizedError(AUTH.JWT, EXCEPTIONS.INVALID_JWT)
        return res.status(response.code).json(response)
      } else {
        req.user = user
        return next()
      }
    })(req, res, next)
  }
}
