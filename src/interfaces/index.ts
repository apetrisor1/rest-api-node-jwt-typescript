import { Document } from 'mongoose'

export interface IUser extends Document {
  view(): any
  email: string
  password: string
  name?: string
  role?: string
}

export interface IRequestBody {
  _id?: string
}

export interface IUserRequestBody extends IRequestBody {
  email?: IUser['email']
  password?: IUser['password']
  role?: IUser['role']
  name?: IUser['name']
}
