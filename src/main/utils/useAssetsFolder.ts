import { app } from 'electron';
import path from 'path';

const useAssetsFolder = () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../../assets');

  return (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
};

export default useAssetsFolder;
