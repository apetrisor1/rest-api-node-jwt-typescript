import { IIncomingBody, IOldBody } from '.'
import { Model, Document } from 'mongoose'

export class DataAccessService {
  model: Model<Document>
  constructor (Model: Model<Document>) {
    this.model = Model
  }

  public addDocument = async (body: IIncomingBody): Promise<Document> => {
    /* To allow mongo schema to throw errors on built-in validators (duplicate), wait for index to build before using it. */
    await this.model.init()
    return this.model.create(body)
  }

  public updateAndReturnDocument = async (target: IOldBody, body: IIncomingBody): Promise<Document> => {
    return this.model.findOneAndUpdate({ _id: target._id }, body, { new: true })
  }
}
