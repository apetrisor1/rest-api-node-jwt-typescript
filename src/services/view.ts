import { Model, Document } from 'mongoose'
import { tView, tViewKeys } from '../types'

export class View {
  model: Model<Document>
  constructor (Model: Model<Document>) {
    this.model = Model
  }

  getView = (document: Document) => {
    const view: tView = {}
    const keysToShow: tViewKeys = this.model.schema.methods.keysToShow()

    keysToShow.forEach((key) => {
      view[key] = document.get(key)
    })

    return view
  }
}
