import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import AppContextProvider from './setup/context';
import { Provider } from 'react-redux';
import { persistor, store } from './setup/store';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
  <AppContextProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </AppContextProvider>
);
