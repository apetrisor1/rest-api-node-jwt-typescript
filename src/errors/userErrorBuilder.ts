import { ApiError, ApiErrorBuilder } from '.'

export class UserErrorBuilder extends ApiErrorBuilder {
  public mapError = (error: any) => {
    if (this.isValidationError(error)) {
      return new ApiError(error.name, error._message, 400, error.message)
    }

    return new ApiError(error.name, undefined, 500, error.message)
  }
}