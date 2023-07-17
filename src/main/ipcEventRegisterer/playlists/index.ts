import { IpcMain } from 'electron';
import {
  ADD_NEW_PLAYLIST,
  ADD_TO_PLAYLIST,
  GET_ALL_PLAYLISTS,
  GET_PLAYLIST_ITEMS,
  REMOVE_FROM_PLAYLIST,
  REMOVE_PLAYLIST,
} from '../../../ipcEvents';
import addPlaylist from '../../ipcHandlers/playlists/addPlaylist';
import removePlaylist from '../../ipcHandlers/playlists/removePlaylist';
import addToPlaylist from '../../ipcHandlers/playlists/addToPlaylist';
import removeFromPlaylist from '../../ipcHandlers/playlists/removeFromPlaylist';
import getAllPlaylists from '../../ipcHandlers/playlists/getAllPlaylists';
import getPlaylistItems from '../../ipcHandlers/playlists/getPlaylistItems';

const registerPlaylistsEvents = (ipcMain: IpcMain) => {
  ipcMain.on(GET_ALL_PLAYLISTS, getAllPlaylists);
  ipcMain.on(ADD_NEW_PLAYLIST, addPlaylist);
  ipcMain.on(REMOVE_PLAYLIST, removePlaylist);
  ipcMain.on(ADD_TO_PLAYLIST, addToPlaylist);
  ipcMain.on(REMOVE_FROM_PLAYLIST, removeFromPlaylist);
  ipcMain.on(GET_PLAYLIST_ITEMS, getPlaylistItems);
};

export default registerPlaylistsEvents;
