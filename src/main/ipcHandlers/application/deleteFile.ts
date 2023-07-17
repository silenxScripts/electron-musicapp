import { IpcMainEvent } from 'electron';
import path from 'path';
import fs from 'fs';
import { DELETE_FILE } from '../../../ipcEvents';

const deleteFile = (event: IpcMainEvent, filePath: string) => {
  const resolvedFilePath = path.resolve(filePath);
  fs.unlink(resolvedFilePath, (err) => {
    if (err) {
      event.reply(DELETE_FILE, 'error', [
        'An error occured!',
        "File couldn't be deleted!",
      ]);
    }
  });
};

export default deleteFile;
