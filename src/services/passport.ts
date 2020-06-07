import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import { Strategy as BearerStrategy } from 'passport-http-bearer'
import { User } from '../user'
import { JWT_SECRET, MASTER_KEY } from '../util'

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

/*
  Entire file is exported and initialized in index.ts, so strategies
  declared here do not need to be imported in auth controller.
*/

passport.use('masterKey', new BearerStrategy((token, done) => {
  if (token === MASTER_KEY) {
    done(undefined, {})
  } else {
    done(undefined, false)
  }
}))

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` })
    }

    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err) }
      if (isMatch) {
        return done(undefined, user)
      }
      return done(undefined, false, { message: `Invalid email or password.` })
    })
  })
}))

passport.use('token', new JwtStrategy({
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromUrlQueryParameter('access_token'),
    ExtractJwt.fromBodyField('access_token'),
    ExtractJwt.fromAuthHeaderWithScheme('Bearer')
  ])
}, ({ id }, done) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(undefined, user)
    } else {
      return done(undefined, false)
    }
  })
}))
