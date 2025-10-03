// src/context/DataContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { fetchGoogleSheetsData } from "../utils/googleSheets";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [fortificador, setFortificador] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetId = "1DRCYIAQQxe146zQ35EhFtomb4sI-S3HVjecJtrVJJcQ";
        const range = "Fortificadores!A1:E10";
        const apiKey = "AIzaSyDBPlvNl-Paf3sGM0ka265L_ALEUbiWLmM";
        const data = await fetchGoogleSheetsData(sheetId, range, apiKey);
        setFortificador(data);
      } catch (err) {
        console.error("Error loading Google Sheets data:", err);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ fortificador }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
