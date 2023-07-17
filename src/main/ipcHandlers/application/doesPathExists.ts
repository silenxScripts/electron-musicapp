import path from 'path';
import fs from 'fs';
import { IpcMainEvent } from 'electron';
import { DOES_PATH_EXISTS } from '../../../ipcEvents';

const doesPathExists = (event: IpcMainEvent, pathToCheck: string) => {
  const resolvedPath = path.resolve(pathToCheck);
  const doesPathExists = fs.existsSync(resolvedPath);
  event.reply(DOES_PATH_EXISTS, doesPathExists, pathToCheck);
};

export default doesPathExists;
