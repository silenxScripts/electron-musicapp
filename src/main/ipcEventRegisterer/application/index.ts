import { IpcMain } from 'electron';
import {
  DELETE_FILE,
  DOES_PATH_EXISTS,
  GET_ALL_AUDIO_FILES,
  GET_AUDIO_FILES,
} from '../../../ipcEvents';
import doesPathExists from '../../ipcHandlers/application/doesPathExists';
import getAudioFiles from '../../ipcHandlers/application/getAudioFiles';
import deleteFile from '../../ipcHandlers/application/deleteFile';
import getAllAudioFiles from '../../ipcHandlers/application/getAllAudioFiles';

const registerApplicationEvents = (ipcMain: IpcMain) => {
  ipcMain.on(DOES_PATH_EXISTS, doesPathExists);
  ipcMain.on(GET_AUDIO_FILES, getAudioFiles);
  ipcMain.on(DELETE_FILE, deleteFile);
  ipcMain.on(GET_ALL_AUDIO_FILES, getAllAudioFiles);
};

export default registerApplicationEvents;
