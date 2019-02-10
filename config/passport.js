const LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcryptjs'),
  passport = require('passport'),
  User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(
  'local-login',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, { message: 'No user Found' })
      }

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          console.log(user)
          return done(null, user, { message: 'login successful' })
        } else {
          return done(null, false, { message: 'Wrong Password' })
        }
      })
    } catch (err) {
      done(err)
    }
  })
)
