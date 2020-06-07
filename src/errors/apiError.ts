class ApiError extends Error {
  type: String
  subtype: String
  code: number
  data: String
  constructor(type: String, subtype: String, code: number, data: String) {
    super()
    this.type = type
    this.subtype = subtype
    this.code = code
    this.data = data
  }
}

export { ApiError }