const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters']
    },
    description: {
      type: String,
      trim: true,
      minlength: [10, 'Description must be at least 10 characters']
    },
    date: {
      type: Date,
      required: [true, 'Achievement date is required']
    },
    category: {
      type: String,
      enum: {
        values: ['awards', 'publications', 'recognition', 'other'],
        message: 'Category must be one of: awards, publications, recognition, other'
      },
      default: 'other'
    },
    imageUrl: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid image URL'
      ]
    },
    link: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL'
      ]
    }
  },
  {
    timestamps: true,
    collection: 'achievements'
  }
);

// Index for better query performance
achievementSchema.index({ title: 'text', description: 'text', category: 1 });

module.exports = mongoose.model('Achievement', achievementSchema);
