import { IpcMainEvent } from 'electron';
import useAssetsFolder from '../../utils/useAssetsFolder';
import fs from 'fs';
import { GET_PLAYLIST_ITEMS } from '../../../ipcEvents';

const getPlaylistItems = (event: IpcMainEvent, playlistName: string) => {
  const getAssetPath = useAssetsFolder();
  const configPath = getAssetPath('/data/config.json');
  try {
    const rawData = fs.readFileSync(configPath);
    const stringData = rawData.toString();
    const data = JSON.parse(stringData);
    const playlistItems = data.playlists[playlistName];
    event.reply(GET_PLAYLIST_ITEMS, 'success', playlistItems);
  } catch (error) {
    event.reply(GET_PLAYLIST_ITEMS, 'error', ['']);
  }
};

export default getPlaylistItems;
