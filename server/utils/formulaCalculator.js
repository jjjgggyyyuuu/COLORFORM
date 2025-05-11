const Color = require('../models/Color');
const Brand = require('../models/Brand');
const mongoose = require('mongoose');

/**
 * Calculate the underlying pigment based on level
 * @param {Number} level - Hair level (1-10)
 * @returns {String} - Underlying pigment description
 */
const getUnderlyingPigment = (level) => {
  switch (parseInt(level)) {
    case 1:
    case 2:
      return 'All pigments';
    case 3:
    case 4:
      return 'Red-brown';
    case 5:
      return 'Red';
    case 6:
      return 'Red-orange';
    case 7:
      return 'Orange';
    case 8:
      return 'Yellow-orange';
    case 9:
      return 'Yellow';
    case 10:
      return 'Pale yellow';
    default:
      return 'Unknown';
  }
};

/**
 * Calculate percentage of ash tones needed for neutralization
 * @param {Number} levelDifference - Number of levels being lifted
 * @returns {Number} - Percentage of ash tones needed
 */
const calculateAshPercentage = (levelDifference) => {
  if (levelDifference <= 0) return 0; // No lifting, no ash needed
  
  switch (levelDifference) {
    case 1:
      return 15; // 10-15%
    case 2:
      return 30; // 25-30%
    case 3:
      return 50; // 40-50%
    case 4:
      return 65; // 60-75%
    default:
      return 75; // 4+ levels
  }
};

/**
 * Determine the developer volume based on the level lift
 * @param {Number} levelDifference - Number of levels being lifted
 * @param {Number} startingLevel - Starting hair level (1-10)
 * @returns {Number} - Developer volume (10, 20, 30, 40)
 */
const determineDeveloperVolume = (levelDifference, startingLevel) => {
  if (levelDifference <= 0) return 10; // Deposit only
  
  // Darker hair might need higher volume for the same lift
  const darkHairFactor = startingLevel <= 4 ? 1 : 0;
  
  switch (levelDifference) {
    case 1:
      return 20;
    case 2:
      return 20 + (10 * darkHairFactor);
    case 3:
      return 30;
    case 4:
      return 40;
    default:
      return 40; // Maximum developer
  }
};

/**
 * Get corrective color tone based on underlying pigment
 * @param {String} underlyingPigment - Description of underlying pigment
 * @returns {String} - Corrective tone category
 */
const getCorrectiveTone = (underlyingPigment) => {
  switch (underlyingPigment) {
    case 'Red-brown':
    case 'Red':
      return 'green'; // Green neutralizes red
    case 'Red-orange':
    case 'Orange':
      return 'blue'; // Blue/Ash neutralizes orange
    case 'Yellow-orange':
    case 'Yellow':
    case 'Pale yellow':
      return 'violet'; // Violet neutralizes yellow
    default:
      return 'ash'; // Default to ash
  }
};

/**
 * Find appropriate colors from the database
 * @param {String} brandId - ID of the color brand
 * @param {String} colorLine - Name of the color line
 * @param {Number} level - Desired level (1-10)
 * @param {String} toneCategory - Desired tone category
 * @returns {Promise<Array>} - Array of matching colors
 */
const findColors = async (brandId, colorLine, level, toneCategory) => {
  try {
    return await Color.find({
      brandId: mongoose.Types.ObjectId(brandId),
      colorLine,
      level: parseInt(level),
      toneCategory
    }).sort({ name: 1 });
  } catch (error) {
    console.error('Error finding colors:', error);
    throw error;
  }
};

/**
 * Find corrective colors from the database
 * @param {String} brandId - ID of the color brand
 * @param {String} colorLine - Name of the color line
 * @param {String} correctiveTone - Tone category for correction
 * @returns {Promise<Array>} - Array of corrective colors
 */
const findCorrectiveColors = async (brandId, colorLine, correctiveTone) => {
  try {
    return await Color.find({
      brandId: mongoose.Types.ObjectId(brandId),
      colorLine,
      toneCategory: correctiveTone,
      isCorrective: true
    }).sort({ level: -1 }); // Sort by level descending
  } catch (error) {
    console.error('Error finding corrective colors:', error);
    throw error;
  }
};

/**
 * Calculate the hair color formula
 * @param {Number} startingLevel - Current hair level (1-10)
 * @param {String} startingTone - Current hair tone
 * @param {Number} desiredLevel - Target hair level (1-10)
 * @param {String} desiredTone - Target hair tone
 * @param {String} brandId - ID of the color brand
 * @param {String} colorLine - Name of the color line
 * @returns {Promise<Object>} - Complete formula with all details
 */
const calculateFormula = async (
  startingLevel,
  startingTone,
  desiredLevel,
  desiredTone,
  brandId,
  colorLine
) => {
  try {
    // Convert levels to numbers
    const startLevel = parseInt(startingLevel);
    const targetLevel = parseInt(desiredLevel);
    
    // Calculate level difference (positive = lifting, negative = depositing)
    const levelDifference = targetLevel - startLevel;
    
    // Determine if we're lifting or depositing
    const isLifting = levelDifference > 0;
    const isDepositing = levelDifference <= 0;
    
    // Get underlying pigment based on starting level
    const underlyingPigment = getUnderlyingPigment(startLevel);
    
    // Calculate ash percentage for neutralization if lifting
    const percentageOfAsh = isLifting ? calculateAshPercentage(levelDifference) : 0;
    
    // Determine developer volume
    const developerVolume = determineDeveloperVolume(levelDifference, startLevel);
    
    // Get the corrective tone based on underlying pigment
    const correctiveTone = isLifting ? getCorrectiveTone(underlyingPigment) : null;
    
    // Find primary color at desired level with desired tone
    const primaryColors = await findColors(brandId, colorLine, targetLevel, desiredTone);
    
    if (primaryColors.length === 0) {
      throw new Error(`No primary colors found for level ${targetLevel} with tone ${desiredTone}`);
    }
    
    const primaryColor = primaryColors[0]; // Choose the first matching color
    
    // Find corrective colors if lifting
    let correctiveColors = [];
    if (isLifting && correctiveTone) {
      correctiveColors = await findCorrectiveColors(brandId, colorLine, correctiveTone);
      
      if (correctiveColors.length === 0) {
        // Fallback to ash tones if specific corrective tone not found
        correctiveColors = await findCorrectiveColors(brandId, colorLine, 'ash');
      }
    }
    
    // Calculate amounts for formula
    const totalAmount = 2; // Total oz of color
    let primaryAmount = totalAmount;
    let correctiveAmount = 0;
    
    if (isLifting && correctiveColors.length > 0) {
      correctiveAmount = (totalAmount * percentageOfAsh) / 100;
      primaryAmount = totalAmount - correctiveAmount;
    }
    
    // Calculate developer amount (usually 1:1 or 1:2 ratio with color)
    const brand = await Brand.findById(brandId);
    const colorLineData = brand.colorLines.find(line => line.name === colorLine);
    const mixingRatio = colorLineData ? colorLineData.mixingRatio : '1:1';
    
    // Parse mixing ratio to get the developer multiplier
    const [colorPart, developerPart] = mixingRatio.split(':').map(Number);
    const developerMultiplier = developerPart / colorPart;
    const developerAmount = totalAmount * developerMultiplier;
    
    // Calculate processing time based on level difference and developer volume
    let processingTime = 30; // Default processing time in minutes
    
    if (developerVolume === 10) {
      processingTime = 25;
    } else if (developerVolume === 20) {
      processingTime = 30;
    } else if (developerVolume === 30) {
      processingTime = 35;
    } else if (developerVolume === 40) {
      processingTime = 45;
    }
    
    // Build special instructions
    const specialInstructions = [];
    
    if (isLifting) {
      specialInstructions.push(`Apply to mid-lengths and ends first, leaving 1 inch from the scalp.`);
      specialInstructions.push(`After 15 minutes, apply to the roots and process for the remaining time.`);
      
      if (levelDifference > 2) {
        specialInstructions.push(`Use foils or heat to enhance lifting.`);
      }
    } else {
      specialInstructions.push(`Apply evenly from roots to ends.`);
      specialInstructions.push(`For more vibrancy, leave on for full processing time.`);
    }
    
    // Build the complete formula
    const formula = {
      primaryColor: {
        colorId: primaryColor._id,
        amount: parseFloat(primaryAmount.toFixed(2)),
        unit: 'oz'
      },
      correctiveColors: correctiveColors.slice(0, 1).map(color => ({
        colorId: color._id,
        amount: parseFloat(correctiveAmount.toFixed(2)),
        unit: 'oz',
        purpose: `Neutralize ${underlyingPigment} undertones`
      })),
      developer: {
        volume: developerVolume,
        amount: parseFloat(developerAmount.toFixed(2)),
        unit: 'oz'
      }
    };
    
    return {
      formula,
      processingTime,
      specialInstructions: specialInstructions.join(' '),
      forLifting: isLifting,
      forDepositing: isDepositing,
      levelDifference,
      underlyingPigment,
      percentageOfAsh
    };
  } catch (error) {
    console.error('Error calculating formula:', error);
    throw error;
  }
};

module.exports = {
  calculateFormula,
  getUnderlyingPigment,
  calculateAshPercentage,
  getCorrectiveTone
}; 