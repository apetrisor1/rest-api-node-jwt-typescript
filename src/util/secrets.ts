
export const MONGODB_URI = process.env['MONGODB_URI']

if (!MONGODB_URI) {
    console.log('No mongo connection string. Set MONGODB_URI environment variable.')
    process.exit(1)
}

export const JWT_SECRET = process.env['JWT_SECRET']

if (!JWT_SECRET) {
    console.log('No JWT secret string. Set JWT_SECRET environment variable.')
    process.exit(1)
}

export const MASTER_KEY = process.env['JWT_SECRET']

if (!MASTER_KEY) {
    console.log('No master key secret string. Set MASTER_KEY environment variable.')
    process.exit(1)
}
