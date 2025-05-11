const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  colorLines: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    isPermanent: Boolean,
    isDemiPermanent: Boolean,
    isSemiPermanent: Boolean,
    isHighLift: Boolean,
    developerOptions: [Number],
    mixingRatio: String
  }],
  logoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
BrandSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Brand', BrandSchema); 