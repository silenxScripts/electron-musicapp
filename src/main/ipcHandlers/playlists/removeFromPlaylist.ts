import { REMOVE_FROM_PLAYLIST } from '../../../ipcEvents';
import fs from 'fs';
import { IpcMainEvent } from 'electron';
import useAssetsFolder from '../../utils/useAssetsFolder';

type AudioObjTypeDef = {
  fileTitle: string;
  filePath: string;
};

const removeFromPlaylist = (
  event: IpcMainEvent,
  playlistName: string,
  fileTitle: string
) => {
  const getAssetPath = useAssetsFolder();
  const configPath = getAssetPath('/data/config.json');
  try {
    const rawData = fs.readFileSync(configPath);
    const stringData = rawData.toString();
    const data = JSON.parse(stringData);
    data.playlists[playlistName] = data.playlists[playlistName].filter(
      (audioObj: AudioObjTypeDef) => audioObj.fileTitle !== fileTitle
    );
    fs.writeFileSync(configPath, JSON.stringify(data));
    event.reply(REMOVE_FROM_PLAYLIST, 'success', data.playlists[playlistName]);
  } catch (error) {
    console.log(error);
    event.reply(REMOVE_FROM_PLAYLIST, 'error', ['']);
  }
};

export default removeFromPlaylist;
