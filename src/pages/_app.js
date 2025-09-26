import App from 'next/app';
import { LactaTechProvider } from '../context/LactaTechContext';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  return (
    <LactaTechProvider>
      <>
        <Component {...pageProps} />
        <Analytics />
      </>
    </LactaTechProvider>
  );
}

export default MyApp;
