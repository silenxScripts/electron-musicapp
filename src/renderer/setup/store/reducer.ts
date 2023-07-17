import {
  SET_TOOLTIP_SIZE,
  TOGGLE_SHOW_EXTRA_FEATURES,
  TOGGLE_REMEMBER_VIEW,
  SET_VIEW_PAGE_URL,
  SET_FOLDER_PLAYER_VOLUME,
  TOGGLE_FOLDER_PLAYER_LOOP_ONE,
  TOGGLE_FOLDER_PLAYER_LOOP_FOLDER,
  TOGGLE_FOLDER_PLAYER_SHUFFLE,
  SET_PLAYLIST_PLAYER_VOLUME,
  TOGGLE_PLAYLIST_PLAYER_LOOP_ONE,
  TOGGLE_PLAYLIST_PLAYER_LOOP_PLAYLIST,
  TOGGLE_PLAYLIST_PLAYER_SHUFFLE,
} from './actions/actionEvents';
import ActionTypeDef from './types/actionTypeDef';
import StoreStateTypeDef from './types/storeStateTypeDef';

const initialStoreState: StoreStateTypeDef = {
  tooltipSize: 14,
  showExtraFeatures: false,
  rememberView: false,
  viewPageUrl: '/index.html',
  folderPlayer: {
    folderVolume: 50,
    loopOne: false,
    loopFolder: false,
    folderShuffle: false,
  },
  playlistPlayer: {
    playlistVolume: 50,
    loopOne: false,
    loopPlaylist: false,
    playlistShuffle: false,
  },
};

const reducer = (
  state: StoreStateTypeDef = initialStoreState,
  action: ActionTypeDef
) => {
  const { type } = action;

  switch (type) {
    case SET_TOOLTIP_SIZE:
      return {
        ...state,
        tooltipSize: action.payload.size,
      };
    case TOGGLE_SHOW_EXTRA_FEATURES:
      return {
        ...state,
        showExtraFeatures: !state.showExtraFeatures,
      };
    case TOGGLE_REMEMBER_VIEW:
      return {
        ...state,
        rememberView: !state.rememberView,
      };
    case SET_VIEW_PAGE_URL:
      return {
        ...state,
        viewPageUrl: action.payload.pageUrl,
      };
    case SET_FOLDER_PLAYER_VOLUME:
      return {
        ...state,
        folderPlayer: {
          ...state.folderPlayer,
          folderVolume: action.payload.volume,
        },
      };
    case TOGGLE_FOLDER_PLAYER_LOOP_ONE:
      const isLoopOneTrue = !state.folderPlayer.loopOne === true;
      if (isLoopOneTrue) {
        return {
          ...state,
          folderPlayer: {
            folderVolume: state.folderPlayer.folderVolume,
            folderShuffle: false,
            loopFolder: false,
            loopOne: !state.folderPlayer.loopOne,
          },
        };
      }
      return {
        ...state,
        folderPlayer: {
          ...state.folderPlayer,
          loopOne: !state.folderPlayer.loopOne,
        },
      };
    case TOGGLE_FOLDER_PLAYER_LOOP_FOLDER:
      const isLoopFolderTrue = !state.folderPlayer.loopFolder === true;
      if (isLoopFolderTrue) {
        return {
          ...state,
          folderPlayer: {
            folderVolume: state.folderPlayer.folderVolume,
            folderShuffle: false,
            loopOne: false,
            loopFolder: !state.folderPlayer.loopFolder,
          },
        };
      }
      return {
        ...state,
        folderPlayer: {
          ...state.folderPlayer,
          loopFolder: !state.folderPlayer.loopFolder,
        },
      };
    case TOGGLE_FOLDER_PLAYER_SHUFFLE:
      const isFolderShuffleTrue = !state.folderPlayer.folderShuffle === true;
      if (isFolderShuffleTrue) {
        return {
          ...state,
          folderPlayer: {
            folderVolume: state.folderPlayer.folderVolume,
            loopFolder: false,
            loopOne: false,
            folderShuffle: !state.folderPlayer.folderShuffle,
          },
        };
      }
      return {
        ...state,
        folderPlayer: {
          ...state.folderPlayer,
          folderShuffle: !state.folderPlayer.folderShuffle,
        },
      };
    case SET_PLAYLIST_PLAYER_VOLUME:
      return {
        ...state,
        playlistPlayer: {
          ...state.playlistPlayer,
          playlistVolume: action.payload.volume,
        },
      };
    case TOGGLE_PLAYLIST_PLAYER_LOOP_ONE:
      const isPlaylistLoopOneTrue = !state.playlistPlayer.loopOne === true;
      if (isPlaylistLoopOneTrue) {
        return {
          ...state,
          playlistPlayer: {
            playlistVolume: state.playlistPlayer.playlistVolume,
            loopPlaylist: false,
            playlistShuffle: false,
            loopOne: !state.playlistPlayer.loopOne,
          },
        };
      }
      return {
        ...state,
        playlistPlayer: {
          ...state.playlistPlayer,
          loopOne: !state.playlistPlayer.loopOne,
        },
      };
    case TOGGLE_PLAYLIST_PLAYER_LOOP_PLAYLIST:
      const isPlaylistLoopTrue = !state.playlistPlayer.loopPlaylist === true;
      if (isPlaylistLoopTrue) {
        return {
          ...state,
          playlistPlayer: {
            playlistVolume: state.playlistPlayer.playlistVolume,
            playlistShuffle: false,
            loopOne: false,
            loopPlaylist: !state.playlistPlayer.loopPlaylist,
          },
        };
      }
      return {
        ...state,
        playlistPlayer: {
          ...state.playlistPlayer,
          loopPlaylist: !state.playlistPlayer.loopPlaylist,
        },
      };
    case TOGGLE_PLAYLIST_PLAYER_SHUFFLE:
      const isPlaylistShuffleTrue =
        !state.playlistPlayer.playlistShuffle === true;
      if (isPlaylistShuffleTrue) {
        return {
          ...state,
          playlistPlayer: {
            playlistVolume: state.playlistPlayer.playlistVolume,
            loopOne: false,
            loopPlaylist: false,
            playlistShuffle: !state.playlistPlayer.playlistShuffle,
          },
        };
      }
      return {
        ...state,
        playlistPlayer: {
          ...state.playlistPlayer,
          playlistShuffle: !state.playlistPlayer.playlistShuffle,
        },
      };
    default:
      return state;
  }
};

export default reducer;
