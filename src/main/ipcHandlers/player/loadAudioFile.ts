import getAudioDurationInSeconds from 'get-audio-duration';
import fs from 'fs';
import path from 'path';
import { IpcMainEvent } from 'electron';
import { LOAD_AUDIO_FILE } from '../../../ipcEvents';

const loadAudioFile = async (event: IpcMainEvent, filePath: string) => {
  const audioFilePath = path.resolve(filePath);
  const fileExists = fs.existsSync(audioFilePath);

  if (fileExists) {
    try {
      const fileBuffer = fs.readFileSync(audioFilePath);
      const bufferArray = fileBuffer.buffer.slice(
        fileBuffer.byteOffset,
        fileBuffer.byteOffset + fileBuffer.byteLength
      );
      getAudioDurationInSeconds(audioFilePath).then((duration) => {
        event.reply(LOAD_AUDIO_FILE, 'success', bufferArray, duration);
      });
    } catch (error) {
      event.reply(LOAD_AUDIO_FILE, 'error', 0, 0);
    }
  } else {
    event.reply(LOAD_AUDIO_FILE, 'error', 0, 0);
  }
};

export default loadAudioFile;
