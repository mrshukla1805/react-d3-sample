import React, { useState, useEffect } from 'react';
import BarChart from './BarChart';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/5126797f-8d2f-47e6-92b8-8e56be1d3ee1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const transformedData = data.map((value, index) => ({
          letter: `Letter ${index + 1}`,
          frequency: value
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <BarChart data={data} />
    </div>
  );
}

export default App;
