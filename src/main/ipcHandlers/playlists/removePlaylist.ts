import { REMOVE_PLAYLIST } from '../../../ipcEvents';
import fs from 'fs';
import { IpcMainEvent } from 'electron';
import useAssetsFolder from '../../utils/useAssetsFolder';

const removePlaylist = (event: IpcMainEvent, playlistName: string) => {
  const getAssetPath = useAssetsFolder();
  const configPath = getAssetPath('/data/config.json');
  try {
    const rawData = fs.readFileSync(configPath);
    const stringData = rawData.toString();
    const data = JSON.parse(stringData);
    delete data.playlists[playlistName];
    fs.writeFileSync(configPath, JSON.stringify(data));
    event.reply(REMOVE_PLAYLIST, 'success');
  } catch (error) {
    console.log(error);
    event.reply(REMOVE_PLAYLIST, 'error');
  }
};

export default removePlaylist;
