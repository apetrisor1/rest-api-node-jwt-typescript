const AUTH = {
  LOGIN: 'Login',
  MASTER_KEY: 'masterKey',
  JWT: 'JWT'
}

/* Received */
const ERRORS = {
  MONGO: 'MongoError',
  VALIDATION: 'ValidationError'
}
/* Thrown */
const EXCEPTIONS = {
  DUPLICATED_KEY: 'Duplicated key',
  INVALID_MASTER_KEY: 'Invalid or missing Bearer <masterKey>',
  INVALID_JWT: 'Invalid or unauthorized Bearer <JWT>'
}

const USER_ROLES = {
  MASTER: 'master',
  ADMIN: 'admin',
  CLIENT: 'client'
}

export {
  AUTH,
  ERRORS,
  EXCEPTIONS,
  USER_ROLES
}
