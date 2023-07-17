import { IpcMainEvent } from 'electron';
import fs from 'fs';
import { GET_ALL_AUDIO_FILES } from '../../../ipcEvents';
import useAssetsFolder from '../../utils/useAssetsFolder';

const getAllAudioFiles = (event: IpcMainEvent) => {
  const getAssestPath = useAssetsFolder();
  const configPath = getAssestPath('/data/config.json');

  try {
    const rawBuffer = fs.readFileSync(configPath);
    const stringData = rawBuffer.toString();
    const configData = JSON.parse(stringData);
    const allowedFileTypes = configData.allowedFileTypes;
    const allLoadedFolders = configData.folders;
    let allAudioList: Array<string> = [];

    allLoadedFolders.map((folderPath: string) => {
      const folderFiles = fs.readdirSync(folderPath);
      folderFiles.map((file) => {
        const fileType = file.slice(file.length - 3);
        if (allowedFileTypes.includes(fileType)) {
          allAudioList.push(`${folderPath}\\${file}`);
        }
      });
    });

    event.reply(GET_ALL_AUDIO_FILES, 'success', allAudioList);
  } catch (error) {
    event.reply(GET_ALL_AUDIO_FILES, 'error', ['']);
  }
};

export default getAllAudioFiles;
