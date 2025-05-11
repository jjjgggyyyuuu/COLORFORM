const mongoose = require('mongoose');

const FormulationSchema = new mongoose.Schema({
  startingLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  startingTone: {
    type: String,
    required: true
  },
  desiredLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  desiredTone: {
    type: String,
    required: true
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  colorLine: {
    type: String,
    required: true
  },
  formula: {
    primaryColor: {
      colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
      },
      amount: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        default: 'oz'
      }
    },
    correctiveColors: [{
      colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
      },
      amount: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        default: 'oz'
      },
      purpose: String
    }],
    developer: {
      volume: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        default: 'oz'
      }
    }
  },
  processingTime: {
    type: Number,
    required: true,
    min: 5,
    max: 60
  },
  specialInstructions: String,
  forLifting: {
    type: Boolean,
    default: false
  },
  forDepositing: {
    type: Boolean,
    default: true
  },
  levelDifference: Number,
  underlyingPigment: String,
  percentageOfAsh: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: 'system'
  }
});

module.exports = mongoose.model('Formulation', FormulationSchema); 