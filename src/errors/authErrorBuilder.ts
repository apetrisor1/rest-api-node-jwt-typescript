import { ApiError, ApiErrorBuilder } from '.'
import { EXCEPTIONS } from '../CONSTANTS'

export class AuthErrorBuilder extends ApiErrorBuilder {
  public buildUnauthorizedError = (subtype: String, info: String) => {
    return new ApiError('Unauthorized', subtype, 401, info)
  }

  public mapError = (error: any) => {
    if (this.isMongoDuplicateEntryError(error)) {
      return new ApiError(error.name, EXCEPTIONS.DUPLICATED_KEY, 409, error.keyValue)
    } else if (this.isValidationError(error)) {
      return new ApiError(error.name, error._message, 400, error.message)
    }

    return new ApiError(error.name, undefined, 500, error.message)
  }
}