import { AppProvider } from './providers';
import { AppLayout } from './components/Layout';
import { AppRoutes } from './routes';

const App = () => {
  return (
    <AppProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppProvider>
  );
};

export default App;
