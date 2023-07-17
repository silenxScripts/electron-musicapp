import {
  SET_TOOLTIP_SIZE,
  SET_VIEW_PAGE_URL,
  TOGGLE_REMEMBER_VIEW,
  TOGGLE_SHOW_EXTRA_FEATURES,
  SET_FOLDER_PLAYER_VOLUME,
  TOGGLE_FOLDER_PLAYER_LOOP_ONE,
  TOGGLE_FOLDER_PLAYER_LOOP_FOLDER,
  TOGGLE_FOLDER_PLAYER_SHUFFLE,
  SET_PLAYLIST_PLAYER_VOLUME,
  TOGGLE_PLAYLIST_PLAYER_LOOP_ONE,
  TOGGLE_PLAYLIST_PLAYER_LOOP_PLAYLIST,
  TOGGLE_PLAYLIST_PLAYER_SHUFFLE,
} from './actionEvents';

const setTooltipSize = (sizeInPx: number) => ({
  type: SET_TOOLTIP_SIZE,
  payload: {
    size: sizeInPx,
  },
});

const toggleShowExtraFeatures = () => ({
  type: TOGGLE_SHOW_EXTRA_FEATURES,
});

const toggleRememberView = () => ({
  type: TOGGLE_REMEMBER_VIEW,
});

const setViewPageUrl = (url: string) => ({
  type: SET_VIEW_PAGE_URL,
  payload: {
    pageUrl: url,
  },
});

const setFolderPlayerVolume = (volume: number) => ({
  type: SET_FOLDER_PLAYER_VOLUME,
  payload: {
    volume,
  },
});

const toggleFolderPlayerLoopOne = () => ({
  type: TOGGLE_FOLDER_PLAYER_LOOP_ONE,
});

const toggleFolderPlayerLoopFolder = () => ({
  type: TOGGLE_FOLDER_PLAYER_LOOP_FOLDER,
});

const toggleFolderPlayerShuffle = () => ({
  type: TOGGLE_FOLDER_PLAYER_SHUFFLE,
});

const setPlaylistPlayerVolume = (volume: number) => ({
  type: SET_PLAYLIST_PLAYER_VOLUME,
  payload: {
    volume,
  },
});

const togglePlaylistPlayerLoopOne = () => ({
  type: TOGGLE_PLAYLIST_PLAYER_LOOP_ONE,
});

const togglePlaylistPlayerLoopPlaylist = () => ({
  type: TOGGLE_PLAYLIST_PLAYER_LOOP_PLAYLIST,
});

const togglePlaylistPlayerShuffle = () => ({
  type: TOGGLE_PLAYLIST_PLAYER_SHUFFLE,
});

export {
  setTooltipSize,
  toggleShowExtraFeatures,
  toggleRememberView,
  setViewPageUrl,
  setFolderPlayerVolume,
  toggleFolderPlayerLoopOne,
  toggleFolderPlayerLoopFolder,
  toggleFolderPlayerShuffle,
  setPlaylistPlayerVolume,
  togglePlaylistPlayerLoopOne,
  togglePlaylistPlayerLoopPlaylist,
  togglePlaylistPlayerShuffle,
};
