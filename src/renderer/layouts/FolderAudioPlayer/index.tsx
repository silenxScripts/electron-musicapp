import PlayerController from 'renderer/features/PlayerControler';
import VisualPlayback from 'renderer/features/VisualPlayback';
import { AppContext } from 'renderer/setup/context';
import { useEffect, useContext, useState } from 'react';
import {
  GET_NEXT_AUDIO_FILE_PATH,
  GET_PREV_AUDIO_FILE_PATH,
  GET_RANDOM_AUDIO_FILE_PATH,
} from 'ipcEvents';
import CloseIcon from '@mui/icons-material/Close';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import { colors } from 'renderer/common/data/colors';
import { useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';

const FolderAudioPlayer = () => {
  const {
    folderPlayerAudioPath,
    setFolderPlayerAudioPath,
    folderPlayerLoading,
    setFolderPlayerLoading,
    setAlertState,
  } = useContext(AppContext);

  const showExtraFeatures = useSelector(
    (state: StoreStateTypeDef) => state.showExtraFeatures
  );

  const [externalFunctionTrigger, setExternalFunctionTrigger] = useState<
    'play-next' | 'play-prev' | 'random' | ''
  >('');

  const isActive = folderPlayerAudioPath.length !== 0 && folderPlayerLoading;
  const audioTitle = (() => {
    const pathSplitList = folderPlayerAudioPath.split('\\');
    const lastIndex = pathSplitList.length - 1;
    const title = pathSplitList[lastIndex];
    return title;
  })();

  useEffect(() => {
    window.electron.ipcRenderer.on(
      GET_NEXT_AUDIO_FILE_PATH,
      (status, filePath) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setFolderPlayerAudioPath(filePath as string);
        } else {
          setAlertState({
            messages: [
              'A problem occured whilst loading the next audio..',
              'Restart the app if problem persues.',
            ],
          });
        }
      }
    );

    window.electron.ipcRenderer.on(
      GET_PREV_AUDIO_FILE_PATH,
      (status, filePath) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setFolderPlayerAudioPath(filePath as string);
        } else {
          setAlertState({
            messages: [
              'A problem occured whilst loading the previous audio..',
              'Restart the app if problem persues.',
            ],
          });
        }
      }
    );

    window.electron.ipcRenderer.on(
      GET_RANDOM_AUDIO_FILE_PATH,
      (status, filePath) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setFolderPlayerAudioPath(filePath as string);
        } else {
          setAlertState({
            messages: [
              'A problem occured whilst loading the shuffeled audio..',
              'Restart the app if problem persues.',
            ],
          });
        }
      }
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_NEXT_AUDIO_FILE_PATH);
      window.electron.ipcRenderer.removeAllListeners(GET_PREV_AUDIO_FILE_PATH);
      window.electron.ipcRenderer.removeAllListeners(
        GET_RANDOM_AUDIO_FILE_PATH
      );
    };
  }, []);

  useEffect(() => {
    if (externalFunctionTrigger === 'play-next') {
      window.electron.ipcRenderer.sendMessage(
        GET_NEXT_AUDIO_FILE_PATH,
        folderPlayerAudioPath
      );
    } else if (externalFunctionTrigger === 'play-prev') {
      window.electron.ipcRenderer.sendMessage(
        GET_PREV_AUDIO_FILE_PATH,
        folderPlayerAudioPath
      );
    } else if (externalFunctionTrigger === 'random') {
      window.electron.ipcRenderer.sendMessage(
        GET_RANDOM_AUDIO_FILE_PATH,
        folderPlayerAudioPath
      );
    }
    setExternalFunctionTrigger('');
  }, [externalFunctionTrigger]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: colors.accentOpposite,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          width: 30,
          height: 30,
          zIndex: 6,
        }}
        onClick={() => {
          setFolderPlayerAudioPath('');
          setFolderPlayerLoading(false);
        }}
      >
        <CustomizedIcon
          title="Close player"
          icon={CloseIcon}
          size={20}
          sx={{ color: '#fff' }}
        />
      </div>
      <VisualPlayback size="20rem" active={!isActive} title={audioTitle} />
      <PlayerController
        toShowExtraFeatures={showExtraFeatures}
        path={folderPlayerAudioPath}
        setPath={setFolderPlayerAudioPath}
        loading={folderPlayerLoading}
        setLoading={setFolderPlayerLoading}
        setExternalFunctionTrigger={setExternalFunctionTrigger}
        playerType="folder"
      />
    </div>
  );
};

export default FolderAudioPlayer;
