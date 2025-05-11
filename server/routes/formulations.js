const express = require('express');
const router = express.Router();
const Formulation = require('../models/Formulation');
const { calculateFormula } = require('../utils/formulaCalculator');

// @route   GET api/formulations
// @desc    Get all formulations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const formulations = await Formulation.find()
      .sort({ createdAt: -1 })
      .populate('brandId', 'name')
      .populate('formula.primaryColor.colorId', 'name code level tone')
      .populate('formula.correctiveColors.colorId', 'name code level tone');
    
    res.json(formulations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/formulations/:id
// @desc    Get formulation by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const formulation = await Formulation.findById(req.params.id)
      .populate('brandId', 'name')
      .populate('formula.primaryColor.colorId', 'name code level tone')
      .populate('formula.correctiveColors.colorId', 'name code level tone');
    
    if (!formulation) {
      return res.status(404).json({ msg: 'Formulation not found' });
    }
    
    res.json(formulation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Formulation not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/formulations/calculate
// @desc    Generate a new hair color formulation
// @access  Public
router.post('/calculate', async (req, res) => {
  try {
    const {
      startingLevel,
      startingTone,
      desiredLevel,
      desiredTone,
      brandId,
      colorLine
    } = req.body;

    // Validate input data
    if (!startingLevel || !startingTone || !desiredLevel || !desiredTone || !brandId || !colorLine) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    // Call the formula calculation utility
    const formula = await calculateFormula(
      startingLevel,
      startingTone,
      desiredLevel,
      desiredTone,
      brandId,
      colorLine
    );

    // Create new formulation record
    const newFormulation = new Formulation({
      startingLevel,
      startingTone,
      desiredLevel,
      desiredTone,
      brandId,
      colorLine,
      formula: formula.formula,
      processingTime: formula.processingTime,
      specialInstructions: formula.specialInstructions,
      forLifting: formula.forLifting,
      forDepositing: formula.forDepositing,
      levelDifference: formula.levelDifference,
      underlyingPigment: formula.underlyingPigment,
      percentageOfAsh: formula.percentageOfAsh
    });

    const formulation = await newFormulation.save();

    // Populate references for response
    const populatedFormulation = await Formulation.findById(formulation._id)
      .populate('brandId', 'name')
      .populate('formula.primaryColor.colorId', 'name code level tone')
      .populate('formula.correctiveColors.colorId', 'name code level tone');

    res.json(populatedFormulation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: ' + err.message);
  }
});

// @route   DELETE api/formulations/:id
// @desc    Delete a formulation
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const formulation = await Formulation.findById(req.params.id);

    if (!formulation) {
      return res.status(404).json({ msg: 'Formulation not found' });
    }

    await Formulation.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Formulation removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Formulation not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router; 