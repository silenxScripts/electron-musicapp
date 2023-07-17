import { GET_ALL_AUDIO_FILES } from 'ipcEvents';
import { useState, useEffect, useContext } from 'react';
import getRandomizedSubArray from 'renderer/common/utils/getRandomizedSubArray';
import styles from './styles.module.scss';
import { AppContext } from 'renderer/setup/context';
import InfoIcon from '@mui/icons-material/Info';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import SyncIcon from '@mui/icons-material/Sync';
import PlaylistViewer from 'renderer/features/PlaylistViewer';
import { useDispatch, useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { togglePlaylistPlayerLoopPlaylist } from 'renderer/setup/store/actions';

type PlaylistItemTypeDef = {
  fileTitle: string;
  filePath: string;
};

const PlaylistRandomizer = () => {
  const { setAlertState, setPlaylistPlayerAudioPath, playlistPlayerAudioPath } =
    useContext(AppContext);

  const dispatch = useDispatch();
  const loopPlaylist = useSelector(
    (state: StoreStateTypeDef) => state.playlistPlayer.loopPlaylist
  );

  const [songsList, setSongsList] = useState<Array<PlaylistItemTypeDef>>([]);

  const refreshRandomizedSongsList = () => {
    window.electron.ipcRenderer.sendMessage(GET_ALL_AUDIO_FILES);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(
      GET_ALL_AUDIO_FILES,
      (status, listOfFiles) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          const randomizedList = getRandomizedSubArray(
            listOfFiles as Array<string>,
            10
          );
          const songsList: Array<PlaylistItemTypeDef> = [];
          randomizedList.map((filePath) => {
            const filePathSplitList = filePath.split('\\');
            const lastIndex = filePathSplitList.length - 1;
            const fileTitle = filePathSplitList[lastIndex];
            songsList.push({
              fileTitle,
              filePath,
            });
          });
          setSongsList(songsList);
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
      window.electron.ipcRenderer.removeAllListeners(GET_ALL_AUDIO_FILES);
    };
  }, []);

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
        <CustomizedIcon
          title="Atleast 15+ total songs required for randomizer to work"
          icon={InfoIcon}
          tooltipPlacement="right"
          oppositeAccentIcon={true}
        />
        <div className={styles.refresh_button}>
          <h1>Re-randomize</h1>
          <CustomizedIcon
            title="Refresh"
            oppositeAccentIcon={true}
            icon={SyncIcon}
            callback={refreshRandomizedSongsList}
          />
        </div>
      </div>
      <PlaylistViewer songs={songsList} />
    </div>
  );
};

export default PlaylistRandomizer;
