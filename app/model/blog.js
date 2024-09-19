const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
      },
      content: {
        type: String,
        required: true
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
},
{ timestamps: true }
)


module.exports = mongoose.model('Blog', BlogSchema)
