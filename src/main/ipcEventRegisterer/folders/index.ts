import { IpcMain, IpcMainEvent } from 'electron';
import {
  ADD_USER_FOLDER,
  GET_USER_FOLDERS,
  REMOVE_USER_FOLDER,
} from '../../../ipcEvents';
import getUserFolders from '../../ipcHandlers/folders/getUserFolders';
import removeUserFolder from '../../ipcHandlers/folders/removeUserFolder';
import addUserFolder from '../../ipcHandlers/folders/addUserFolder';
import Main from '../../main';

const registerFoldersEvents = (ipcMain: IpcMain) => {
  ipcMain.on(GET_USER_FOLDERS, getUserFolders);
  ipcMain.on(REMOVE_USER_FOLDER, removeUserFolder);
  ipcMain.on(ADD_USER_FOLDER, (event: IpcMainEvent) => {
    // For some reason Main.mainWindow always comes out to be null, even if the window is open and a valid BrowserWindow instance
    // Remove the @ts-ignore after looking into the problem
    //@ts-ignore
    addUserFolder(event, Main.mainWindow);
  });
};

export default registerFoldersEvents;
