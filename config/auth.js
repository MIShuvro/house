module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.status(400).json({ message: 'Access denied' })
}
