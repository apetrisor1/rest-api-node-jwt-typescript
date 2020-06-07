import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util'

interface ITokenOptions {
  id: String
}

export class JwtService {
  public getToken = (options: ITokenOptions) => {
    const token = jwt.sign(options, JWT_SECRET)
    return token
  }
}
