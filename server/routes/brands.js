const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

// @route   GET api/brands
// @desc    Get all brands
// @access  Public
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.json(brands);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/brands/:id
// @desc    Get brand by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/brands
// @desc    Create a brand
// @access  Private (would require auth middleware in production)
router.post('/', async (req, res) => {
  try {
    const newBrand = new Brand({
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      colorLines: req.body.colorLines,
      logoUrl: req.body.logoUrl
    });

    const brand = await newBrand.save();
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/brands/:id
// @desc    Update a brand
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const {
      name,
      description,
      website,
      colorLines,
      logoUrl
    } = req.body;

    // Build brand object
    const brandFields = {};
    if (name) brandFields.name = name;
    if (description) brandFields.description = description;
    if (website) brandFields.website = website;
    if (colorLines) brandFields.colorLines = colorLines;
    if (logoUrl) brandFields.logoUrl = logoUrl;

    let brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }

    // Update
    brand = await Brand.findByIdAndUpdate(
      req.params.id,
      { $set: brandFields },
      { new: true }
    );

    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/brands/:id
// @desc    Delete a brand
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }

    await Brand.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Brand removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router; 