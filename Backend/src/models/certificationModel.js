const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Certification name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters']
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true
    },
    dateObtained: {
      type: Date,
      required: [true, 'Date obtained is required']
    },
    credentialId: {
      type: String,
      trim: true,
      sparse: true
    },
    credentialUrl: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid credential URL'
      ]
    },
    link: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        'Please provide a valid URL'
      ]
    },
    expiryDate: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    collection: 'certifications'
  }
);

// Index for better query performance
certificationSchema.index({ name: 'text', issuer: 'text' });

module.exports = mongoose.model('Certification', certificationSchema);
