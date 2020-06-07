import { Document, Schema, Model, model, Error } from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import { USER_ROLES } from '../CONSTANTS'
import { IIncomingBody } from '../services/dataAccess'

/*
  master: Full access.
  admin: Extended access.
  client: Basic access.
*/
const roles = Array.from(Object.values(USER_ROLES))

export interface IUser extends Document {
  view(): any
  email: string
  password: string
  name?: string
  role?: string
}

export interface IUserLoose extends IIncomingBody {
  email?: string
  password?: string
  role?: string
  name?: string
}

export const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String
  },
  role: {
    type: String,
    enum: roles,
    default: USER_ROLES.CLIENT
  }
})

userSchema.pre<IUser>('save', function save(next) {
  const user = this

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    return bcrypt.hash(this.password, salt, undefined, (err: Error, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
    return callback(err, isMatch)
  })
}

userSchema.methods.keysToShow = (): Array<string> => (['_id', 'email', 'name', 'role'])

export const User: Model<IUser> = model<IUser>('User', userSchema)
