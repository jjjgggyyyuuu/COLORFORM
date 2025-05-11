import React, { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required Chart.js components
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const ColorWheel = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Red', 'Red-Orange', 'Orange', 'Yellow-Orange', 
            'Yellow', 'Yellow-Green', 'Green', 'Blue-Green', 
            'Blue', 'Blue-Violet', 'Violet', 'Red-Violet'
          ],
          datasets: [{
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Equal segments
            backgroundColor: [
              '#FF0000', // Red
              '#FF4500', // Red-Orange
              '#FFA500', // Orange
              '#FFD700', // Yellow-Orange
              '#FFFF00', // Yellow
              '#9ACD32', // Yellow-Green
              '#008000', // Green
              '#20B2AA', // Blue-Green
              '#0000FF', // Blue
              '#4B0082', // Blue-Violet
              '#800080', // Violet
              '#C71585', // Red-Violet
            ],
            borderWidth: 1,
            borderColor: '#FFFFFF',
          }]
        },
        options: {
          cutout: '40%',
          radius: '90%',
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 15,
                padding: 15
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  return `${label}`;
                },
                afterLabel: (context) => {
                  const complementaryIndex = (context.dataIndex + 6) % 12;
                  const complementaryColor = context.chart.data.labels[complementaryIndex];
                  return `Neutralizes: ${complementaryColor}`;
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="card p-6">
      <h2 className="section-heading">Hair Color Wheel</h2>
      <p className="mb-4 text-gray-600">
        The color wheel shows complementary colors that neutralize each other. In hair coloring, we use the opposite (complementary) color to neutralize unwanted tones. Colors directly across from each other on the wheel cancel each other out.
      </p>
      <div className="max-w-2xl mx-auto">
        <canvas ref={chartRef} height="400"></canvas>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="subsection-heading text-green-800">Green</h3>
          <p>Neutralizes red tones, commonly found in level 4-5 hair when lifted. Used when dealing with red undertones or brassiness in darker hair.</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="subsection-heading text-blue-800">Blue/Ash</h3>
          <p>Neutralizes orange tones, commonly found in level 6-7 hair when lifted. Essential for counteracting warmth in medium-blonde results.</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="subsection-heading text-purple-800">Violet</h3>
          <p>Neutralizes yellow tones, commonly found in level 8-10 hair when lifted. Crucial for creating cool blonde results without brassiness.</p>
        </div>
      </div>
    </div>
  );
};

export default ColorWheel; 