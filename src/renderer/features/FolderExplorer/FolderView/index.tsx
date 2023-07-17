import { useEffect, useState, useContext } from 'react';
import { DELETE_FILE, GET_AUDIO_FILES } from 'ipcEvents';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import getTitleFromPath from 'renderer/common/utils/getTitleFromPath';
import styles from './styles.module.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FileItem from './FileItem';
import { FILE_ITEM } from 'renderer/common/data/draggablesType';
import { colors } from 'renderer/common/data/colors';
import { AppContext } from 'renderer/setup/context';

type props = {
  selectedFolder: string;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
};

const FolderView = ({ selectedFolder, setSelectedFolder }: props) => {
  const {
    setChoicesState,
    setAlertState,
    folderPlayerLoading,
    setFolderPlayerLoading,
    folderPlayerAudioPath,
    setFolderPlayerAudioPath,
  } = useContext(AppContext);
  const folderTitle = getTitleFromPath(selectedFolder);
  const [files, setFiles] = useState<Array<string>>([]);

  const refreshFiles = () => {
    window.electron.ipcRenderer.sendMessage(GET_AUDIO_FILES, selectedFolder);
  };

  const handleFileDelete = (item: { filePath: string }) => {
    setChoicesState({
      message: `You sure want to delete ${item.filePath}`,
      choices: ['Yes', 'No'],
      callback(choice) {
        if (choice === 'No') return;
        window.electron.ipcRenderer.sendMessage(DELETE_FILE, item.filePath);
      },
    });
  };

  const handleFileClick = (filePath: string) => {
    if (folderPlayerLoading) return;
    if (folderPlayerAudioPath === filePath) {
      setFolderPlayerAudioPath('');
      setFolderPlayerLoading(false);
      return;
    }
    setFolderPlayerAudioPath(filePath);
  };

  const [{ isOver }, drop] = useDrop({
    accept: FILE_ITEM,
    drop: (item) => {
      handleFileDelete(item as { filePath: string });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    const fileRefreshInterval = setInterval(() => {
      refreshFiles();
    }, 100);

    window.electron.ipcRenderer.on(GET_AUDIO_FILES, (status, files) => {
      if (typeof status !== typeof '') return;
      if (status === 'success') {
        if (!Array.isArray(files)) return;
        setFiles(files);
        return;
      }
      setFiles([]);
    });

    window.electron.ipcRenderer.on(DELETE_FILE, (status, errorMessage) => {
      if (!Array.isArray(errorMessage)) return;
      setAlertState({
        messages: errorMessage,
      });
    });

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_AUDIO_FILES);
      window.electron.ipcRenderer.removeAllListeners(DELETE_FILE);
      clearInterval(fileRefreshInterval);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <CustomizedIcon
          title="Close"
          icon={MusicNoteIcon}
          oppositeAccentIcon={true}
          size={26}
          callback={() => setSelectedFolder('')}
        />
        <h1>{folderTitle}</h1>
        <CustomizedIcon
          title="Close"
          icon={CancelIcon}
          size={26}
          callback={() => setSelectedFolder('')}
        />
      </div>
      <hr />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.file_list}>
          {files.length !== 0 ? (
            files.map((file, index) => (
              <FileItem
                filePath={file}
                key={index}
                handleClick={handleFileClick}
              />
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </DndProvider>
      <div
        className={styles.delete_drop_box}
        style={{
          background: isOver ? colors.accentDark : '',
        }}
        ref={drop}
      >
        <CustomizedIcon
          title=""
          icon={DeleteIcon}
          sx={{
            color: isOver ? colors.fontPr : colors.accent,
          }}
        />
      </div>
    </div>
  );
};

export default FolderView;
