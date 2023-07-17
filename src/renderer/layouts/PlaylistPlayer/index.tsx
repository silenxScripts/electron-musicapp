import { GET_PLAYLIST_ITEMS } from 'ipcEvents';
import { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import { AppContext } from 'renderer/setup/context';
import PlaylistViewer from 'renderer/features/PlaylistViewer';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { togglePlaylistPlayerLoopPlaylist } from 'renderer/setup/store/actions';

type PlaylistItemTypeDef = {
  fileTitle: string;
  filePath: string;
};

const PlaylistPlayer = () => {
  const { playlist } = useParams();

  const { setAlertState, setPlaylistPlayerAudioPath, playlistPlayerAudioPath } =
    useContext(AppContext);

  const dispatch = useDispatch();
  const loopPlaylist = useSelector(
    (state: StoreStateTypeDef) => state.playlistPlayer.loopPlaylist
  );

  const [songsList, setSongsList] = useState<Array<PlaylistItemTypeDef>>([]);

  const refreshRandomizedSongsList = () => {
    window.electron.ipcRenderer.sendMessage(GET_PLAYLIST_ITEMS, playlist);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(
      GET_PLAYLIST_ITEMS,
      (status, listOfFiles) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setSongsList(listOfFiles as Array<PlaylistItemTypeDef>);
          return;
        }
        setAlertState({
          messages: [
            'An error occured while loading randomized list.',
            'Restart the app if problem persues.',
          ],
        });
      }
    );

    refreshRandomizedSongsList();

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_PLAYLIST_ITEMS);
    };
  }, [playlist]);

  useEffect(() => {
    if (!songsList.length) return;
    if (playlistPlayerAudioPath !== '') return;
    setPlaylistPlayerAudioPath(songsList[0].filePath);
    if (!loopPlaylist) {
      dispatch(togglePlaylistPlayerLoopPlaylist());
    }
  }, [songsList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Currently playing .. {playlist}</h1>
      </div>
      <PlaylistViewer songs={songsList} />
    </div>
  );
};

export default PlaylistPlayer;
