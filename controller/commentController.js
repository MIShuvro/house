const Comment = require('../models/Comment')
const Post = require('../models/Post')

module.exports.storeComment = async (req, res) => {
  try {
    const { _id: } = await Post.findOne({
      slug: req.params.slug
    })
    const comment = new Comment({
        body:req.body.body,
        author:req.user._id,
        post:

    })
  } catch (e) {
      res.json(error)
  }
}
