const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  colorLine: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  tone: {
    type: String,
    required: true
  },
  toneCategory: {
    type: String,
    enum: ['natural', 'ash', 'gold', 'copper', 'red', 'violet', 'blue', 'green', 'brown', 'special'],
    required: true
  },
  hexColor: {
    type: String,
    match: /^#(?:[0-9a-fA-F]{3}){1,2}$/
  },
  isHighLift: {
    type: Boolean,
    default: false
  },
  isCorrective: {
    type: Boolean,
    default: false
  },
  correctiveProperties: {
    type: String,
    enum: ['neutralizes-yellow', 'neutralizes-orange', 'neutralizes-red', 'adds-warmth', 'adds-coolness', 'none'],
    default: 'none'
  },
  bestUsedFor: [String],
  colorAttributes: {
    intensity: {
      type: Number,
      min: 1,
      max: 10
    },
    reflective: {
      type: Boolean,
      default: false
    },
    opaque: {
      type: Boolean,
      default: false
    }
  },
  specialInstructions: String,
  imageUrl: String,
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
ColorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Color', ColorSchema); 