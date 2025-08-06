'use client';

import { useState, useEffect } from 'react';
import { fetchGoogleSheetsData } from '@/utils/googleSheets';

const Calculator = () => {
  const [sheetData, setSheetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSheetData = async () => {
      try {
        // Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
        const data = await fetchGoogleSheetsData('2PACX-1vT7aYvKyjkKg32DbPsZx7uafHldBw4XZdsO1x6OiJRQNdzOlc3_SYOkQg2_1zGTYv-z4tkt8lWf381s');
        setSheetData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSheetData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!sheetData) return <div>No data available</div>;

  return (
    <div>
      <h1>Calculator</h1>
      {/* Add your calculator UI here */}
      <pre>{JSON.stringify(sheetData, null, 2)}</pre>
    </div>
  );
};

export default Calculator;