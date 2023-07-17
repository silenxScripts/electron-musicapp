type StoreStateTypeDef = {
  tooltipSize: number;
  showExtraFeatures: boolean;
  rememberView: boolean;
  viewPageUrl: string;
  folderPlayer: {
    folderVolume: number;
    loopOne: boolean;
    loopFolder: boolean;
    folderShuffle: boolean;
  };
  playlistPlayer: {
    playlistVolume: number;
    loopOne: boolean;
    loopPlaylist: boolean;
    playlistShuffle: boolean;
  };
};

export default StoreStateTypeDef;
