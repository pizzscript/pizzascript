import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <StrictModeWrapper>
      <HelmetProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </HelmetProvider>
    </StrictModeWrapper>
  );
}

// Helper wrapper in case StrictMode is already at the root level
function StrictModeWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
