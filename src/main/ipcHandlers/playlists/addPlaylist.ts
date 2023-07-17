import { ADD_NEW_PLAYLIST } from '../../../ipcEvents';
import fs from 'fs';
import { IpcMainEvent } from 'electron';
import useAssetsFolder from '../../utils/useAssetsFolder';

const addPlaylist = (event: IpcMainEvent, playlistName: string) => {
  const getAssetPath = useAssetsFolder();
  const configPath = getAssetPath('/data/config.json');
  try {
    const rawData = fs.readFileSync(configPath);
    const stringData = rawData.toString();
    const data = JSON.parse(stringData);
    data.playlists[playlistName] = [];
    fs.writeFileSync(configPath, JSON.stringify(data));
    event.reply(ADD_NEW_PLAYLIST, 'success');
  } catch (error) {
    event.reply(ADD_NEW_PLAYLIST, 'error');
  }
};

export default addPlaylist;
