import App from 'next/app';
import { LactaTechProvider } from '../context/LactaTechContext';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { DataProvider } from "../context/DataContext";
import { fetchGoogleSheetsData } from "../utils/googleSheets.js";


function MyApp({ Component, pageProps }) {
  return (
    <DataProvider> {/* <- agregamos esto */}
      <LactaTechProvider>
        <>
          <Component {...pageProps} />
          <Analytics />
        </>
      </LactaTechProvider>
    </DataProvider>
  );
}

export default MyApp;



