import { IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
import useAssetsFolder from '../../utils/useAssetsFolder';
import { REMOVE_USER_FOLDER } from '../../../ipcEvents';

const removeUserFolder = (event: IpcMainEvent, folderPath: string) => {
  const resolvedFolderPath = path.resolve(folderPath);
  const getAssestPath = useAssetsFolder();
  const configPath = getAssestPath('/data/config.json');
  try {
    const rawBuffer = fs.readFileSync(configPath);
    const stringDara = rawBuffer.toString();
    const data = JSON.parse(stringDara);
    const newLiteFolderList = data.folders.filter(
      (item: string) => item !== resolvedFolderPath
    );
    data.folders = newLiteFolderList;
    fs.writeFileSync(configPath, JSON.stringify(data));
    event.reply(REMOVE_USER_FOLDER, 'success', folderPath);
  } catch (error) {
    event.reply(REMOVE_USER_FOLDER, 'error', folderPath);
  }
};
export default removeUserFolder;
