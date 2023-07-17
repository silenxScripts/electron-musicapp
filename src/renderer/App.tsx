import { useSelector } from 'react-redux';
import Alert from './common/customPrompts/alert';
import Choices from './common/customPrompts/choices';
import Navbar from './features/Navbar';
import FolderViewPage from './pages/FolderViewPage';
import styles from './styles.module.scss';
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import StoreStateTypeDef from './setup/store/types/storeStateTypeDef';
import { useEffect } from 'react';
import PlaylistsPage from './pages/PlaylistsPage';
import SettingsPage from './pages/SettingsPage';
import PlaylistManager from './layouts/PlaylistManager';
import PlaylistRandomizer from './layouts/PlaylistRandomizer';
import PlaylistPlayer from './layouts/PlaylistPlayer';

const App = () => {
  return (
    <BrowserRouter>
      <SwitchToRememberedRoute />
    </BrowserRouter>
  );
};

export default App;

const SwitchToRememberedRoute = () => {
  const toUseRememberedRoute = useSelector(
    (state: StoreStateTypeDef) => state.rememberView
  );

  const rememberedRoute = useSelector(
    (state: StoreStateTypeDef) => state.viewPageUrl
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!toUseRememberedRoute) {
      navigate('/index.html');
      return;
    }
    navigate(rememberedRoute);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Alert />
      <Choices />
      <Navbar path={location.pathname} />
      <h1>{location.pathname}</h1>
      <Routes>
        <Route path="/index.html" element={<FolderViewPage />} />
        <Route path="/index.html/playlists" element={<PlaylistsPage />}>
          <Route path="manager" element={<PlaylistManager />} />
          <Route path="randomizer" element={<PlaylistRandomizer />} />
          <Route path="player/:playlist" element={<PlaylistPlayer />} />
        </Route>
        <Route path="/index.html/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
};
