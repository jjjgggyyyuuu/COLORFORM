const puppeteer = require('puppeteer');
const axios = require('axios');
const cheerio = require('cheerio');
const Color = require('../models/Color');
const Brand = require('../models/Brand');

/**
 * Extract color level and tone from color code
 * @param {String} code - Color code (e.g., "6N", "8.1", "10RV")
 * @returns {Object} - Extracted level and tone
 */
const extractLevelAndTone = (code) => {
  // Remove any spaces
  code = code.replace(/\s/g, '');
  
  // Different brands use different formats
  // Format: digit(s) followed by letter(s)
  const levelMatch = code.match(/^(\d+)/);
  const toneMatch = code.match(/[a-zA-Z]+/);
  
  const level = levelMatch ? parseInt(levelMatch[0]) : null;
  const tone = toneMatch ? toneMatch[0].toUpperCase() : null;
  
  return { level, tone };
};

/**
 * Map tone code to tone category
 * @param {String} tone - Tone code (e.g., "N", "A", "G")
 * @returns {String} - Tone category
 */
const mapToneToCategory = (tone) => {
  if (!tone) return 'natural';
  
  const toneUppercase = tone.toUpperCase();
  
  if (toneUppercase.includes('N')) return 'natural';
  if (toneUppercase.includes('A') || toneUppercase.includes('ASH')) return 'ash';
  if (toneUppercase.includes('G') || toneUppercase.includes('GOLD')) return 'gold';
  if (toneUppercase.includes('C') || toneUppercase.includes('COPPER')) return 'copper';
  if (toneUppercase.includes('R') || toneUppercase.includes('RED')) return 'red';
  if (toneUppercase.includes('V') || toneUppercase.includes('VIOLET')) return 'violet';
  if (toneUppercase.includes('B') || toneUppercase.includes('BLUE')) return 'blue';
  if (toneUppercase.includes('GR') || toneUppercase.includes('GREEN')) return 'green';
  if (toneUppercase.includes('BR') || toneUppercase.includes('BROWN')) return 'brown';
  
  return 'special';
};

/**
 * Determine corrective properties based on tone category
 * @param {String} toneCategory - Category of the tone
 * @returns {String} - Corrective property
 */
const determineCorrectiveProperties = (toneCategory) => {
  switch (toneCategory) {
    case 'ash':
    case 'blue':
      return 'neutralizes-orange';
    case 'violet':
      return 'neutralizes-yellow';
    case 'green':
      return 'neutralizes-red';
    case 'gold':
    case 'copper':
    case 'red':
      return 'adds-warmth';
    default:
      return 'none';
  }
};

/**
 * Scrape Aveda color information
 * @param {String} brandId - ID of the Aveda brand in database
 * @returns {Promise<Array>} - Array of scraped colors
 */
const scrapeAvedaColors = async (brandId) => {
  try {
    console.log('Starting Aveda color scraping...');
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Navigate to Aveda professional site (this would be a mock URL in a real system)
    await page.goto('https://www.aveda.com/professional-hair-color', { waitUntil: 'networkidle2' });
    
    // Extract color data (this is a placeholder for actual scraping logic)
    const colorData = [
      { name: 'Natural Light Blonde', code: '9N', colorLine: 'Full Spectrum' },
      { name: 'Medium Ash Blonde', code: '7A', colorLine: 'Full Spectrum' },
      { name: 'Dark Copper Brown', code: '4C', colorLine: 'Full Spectrum' },
      // More colors would be scraped here
    ];
    
    await browser.close();
    
    // Process scraped data into our Color model format
    const colors = colorData.map(color => {
      const { level, tone } = extractLevelAndTone(color.code);
      const toneCategory = mapToneToCategory(tone);
      
      return {
        brandId,
        colorLine: color.colorLine,
        name: color.name,
        code: color.code,
        level: level || 5, // Default to level 5 if not extractable
        tone: tone || 'N', // Default to Natural if not extractable
        toneCategory,
        hexColor: '#000000', // Placeholder - would need actual color data
        isCorrective: ['ash', 'violet', 'blue', 'green'].includes(toneCategory),
        correctiveProperties: determineCorrectiveProperties(toneCategory)
      };
    });
    
    console.log(`Scraped ${colors.length} Aveda colors`);
    return colors;
  } catch (error) {
    console.error('Error scraping Aveda colors:', error);
    return [];
  }
};

/**
 * Scrape Redken color information
 * @param {String} brandId - ID of the Redken brand in database
 * @returns {Promise<Array>} - Array of scraped colors
 */
const scrapeRedkenColors = async (brandId) => {
  try {
    console.log('Starting Redken color scraping...');
    
    // Use axios and cheerio for HTML scraping
    const response = await axios.get('https://www.redken.com/professional/color');
    const $ = cheerio.load(response.data);
    
    // Extract color data (this is a placeholder for actual scraping logic)
    const colorData = [
      { name: 'Very Light Blonde', code: '10N', colorLine: 'Shades EQ' },
      { name: 'Medium Golden Blonde', code: '7G', colorLine: 'Shades EQ' },
      { name: 'Dark Copper Red', code: '4CR', colorLine: 'Color Fusion' },
      // More colors would be scraped here
    ];
    
    // Process scraped data into our Color model format
    const colors = colorData.map(color => {
      const { level, tone } = extractLevelAndTone(color.code);
      const toneCategory = mapToneToCategory(tone);
      
      return {
        brandId,
        colorLine: color.colorLine,
        name: color.name,
        code: color.code,
        level: level || 5,
        tone: tone || 'N',
        toneCategory,
        hexColor: '#000000', // Placeholder
        isCorrective: ['ash', 'violet', 'blue', 'green'].includes(toneCategory),
        correctiveProperties: determineCorrectiveProperties(toneCategory)
      };
    });
    
    console.log(`Scraped ${colors.length} Redken colors`);
    return colors;
  } catch (error) {
    console.error('Error scraping Redken colors:', error);
    return [];
  }
};

/**
 * Scrape Wella color information
 * @param {String} brandId - ID of the Wella brand in database
 * @returns {Promise<Array>} - Array of scraped colors
 */
const scrapeWellaColors = async (brandId) => {
  // Similar implementation to Aveda and Redken scraping functions
  // Placeholder for the actual implementation
  return [];
};

/**
 * Scrape L'Oréal color information
 * @param {String} brandId - ID of the L'Oréal brand in database
 * @returns {Promise<Array>} - Array of scraped colors
 */
const scrapeLorealColors = async (brandId) => {
  // Similar implementation to Aveda and Redken scraping functions
  // Placeholder for the actual implementation
  return [];
};

/**
 * Main function to scrape colors from all brands
 * @returns {Promise<void>}
 */
const scrapeAllColors = async () => {
  try {
    // Get all brands from database
    const brands = await Brand.find();
    
    for (const brand of brands) {
      console.log(`Processing brand: ${brand.name}`);
      let colors = [];
      
      // Call appropriate scraper based on brand name
      switch (brand.name.toLowerCase()) {
        case 'aveda':
          colors = await scrapeAvedaColors(brand._id);
          break;
        case 'redken':
          colors = await scrapeRedkenColors(brand._id);
          break;
        case 'wella':
          colors = await scrapeWellaColors(brand._id);
          break;
        case 'l\'oréal':
        case 'loreal':
          colors = await scrapeLorealColors(brand._id);
          break;
        default:
          console.log(`No scraper for brand: ${brand.name}`);
      }
      
      // Save scraped colors to database
      if (colors.length > 0) {
        for (const color of colors) {
          // Check if color already exists (by brand, line, and code)
          const existingColor = await Color.findOne({
            brandId: brand._id,
            colorLine: color.colorLine,
            code: color.code
          });
          
          if (existingColor) {
            // Update existing color
            await Color.findByIdAndUpdate(existingColor._id, color);
            console.log(`Updated color: ${color.name} (${color.code})`);
          } else {
            // Create new color
            await new Color(color).save();
            console.log(`Added new color: ${color.name} (${color.code})`);
          }
        }
      }
    }
    
    console.log('Color scraping completed!');
  } catch (error) {
    console.error('Error in scrapeAllColors:', error);
  }
};

module.exports = {
  scrapeAllColors,
  scrapeAvedaColors,
  scrapeRedkenColors,
  scrapeWellaColors,
  scrapeLorealColors,
  extractLevelAndTone,
  mapToneToCategory
}; 