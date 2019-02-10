const User = require('../models/User'),
  bcrypt = require('bcryptjs'),
  passport = require('passport')

// Registration
module.exports.register = async (req, res) => {
  const {
    name,
    username,
    email,
    password,
    confirmPassword,
    profilePicture,
    gender,
    contact,
    location
  } = req.body
  errors = {}
  if (!password) {
    errors.password = 'Password is required'
    return res.json(errors)
  } else if (password !== confirmPassword) {
    errors.password = `Password didn't matched`
    return res.json(errors)
  } else if (password.length < 6) {
    errors.password = `Password must be more than 6 characters`
    return res.json(errors)
  }

  const user = new User({
    name,
    username,
    contact,
    profilePicture,
    email,
    gender,
    contact,
    location,
    password: bcrypt.hashSync(password, 10)
  })

  try {
    const newUser = await user.save()
    res.json(newUser)
  } catch (e) {
    Object.keys(e.errors).forEach(key => {
      errors[key] = e.errors[key].message
    })
    res.status(400).json(errors)
  }
}

// Login

module.exports.login = (req, res, next) => {
  passport.authenticate('local-login', { failureFlash: true }, (err, user, info) => {
    if (err) {
      res.json({ errors: err })
    }
    if (info !== undefined) {
      res.json({ info: info.message })
    }
  })(req, res, next)
}
