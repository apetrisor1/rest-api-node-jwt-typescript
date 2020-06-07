import { Model, Document } from 'mongoose'

export class View {
  model: Model<Document>
  constructor (Model: Model<Document>) {
    this.model = Model
  }

  getView = (document: Document) => {
    type tView = {
      [key: string]: any
    }
    const view: tView = {}

    type tMapOptions = [string]
    const keysToShow: tMapOptions = this.model.schema.methods.keysToShow()

    keysToShow.forEach((key) => {
      view[key] = document.get(key)
    })

    return view
  }
}