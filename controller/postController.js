const Post = require('../models/Post')

/**
 * Creating a Single Post
 */
module.exports.create = async (req, res) => {
  const errors = {}

  try {
    const newPost = new Post({ ...req.body })
    const response = await newPost.save()
    console.log(response)
    res.json({
      ...response._doc,
      id: response._id,
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
    const posts = await Post.find()
    console.log(req.user)
    res.json(posts)
  } catch (error) {
    res.json(error)
  }
}

/*
 * Get a Single post
 */
module.exports.show = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
    res.json(post)
  } catch (e) {
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
    res.json({
      ...post._doc,
      message: 'Update Successfully'
    })
  } catch (error) {
    res.json(error)
  }
}
