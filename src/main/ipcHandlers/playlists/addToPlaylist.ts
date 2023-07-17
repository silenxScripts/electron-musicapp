import { ADD_TO_PLAYLIST } from '../../../ipcEvents';
import fs from 'fs';
import { IpcMainEvent } from 'electron';
import useAssetsFolder from '../../utils/useAssetsFolder';

type AudioObjTypeDef = {
  fileTitle: string;
  filePath: string;
};

const addToPlaylist = (
  event: IpcMainEvent,
  playlistName: string,
  fileTitle: string,
  filePath: string
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
    data.playlists[playlistName].push({
      fileTitle: fileTitle,
      filePath: filePath,
    });
    fs.writeFileSync(configPath, JSON.stringify(data));
    event.reply(ADD_TO_PLAYLIST, 'success', data.playlists[playlistName]);
  } catch (error) {
    event.reply(ADD_TO_PLAYLIST, 'error', ['']);
  }
};

export default addToPlaylist;
