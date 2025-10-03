
const sheetId = "1DRCYIAQQxe146zQ35EhFtomb4sI-S3HVjecJtrVJJcQ"; // ID de tu sheet
const apiKey = "AIzaSyDBPlvNl-Paf3sGM0ka265L_ALEUbiWLmM"; // tu API key de Google Cloud

//fetchGoogleSheetsData(sheetId, "Hoja1!A1:E10", apiKey)
//  .then(data => {
//    console.log(data); // [["col1","col2"], ["dato1","dato2"], ...]
//  });

export const fetchGoogleSheetsData = async (sheetId, range = "Fortificadores!A1:E10", apiKey) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;

    console.log("Fetching URL:", url);

    const response = await fetch(url);

    console.log("Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    throw error;
  }
};
