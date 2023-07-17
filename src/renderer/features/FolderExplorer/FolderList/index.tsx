import React, { useEffect, useState, useContext } from 'react';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import styles from './styles.module.scss';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  ADD_USER_FOLDER,
  DOES_PATH_EXISTS,
  GET_USER_FOLDERS,
  REMOVE_USER_FOLDER,
} from 'ipcEvents';
import { AppContext } from 'renderer/setup/context';
import FolderItem from './FolderItem';

type props = {
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
};

const FolderList = ({ setSelectedFolder }: props) => {
  const { setAlertState } = useContext(AppContext);
  const [folders, setFolders] = useState<Array<string>>([]);

  const refreshFoldersList = () => {
    window.electron.ipcRenderer.sendMessage(GET_USER_FOLDERS);
  };

  const handleAddUserFolder = () => {
    window.electron.ipcRenderer.sendMessage(ADD_USER_FOLDER);
  };

  useEffect(() => {
    refreshFoldersList();

    window.electron.ipcRenderer.on(GET_USER_FOLDERS, (foldersList) => {
      if (!Array.isArray(foldersList)) return;
      if (foldersList.includes('error')) return;
      setFolders(() => foldersList as Array<string>);
    });

    window.electron.ipcRenderer.on(ADD_USER_FOLDER, (status) => {
      if (typeof status !== typeof '') return;
      if (status === 'exists') {
        setAlertState({
          messages: ['Folder already exists!'],
        });
        return;
      } else if (status === 'success') {
        refreshFoldersList();
        return;
      }
      setAlertState({
        messages: ["Internal server error: folder couldn't be loaded!"],
      });
    });

    window.electron.ipcRenderer.on(REMOVE_USER_FOLDER, (status, folderPath) => {
      if (typeof status !== typeof '') return;
      if (status === 'success') {
        refreshFoldersList();
        return;
      }
      setAlertState({
        messages: [`There was a problem deleting ${folderPath}`],
      });
    });

    window.electron.ipcRenderer.on(
      DOES_PATH_EXISTS,
      (doesExists, folderPath) => {
        if (typeof doesExists !== typeof false) return;
        if (doesExists) {
          setSelectedFolder(folderPath as string);
          return;
        }
        setAlertState({
          messages: [
            `There was a problem opening ${folderPath}`,
            ' 1. Check if it exists',
            ' 2. Remove the folder and re-add it',
          ],
        });
      }
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_USER_FOLDERS);
      window.electron.ipcRenderer.removeAllListeners(REMOVE_USER_FOLDER);
      window.electron.ipcRenderer.removeAllListeners(DOES_PATH_EXISTS);
      window.electron.ipcRenderer.removeAllListeners(ADD_USER_FOLDER);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CustomizedIcon
          title=""
          icon={FolderCopyIcon}
          oppositeAccentIcon={true}
          size={20}
        />
        <h1>Loaded folders</h1>
        <CustomizedIcon
          title="Add folder"
          icon={AddCircleIcon}
          size={26}
          callback={handleAddUserFolder}
        />
      </div>
      <hr />
      <div className={styles.folder_list}>
        {folders.map((folder, index) => (
          <FolderItem folderPath={folder} key={index} />
        ))}
      </div>
    </div>
  );
};

export default FolderList;
