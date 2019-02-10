const Post = require('../models/Post')

/**
 * Creating a Single Post
 */
module.exports.create = async (req, res) => {
  const { title, slug, description, price, gallery, location } = req.body
  const errors = {}
  try {
    const newPost = new Post({ title, slug, description, price, gallery, location })
    const response = await newPost.save()
    res.json({
      response,
      message: `Post Create Successfully`
    })
  } catch (e) {
    if (e && e.errors) {
      Object.keys(e.errors).forEach(key => {
        errors[key] = e.errors[key].message
      })
      res.status(400).json(errors)
    }
  }
}
/*
 * View all posts
 */
module.exports.index = async (req, res) => {
  try {
    const posts = await Post.find().populate({ path: 'User', select: 'name username contact' })
    res.json(posts)
  } catch (error) {
    res.json(error)
  }
}
/*
 * Update Post
 */
module.exports.update = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body },
      { new: true }
    )
    req.json({
      post,
      message: 'Update Successfully'
    })
  } catch (error) {
    res.json(error)
  }
}
