import { ERRORS } from '../CONSTANTS'

export class ApiErrorBuilder {
  public isMongoError = (err: Error) => (err.name.includes(ERRORS.MONGO))
  public isMongoDuplicateEntryError = (err: any) => (this.isMongoError(err) && err.code === 11000)
  public isValidationError = (err: Error) => (err.name.includes(ERRORS.VALIDATION))
}