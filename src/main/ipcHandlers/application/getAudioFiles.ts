import { IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
import { GET_AUDIO_FILES } from '../../../ipcEvents';
import useAssetsFolder from '../../utils/useAssetsFolder';

const getAudioFiles = (event: IpcMainEvent, folderPath: string) => {
  const getAssestPath = useAssetsFolder();
  const dirPath = path.resolve(folderPath);
  const configPath = getAssestPath('/data/config.json');

  try {
    const rawBuffer = fs.readFileSync(configPath);
    const stringData = rawBuffer.toString();
    const configData = JSON.parse(stringData);
    const allowedFileTypes = configData.allowedFileTypes;
    let allAudioList: Array<string> = [];
    const folderFiles = fs.readdirSync(dirPath);

    folderFiles.map((file) => {
      const fileType = file.slice(file.length - 3);
      if (allowedFileTypes.includes(fileType)) {
        allAudioList.push(`${folderPath}\\${file}`);
      }
    });

    event.reply(GET_AUDIO_FILES, 'success', allAudioList);
  } catch (error) {
    event.reply(GET_AUDIO_FILES, 'error', ['']);
  }
};

export default getAudioFiles;
