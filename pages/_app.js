// pages/_app.js
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import '../components/Hero/sky-hero.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
