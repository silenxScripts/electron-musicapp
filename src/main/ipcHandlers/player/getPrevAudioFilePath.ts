import { IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
import { GET_PREV_AUDIO_FILE_PATH } from '../../../ipcEvents';

const getPrevAudioFilePath = (event: IpcMainEvent, currentPath: string) => {
  const dirPath = path.dirname(currentPath);
  try {
    const files = fs.readdirSync(dirPath).map((fileName) => {
      return path.join(dirPath, fileName);
    });
    const currentPathIndex = files.indexOf(currentPath);
    if (currentPathIndex === 0) {
      event.reply(GET_PREV_AUDIO_FILE_PATH, 'success', files[files.length - 1]);
      return;
    }
    event.reply(
      GET_PREV_AUDIO_FILE_PATH,
      'success',
      files[currentPathIndex - 1]
    );
  } catch (error) {
    event.reply(GET_PREV_AUDIO_FILE_PATH, 'error', '0');
  }
};

export default getPrevAudioFilePath;
