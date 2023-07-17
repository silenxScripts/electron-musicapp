import { IpcMain } from 'electron';
import {
  GET_NEXT_AUDIO_FILE_PATH,
  LOAD_AUDIO_FILE,
  GET_PREV_AUDIO_FILE_PATH,
  GET_RANDOM_AUDIO_FILE_PATH,
} from '../../../ipcEvents';
import loadAudioFile from '../../ipcHandlers/player/loadAudioFile';
import getNextAudioFilePath from '../../ipcHandlers/player/getNextAudioFilePath';
import getPrevAudioFilePath from '../../ipcHandlers/player/getPrevAudioFilePath';
import getRandomAudioFilePath from '../../ipcHandlers/player/getRandomAudioFilePath';

const registerPlayerEvents = (ipcMain: IpcMain) => {
  ipcMain.on(LOAD_AUDIO_FILE, loadAudioFile);
  ipcMain.on(GET_NEXT_AUDIO_FILE_PATH, getNextAudioFilePath);
  ipcMain.on(GET_PREV_AUDIO_FILE_PATH, getPrevAudioFilePath);
  ipcMain.on(GET_RANDOM_AUDIO_FILE_PATH, getRandomAudioFilePath);
};

export default registerPlayerEvents;
