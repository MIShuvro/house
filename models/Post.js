const { Schema, model } = require('mongoose'),
  beautifyUnique = require('mongoose-beautiful-unique-validation')

const Post = new Schema({
  title: {
    type: String,
    required: `You have to type a title`,
    trim: true
  },
  slug: {
    type: String,
    trim: true,
    required: 'Slug is required'
  },
  description: {
    type: String,
    trim: true,
    required: `You have to write at least 25 Characters`,
    minlength: [25, `You have to write at least 25 Characters`]
  },
  price: {
    type: String,
    required: `You have write down the price of the rental apartment/house`
  },
  gallery: {
    type: [String],
    required: true
  },
  location: {
    type: String,
    required: `Location is required`,
    trim: true
  }
})
Post.plugin(beautifyUnique)
Post.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next() // skip it
    return // stop this function from running
  }
  this.slug = slug(this.name)

  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i')
  const postWithSlugs = await this.constructor.find({ slug: slugRegEx })
  if (postWithSlugs.length) {
    this.slug = `${this.slug}-${postWithSlugs.length + 1}`
  }
  next()
})
module.exports = model('Post', Post)
