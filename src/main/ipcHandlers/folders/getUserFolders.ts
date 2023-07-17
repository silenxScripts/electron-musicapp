import { IpcMainEvent } from 'electron';
import fs from 'fs';
import { GET_USER_FOLDERS } from '../../../ipcEvents';
import useAssetsFolder from '../../utils/useAssetsFolder';

const getUserFolders = (event: IpcMainEvent) => {
  const getAssetPath = useAssetsFolder();
  const configPath = getAssetPath('/data/config.json');
  try {
    const rawBuffer = fs.readFileSync(configPath);
    const stringData = rawBuffer.toString();
    const data = JSON.parse(stringData);
    const userFolders = data.folders || [];
    event.reply(GET_USER_FOLDERS, userFolders);
  } catch (error) {
    event.reply(GET_USER_FOLDERS, ['error']);
  }
};

export default getUserFolders;
