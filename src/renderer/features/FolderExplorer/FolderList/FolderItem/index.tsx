import styles from './styles.module.scss';
import { useContext } from 'react';
import { AppContext } from 'renderer/setup/context';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { DOES_PATH_EXISTS, REMOVE_USER_FOLDER } from 'ipcEvents';
import getTitleFromPath from 'renderer/common/utils/getTitleFromPath';

type props = {
  folderPath: string;
};

const FolderItem = ({ folderPath }: props) => {
  const { setChoicesState } = useContext(AppContext);

  const folderTitle = getTitleFromPath(folderPath);

  const handleUserFolderRemove = () => {
    setChoicesState({
      message: `Are you sure you want to delete ${folderPath}`,
      choices: ['Delete', 'Cancel'],
      callback(choice) {
        if (choice === 'Cancel') return;
        window.electron.ipcRenderer.sendMessage(REMOVE_USER_FOLDER, folderPath);
      },
    });
  };

  const handleUserFolderClick = () => {
    window.electron.ipcRenderer.sendMessage(DOES_PATH_EXISTS, folderPath);
  };

  return (
    <div className={styles.folder_item}>
      <h1>{folderTitle}</h1>
      <div className={styles.actions}>
        <CustomizedIcon
          title="Delete"
          oppositeAccentIcon={true}
          icon={DeleteIcon}
          size={24}
          callback={handleUserFolderRemove}
        />
        <CustomizedIcon
          title="Open"
          icon={ArrowCircleRightIcon}
          size={24}
          callback={handleUserFolderClick}
        />
      </div>
    </div>
  );
};

export default FolderItem;
