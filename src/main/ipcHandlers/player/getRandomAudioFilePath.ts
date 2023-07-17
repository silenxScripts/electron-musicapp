import { IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
import { GET_RANDOM_AUDIO_FILE_PATH } from '../../../ipcEvents';

const getRandomAudioFilePath = (event: IpcMainEvent, currentPath: string) => {
  const dirPath = path.dirname(currentPath);
  try {
    const files = fs.readdirSync(dirPath).map((fileName) => {
      return path.join(dirPath, fileName);
    });
    const randomIndex = Math.floor(Math.random() * files.length);
    event.reply(GET_RANDOM_AUDIO_FILE_PATH, 'success', files[randomIndex]);
  } catch (error) {
    event.reply(GET_RANDOM_AUDIO_FILE_PATH, 'error', '0');
  }
};

export default getRandomAudioFilePath;
