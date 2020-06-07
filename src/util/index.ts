import { setupMiddlewares } from './middlewares'
import { MONGODB_URI, JWT_SECRET, MASTER_KEY } from './secrets'

export {
  JWT_SECRET,
  MONGODB_URI,
  MASTER_KEY,
  setupMiddlewares
}