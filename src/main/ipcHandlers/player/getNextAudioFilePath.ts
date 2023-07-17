import { IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
import { GET_NEXT_AUDIO_FILE_PATH } from '../../../ipcEvents';

const getNextAudioFilePath = (event: IpcMainEvent, currentPath: string) => {
  const dirPath = path.dirname(currentPath);
  try {
    const files = fs.readdirSync(dirPath).map((fileName) => {
      return path.join(dirPath, fileName);
    });
    const currentPathIndex = files.indexOf(currentPath);
    if (currentPathIndex === files.length - 1) {
      event.reply(GET_NEXT_AUDIO_FILE_PATH, 'success', files[0]);
      return;
    }
    event.reply(
      GET_NEXT_AUDIO_FILE_PATH,
      'success',
      files[currentPathIndex + 1]
    );
  } catch (error) {
    event.reply(GET_NEXT_AUDIO_FILE_PATH, 'error', '0');
  }
};

export default getNextAudioFilePath;
