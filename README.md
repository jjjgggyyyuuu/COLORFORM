# Hair Color Formulator

A professional web application for hair stylists to generate precise hair color formulations based on color theory principles.

## Features

- **Advanced Formula Calculation**: Generate precise formulas using sophisticated color theory algorithms
- **Brand-Specific Formulations**: Support for major color lines (Aveda, Redken, Wella, L'Oréal)
- **Color Theory Education**: Interactive color wheel and level charts 
- **Corrective Color Logic**: Automatically calculate ash percentages and neutralizers
- **Developer & Processing Time**: Get accurate recommendations for developer volume and timing

## Technology Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Chart.js
- React Hook Form with Yup validation

### Backend
- Node.js & Express
- MongoDB & Mongoose
- Axios & Cheerio for web scraping

## Setup Instructions

### Prerequisites
- Node.js 14.x or higher
- MongoDB 4.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hair-color-formulator.git
cd hair-color-formulator
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

4. Create a `.env` file in the root directory with:
```
MONGODB_URI=mongodb://localhost:27017/hair-color-formulator
PORT=5000
NODE_ENV=development
```

5. Seed the database with initial data:
```bash
node server/utils/seedDatabase.js
```

6. Start the development servers:
```bash
npm run dev
```

The application will be available at: http://localhost:3000

## Color Theory Implementation

The system uses the following color theory principles:

- **Level System**: Universal 1-10 level system (1=black, 10=lightest blonde)
- **Underlying Pigment**: Exposure progression from red to orange to yellow when lifting
- **Complementary Colors**: Blue neutralizes orange, violet neutralizes yellow, green neutralizes red
- **Ash Calculation**: Formula for determining ash percentage based on lift levels

## Project Structure

```
hair-color-formulator/
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/    # UI components
│       ├── pages/         # Page layouts
│       ├── services/      # API services
│       └── utils/         # Color theory algorithms
├── server/                # Node.js backend
│   ├── controllers/       # Request handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API endpoints
│   ├── scrapers/          # Web scraping functions
│   └── utils/             # Helper functions
└── package.json           # Project configuration
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Color theory principles based on professional stylist education
- Database populated with real data from professional color lines 