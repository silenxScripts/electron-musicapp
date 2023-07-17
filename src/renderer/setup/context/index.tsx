import React, { createContext, useState, useMemo } from 'react';
import ContextTypeDef from './types/contextTypeDef';
import AlertStateTypeDef from './types/alertStateTypeDef';
import ChoicesStateTypeDef from './types/choicesStateTypeDef';

export const AppContext = createContext<ContextTypeDef>({
  alertState: {
    messages: [''],
  },
  setAlertState: () => {},
  choicesState: {
    callback(choice) {},
    message: '',
    choices: ['Yes', 'No'],
  },
  setChoicesState: () => {},
  folderPlayerAudioPath: '',
  setFolderPlayerAudioPath: () => {},
  folderPlayerLoading: false,
  setFolderPlayerLoading: () => {},
  playlistPlayerAudioPath: '',
  setPlaylistPlayerAudioPath: () => {},
  playlistPlayerLoading: false,
  setPlaylistPlayerLoading: () => {},
});

type props = {
  children: React.ReactNode;
};

const AppContextProvider = ({ children }: props) => {
  const [alertState, setAlertState] = useState<AlertStateTypeDef>({
    messages: [''],
  });

  const [choicesState, setChoicesState] = useState<ChoicesStateTypeDef>({
    choices: ['Yes', 'No'],
    callback(choice) {},
    message: '',
  });

  const [folderPlayerAudioPath, setFolderPlayerAudioPath] = useState('');
  const [folderPlayerLoading, setFolderPlayerLoading] = useState(false);

  const [playlistPlayerAudioPath, setPlaylistPlayerAudioPath] = useState('');
  const [playlistPlayerLoading, setPlaylistPlayerLoading] = useState(false);

  const values = useMemo(() => {
    return {
      alertState,
      setAlertState,
      choicesState,
      setChoicesState,
      folderPlayerAudioPath,
      setFolderPlayerAudioPath,
      folderPlayerLoading,
      setFolderPlayerLoading,
      playlistPlayerAudioPath,
      setPlaylistPlayerAudioPath,
      playlistPlayerLoading,
      setPlaylistPlayerLoading,
    };
  }, [
    alertState,
    choicesState,
    folderPlayerAudioPath,
    folderPlayerLoading,
    playlistPlayerAudioPath,
    playlistPlayerLoading,
  ]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
