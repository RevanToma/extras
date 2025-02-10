import '../styles/globals.css';
import { TriviaProvider } from '../context/QuizContext';
import { ThemeProvider } from 'next-themes';
import { PlayerProvider } from '../pages/api/PlayerContext'; // Importera PlayerProvider
import { ResultProvider } from '../context/ResultContext'; // Importera ResultProvider
import Layout from '../components/Layout';
import { Toaster } from '../components/ui/toaster';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute={'class'}
      defaultTheme='dark'
      enableSystem
      disableTransitionOnChange
    >
      {/* PlayerProvider omsluter ResultProvider och TriviaProvider för att dela spelardata*/}
      <TriviaProvider>
        <PlayerProvider>
          <ResultProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <Toaster />
          </ResultProvider>
        </PlayerProvider>
      </TriviaProvider>
    </ThemeProvider>
  );
}
