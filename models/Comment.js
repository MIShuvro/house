const { Schema, model } = require('mongoose')

const ReplySchema = new Schema({
  body: String,
  author: Schema.Types.ObjectId
})

const CommentSchema = new Schema({
  body: {
    type: String,
    trim: true,
    required: `Comment is required`
  },
  Post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: `Post Id is required`
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User Id is Required']
  },
  replies: [ReplySchema]
})
module.exports = model('Comment', CommentSchema)
