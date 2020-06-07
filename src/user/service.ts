import { Request } from 'express'
import { Document } from 'mongoose'
import { User } from '.'
import { IUserRequestBody } from '../interfaces'
import { DataAccessService } from '../services/dataAccess'

export class UserService {
  data: DataAccessService = new DataAccessService(User)

  public addUser = async (body: IUserRequestBody): Promise<Document> => {
    return this.data.addDocument(body)
  }

  public updateAndReturnUser = async (req: Request): Promise<Document> => {
    const { user } = req
    if (!req.body.name) return user

    const payload: IUserRequestBody = { name : req.body.name }
    return this.data.updateAndReturnDocument(user, payload)
  }
}
