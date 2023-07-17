import {
  SET_FOLDER_PLAYER_VOLUME,
  SET_PLAYLIST_PLAYER_VOLUME,
  SET_TOOLTIP_SIZE,
  SET_VIEW_PAGE_URL,
  TOGGLE_FOLDER_PLAYER_LOOP_FOLDER,
  TOGGLE_FOLDER_PLAYER_LOOP_ONE,
  TOGGLE_FOLDER_PLAYER_SHUFFLE,
  TOGGLE_PLAYLIST_PLAYER_LOOP_PLAYLIST,
  TOGGLE_PLAYLIST_PLAYER_LOOP_ONE,
  TOGGLE_PLAYLIST_PLAYER_SHUFFLE,
  TOGGLE_REMEMBER_VIEW,
  TOGGLE_SHOW_EXTRA_FEATURES,
} from '../actions/actionEvents';

type ActionTypeDef =
  | {
      type: typeof SET_TOOLTIP_SIZE;
      payload: {
        size: number;
      };
    }
  | {
      type: typeof TOGGLE_SHOW_EXTRA_FEATURES;
    }
  | {
      type: typeof TOGGLE_REMEMBER_VIEW;
    }
  | {
      type: typeof SET_VIEW_PAGE_URL;
      payload: {
        pageUrl: string;
      };
    }
  | {
      type: typeof SET_FOLDER_PLAYER_VOLUME;
      payload: {
        volume: number;
      };
    }
  | {
      type: typeof TOGGLE_FOLDER_PLAYER_LOOP_ONE;
    }
  | {
      type: typeof TOGGLE_FOLDER_PLAYER_LOOP_FOLDER;
    }
  | {
      type: typeof TOGGLE_FOLDER_PLAYER_SHUFFLE;
    }
  | {
      type: typeof SET_PLAYLIST_PLAYER_VOLUME;
      payload: {
        volume: number;
      };
    }
  | {
      type: typeof TOGGLE_PLAYLIST_PLAYER_LOOP_ONE;
    }
  | {
      type: typeof TOGGLE_PLAYLIST_PLAYER_LOOP_PLAYLIST;
    }
  | {
      type: typeof TOGGLE_PLAYLIST_PLAYER_SHUFFLE;
    };

export default ActionTypeDef;
