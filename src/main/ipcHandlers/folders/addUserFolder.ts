import { BrowserWindow, IpcMainEvent, dialog } from 'electron';
import fs from 'fs';
import { ADD_USER_FOLDER } from '../../../ipcEvents';
import useAssetsFolder from '../../utils/useAssetsFolder';

const addUserFolder = (event: IpcMainEvent, mainWindow: BrowserWindow) => {
  dialog
    .showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    })
    .then((result) => {
      if (result.canceled) {
        return;
      }

      const folderPath = result.filePaths[0];
      const getAssestPath = useAssetsFolder();
      const configPath = getAssestPath('/data/config.json');
      try {
        const rawBuffer = fs.readFileSync(configPath);
        const stringDara = rawBuffer.toString();
        const data = JSON.parse(stringDara);
        if (data.folders.includes(folderPath)) {
          event.reply(ADD_USER_FOLDER, 'exists');
          return;
        }
        data.folders.push(folderPath);
        fs.writeFileSync(configPath, JSON.stringify(data));
        event.reply(ADD_USER_FOLDER, 'success');
      } catch (error) {
        event.reply(ADD_USER_FOLDER, 'error');
      }
    })
    .catch((err) => {
      event.reply(ADD_USER_FOLDER, 'error');
    });
};

export default addUserFolder;
