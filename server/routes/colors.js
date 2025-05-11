const express = require('express');
const router = express.Router();
const Color = require('../models/Color');

// @route   GET api/colors
// @desc    Get all colors or filter by brand/line
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { brandId, colorLine, level, toneCategory } = req.query;
    const filter = {};
    
    if (brandId) filter.brandId = brandId;
    if (colorLine) filter.colorLine = colorLine;
    if (level) filter.level = level;
    if (toneCategory) filter.toneCategory = toneCategory;
    
    const colors = await Color.find(filter)
      .populate('brandId', ['name', 'colorLines'])
      .sort({ level: 1, name: 1 });
    
    res.json(colors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/colors/:id
// @desc    Get color by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const color = await Color.findById(req.params.id)
      .populate('brandId', ['name', 'colorLines']);
    
    if (!color) {
      return res.status(404).json({ msg: 'Color not found' });
    }
    
    res.json(color);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Color not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/colors
// @desc    Create a color
// @access  Private (would require auth middleware in production)
router.post('/', async (req, res) => {
  try {
    const {
      brandId,
      colorLine,
      name,
      code,
      level,
      tone,
      toneCategory,
      hexColor,
      isHighLift,
      isCorrective,
      correctiveProperties,
      bestUsedFor,
      colorAttributes,
      specialInstructions,
      imageUrl
    } = req.body;

    const newColor = new Color({
      brandId,
      colorLine,
      name,
      code,
      level,
      tone,
      toneCategory,
      hexColor: hexColor || '#000000',
      isHighLift: isHighLift || false,
      isCorrective: isCorrective || false,
      correctiveProperties: correctiveProperties || 'none',
      bestUsedFor: bestUsedFor || [],
      colorAttributes: colorAttributes || {
        intensity: 5,
        reflective: false,
        opaque: false
      },
      specialInstructions,
      imageUrl
    });

    const color = await newColor.save();
    res.json(color);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/colors/:id
// @desc    Update a color
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    let color = await Color.findById(req.params.id);

    if (!color) {
      return res.status(404).json({ msg: 'Color not found' });
    }

    // Update with all the fields from the request body
    color = await Color.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(color);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/colors/:id
// @desc    Delete a color
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);

    if (!color) {
      return res.status(404).json({ msg: 'Color not found' });
    }

    await Color.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Color removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 