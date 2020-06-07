import { Request } from 'express'
import { Document } from 'mongoose'
import { IUserLoose, User } from '.'
import { DataAccessService } from '../services/dataAccess'

export class UserService {
  data: DataAccessService = new DataAccessService(User)

  public addUser = async (body: IUserLoose): Promise<Document> => {
    return this.data.addDocument(body)
  }

  public updateAndReturnUser = async (req: Request): Promise<Document> => {
    const { user } = req
    if (!req.body.name) return user

    const payload: IUserLoose = { name : req.body.name }
    return this.data.updateAndReturnDocument(user, payload)
  }
}
