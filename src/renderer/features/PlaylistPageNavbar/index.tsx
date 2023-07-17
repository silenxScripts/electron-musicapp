import styles from './styles.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { colors } from 'renderer/common/data/colors';
import { useContext, useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TollIcon from '@mui/icons-material/Toll';
import { AppContext } from 'renderer/setup/context';
import { GET_ALL_PLAYLISTS } from 'ipcEvents';

const PlaylistPageNavbar = () => {
  const navigate = useNavigate();

  const { setAlertState, setPlaylistPlayerAudioPath } = useContext(AppContext);

  const [playlists, setPlaylists] = useState<Array<string>>([]);

  const refreshPlaylists = () => {
    window.electron.ipcRenderer.sendMessage(GET_ALL_PLAYLISTS);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(GET_ALL_PLAYLISTS, (status, playlists) => {
      if (typeof status !== typeof '') return;
      if (status === 'success') {
        setPlaylists(playlists as Array<string>);
        return;
      }
      setAlertState({
        messages: [
          'There was an internal error',
          'Restart if problem persues.',
        ],
      });
    });

    refreshPlaylists();

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_ALL_PLAYLISTS);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Menu</h1>
      <div className={styles.scroll_area}>
        <LinkItem link="" title="Home" icon={HomeIcon} />
        <LinkItem
          link="/manager"
          title="Playlists Manager"
          icon={EditNoteIcon}
        />
        <LinkItem
          link="/randomizer"
          title="Playlists Randomizer"
          icon={TollIcon}
        />
      </div>
      <h1>Playlists</h1>
      <div className={styles.scroll_area}>
        {playlists.map((playlist, index) => (
          <li
            key={index}
            className={styles.playlist_item}
            onClick={() => {
              setPlaylistPlayerAudioPath('');
              navigate(`/index.html/playlists/player/${playlist}`);
            }}
          >
            {playlist}
          </li>
        ))}
      </div>
    </div>
  );
};

export default PlaylistPageNavbar;

type linkItemProps = {
  link: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

const LinkItem = ({ link, title, icon: Icon }: linkItemProps) => {
  const { playlistPlayerLoading, setPlaylistPlayerAudioPath } =
    useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();
  const fullRoute = `/index.html/playlists${link}`;
  const isActive = location.pathname === fullRoute;
  const currentColor = isActive ? colors.accentOpposite : colors.fontPr;

  return (
    <div
      className={styles.link}
      style={{ background: isActive ? colors.layerTwo : '' }}
      onClick={() => {
        if (playlistPlayerLoading) return;
        setPlaylistPlayerAudioPath('');
        navigate(fullRoute);
      }}
    >
      <Icon sx={{ color: currentColor }} />
      <h1 style={{ color: currentColor }}>{title}</h1>
    </div>
  );
};
