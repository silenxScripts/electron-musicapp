import { GET_ALL_PLAYLISTS } from '../../../ipcEvents';
import fs from 'fs';
import { IpcMainEvent } from 'electron';
import useAssetsFolder from '../../utils/useAssetsFolder';

const getAllPlaylists = (event: IpcMainEvent) => {
  const getAssetPath = useAssetsFolder();
  const configPath = getAssetPath('/data/config.json');
  try {
    const rawData = fs.readFileSync(configPath);
    const stringData = rawData.toString();
    const data = JSON.parse(stringData);
    const playlists = Object.keys(data.playlists);
    event.reply(GET_ALL_PLAYLISTS, 'success', playlists);
  } catch (error) {
    event.reply(GET_ALL_PLAYLISTS, 'error', ['']);
  }
};

export default getAllPlaylists;
