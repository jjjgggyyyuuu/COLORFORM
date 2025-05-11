const mongoose = require('mongoose');
const Brand = require('../models/Brand');
const Color = require('../models/Color');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Sample data for initial setup
const brandData = [
  {
    name: 'Aveda',
    description: 'Aveda is a cruelty-free brand with plant-based hair care and hair color products.',
    website: 'https://www.aveda.com',
    colorLines: [
      {
        name: 'Full Spectrum',
        description: 'Permanent hair color with up to 96% naturally derived ingredients',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: true,
        developerOptions: [10, 20, 30, 40],
        mixingRatio: '1:1'
      },
      {
        name: 'Pure Tone Deposit-Only',
        description: 'Deposit-only color for adding tone without lifting',
        isPermanent: false,
        isDemiPermanent: true,
        isSemiPermanent: false,
        isHighLift: false,
        developerOptions: [10],
        mixingRatio: '1:1'
      }
    ],
    logoUrl: 'https://www.aveda.com/media/images/aveda-logo.png'
  },
  {
    name: 'Redken',
    description: 'Redken offers professional hair products, services and treatments for all hair types.',
    website: 'https://www.redken.com',
    colorLines: [
      {
        name: 'Shades EQ',
        description: 'Demi-permanent, ammonia-free hair color gloss',
        isPermanent: false,
        isDemiPermanent: true,
        isSemiPermanent: false,
        isHighLift: false,
        developerOptions: [10],
        mixingRatio: '1:1'
      },
      {
        name: 'Color Fusion',
        description: 'Permanent hair color with advanced protein and ceramide technology',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: true,
        developerOptions: [10, 20, 30, 40],
        mixingRatio: '1:1'
      },
      {
        name: 'Color Gels',
        description: 'Permanent hair color with superior gray coverage',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: false,
        developerOptions: [10, 20, 30],
        mixingRatio: '1:1'
      }
    ],
    logoUrl: 'https://www.redken.com/media/images/redken-logo.png'
  },
  {
    name: 'Wella',
    description: 'Wella Professionals offers salon-quality hair color, care and styling products.',
    website: 'https://www.wella.com',
    colorLines: [
      {
        name: 'Koleston Perfect',
        description: 'Permanent hair color with Pure Balance Technology',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: true,
        developerOptions: [10, 20, 30, 40],
        mixingRatio: '1:1'
      },
      {
        name: 'Color Touch',
        description: 'Demi-permanent color with vibrant results',
        isPermanent: false,
        isDemiPermanent: true,
        isSemiPermanent: false,
        isHighLift: false,
        developerOptions: [6, 13],
        mixingRatio: '1:2'
      },
      {
        name: 'Illumina Color',
        description: 'Permanent color with light-reflecting technology',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: true,
        developerOptions: [10, 20, 30, 40],
        mixingRatio: '1:1'
      }
    ],
    logoUrl: 'https://www.wella.com/media/images/wella-logo.png'
  },
  {
    name: 'L\'Oréal',
    description: 'L\'Oréal Professionnel offers premium salon hair products and color treatments.',
    website: 'https://www.lorealprofessionnel.com',
    colorLines: [
      {
        name: 'Majirel',
        description: 'Permanent creme hair color with deep conditioning',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: true,
        developerOptions: [10, 20, 30, 40],
        mixingRatio: '1:1.5'
      },
      {
        name: 'INOA',
        description: 'Ammonia-free permanent hair color',
        isPermanent: true,
        isDemiPermanent: false,
        isSemiPermanent: false,
        isHighLift: true,
        developerOptions: [10, 20, 30],
        mixingRatio: '1:1'
      },
      {
        name: 'Dia Light',
        description: 'Acidic demi-permanent hair color',
        isPermanent: false,
        isDemiPermanent: true,
        isSemiPermanent: false,
        isHighLift: false,
        developerOptions: [9],
        mixingRatio: '1:1.5'
      }
    ],
    logoUrl: 'https://www.lorealprofessionnel.com/media/images/loreal-logo.png'
  }
];

const avedaColors = [
  {
    colorLine: 'Full Spectrum',
    name: 'Natural Black',
    code: '1N',
    level: 1,
    tone: 'N',
    toneCategory: 'natural',
    hexColor: '#000000',
    isHighLift: false,
    isCorrective: false,
    correctiveProperties: 'none'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Natural Dark Brown',
    code: '3N',
    level: 3,
    tone: 'N',
    toneCategory: 'natural',
    hexColor: '#2C1A0D',
    isHighLift: false,
    isCorrective: false,
    correctiveProperties: 'none'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Ash Medium Brown',
    code: '5A',
    level: 5,
    tone: 'A',
    toneCategory: 'ash',
    hexColor: '#4A392B',
    isHighLift: false,
    isCorrective: true,
    correctiveProperties: 'neutralizes-orange'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Gold Medium Brown',
    code: '5G',
    level: 5,
    tone: 'G',
    toneCategory: 'gold',
    hexColor: '#5A3E25',
    isHighLift: false,
    isCorrective: false,
    correctiveProperties: 'adds-warmth'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Copper Light Brown',
    code: '6C',
    level: 6,
    tone: 'C',
    toneCategory: 'copper',
    hexColor: '#7A4A2B',
    isHighLift: false,
    isCorrective: false,
    correctiveProperties: 'adds-warmth'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Ash Dark Blonde',
    code: '7A',
    level: 7,
    tone: 'A',
    toneCategory: 'ash',
    hexColor: '#9C7A5A',
    isHighLift: false,
    isCorrective: true,
    correctiveProperties: 'neutralizes-orange'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Natural Blonde',
    code: '8N',
    level: 8,
    tone: 'N',
    toneCategory: 'natural',
    hexColor: '#D5AC78',
    isHighLift: false,
    isCorrective: false,
    correctiveProperties: 'none'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Violet Light Blonde',
    code: '9V',
    level: 9,
    tone: 'V',
    toneCategory: 'violet',
    hexColor: '#D8B298',
    isHighLift: false,
    isCorrective: true,
    correctiveProperties: 'neutralizes-yellow'
  },
  {
    colorLine: 'Full Spectrum',
    name: 'Extra Light Blonde',
    code: '10N',
    level: 10,
    tone: 'N',
    toneCategory: 'natural',
    hexColor: '#EFD6A7',
    isHighLift: true,
    isCorrective: false,
    correctiveProperties: 'none'
  },
  {
    colorLine: 'Pure Tone Deposit-Only',
    name: 'Blue Corrector',
    code: 'Blue',
    level: 0,
    tone: 'B',
    toneCategory: 'blue',
    hexColor: '#2C3A55',
    isHighLift: false,
    isCorrective: true,
    correctiveProperties: 'neutralizes-orange'
  },
  {
    colorLine: 'Pure Tone Deposit-Only',
    name: 'Violet Corrector',
    code: 'Violet',
    level: 0,
    tone: 'V',
    toneCategory: 'violet',
    hexColor: '#6A385A',
    isHighLift: false,
    isCorrective: true,
    correctiveProperties: 'neutralizes-yellow'
  },
  {
    colorLine: 'Pure Tone Deposit-Only',
    name: 'Green Corrector',
    code: 'Green',
    level: 0,
    tone: 'GR',
    toneCategory: 'green',
    hexColor: '#3C5939',
    isHighLift: false,
    isCorrective: true,
    correctiveProperties: 'neutralizes-red'
  }
];

// Similar sample data would be created for Redken, Wella, and L'Oréal

/**
 * Connect to MongoDB and seed the database
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hair-color-formulator');
    console.log('MongoDB connected');

    // Clear existing data
    await Brand.deleteMany({});
    await Color.deleteMany({});
    console.log('Database cleared');

    // Insert brand data
    const insertedBrands = await Brand.insertMany(brandData);
    console.log(`${insertedBrands.length} brands inserted`);

    // Get Aveda brand ID
    const avedaBrand = insertedBrands.find(brand => brand.name === 'Aveda');
    
    if (avedaBrand) {
      // Add brand ID to each color
      const avedaColorsWithBrandId = avedaColors.map(color => ({
        ...color,
        brandId: avedaBrand._id
      }));
      
      // Insert Aveda colors
      await Color.insertMany(avedaColorsWithBrandId);
      console.log(`${avedaColors.length} Aveda colors inserted`);
    }
    
    // Similar code would seed colors for other brands

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Database seeding error:', error);
  } finally {
    // Close the connection when done
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Execute if this file is run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase; 