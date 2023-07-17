import { GET_ALL_AUDIO_FILES } from 'ipcEvents';
import { useEffect, useState, useContext } from 'react';
import styles from './styles.module.scss';
import { AppContext } from 'renderer/setup/context';
import DraggableAudioFile from './DraggableAudioFIle';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const AllAudioDraggableList = () => {
  const { setAlertState } = useContext(AppContext);

  const [allFiles, setAllFiles] = useState<Array<string>>([]);

  const getAllLoadedAudioFiles = () => {
    window.electron.ipcRenderer.sendMessage(GET_ALL_AUDIO_FILES);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(
      GET_ALL_AUDIO_FILES,
      (status, listOfFiles) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setAllFiles(listOfFiles as Array<string>);
          return;
        }
        setAlertState({
          messages: [
            'There was a problem loading files...',
            'Restart the app if problem persues.',
          ],
        });
      }
    );

    getAllLoadedAudioFiles();

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_ALL_AUDIO_FILES);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1>Loaded audio files</h1>
      <hr />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.scroll_area}>
          {allFiles.length !== 0 ? (
            allFiles.map((file, index) => (
              <DraggableAudioFile filePath={file} key={index} />
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </DndProvider>
    </div>
  );
};

export default AllAudioDraggableList;
