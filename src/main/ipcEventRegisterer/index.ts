import { IpcMain } from 'electron';
import registerFoldersEvents from './folders';
import registerApplicationEvents from './application';
import registerPlayerEvents from './player';
import registerPlaylistsEvents from './playlists';

const registerAllEvents = (ipcMain: IpcMain) => {
  registerFoldersEvents(ipcMain);
  registerApplicationEvents(ipcMain);
  registerPlayerEvents(ipcMain);
  registerPlaylistsEvents(ipcMain);
};

export default registerAllEvents;
