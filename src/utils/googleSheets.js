import Papa from 'papaparse';

export const fetchGoogleSheetsData = async (sheetId, gid = '0') => {
  try {
    // Check if the input is a published spreadsheet URL
    const isPublishedUrl = sheetId.startsWith('2PACX-');

    const url = isPublishedUrl
      ? `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=${gid}&single=true&output=csv`
      : `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch data from Google Sheets');
    }

    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
}; 