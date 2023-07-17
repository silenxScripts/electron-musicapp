import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import styles from './styles.module.scss';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useDispatch, useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { colors } from 'renderer/common/data/colors';
import {
  toggleFolderPlayerLoopFolder,
  toggleFolderPlayerLoopOne,
  toggleFolderPlayerShuffle,
  togglePlaylistPlayerLoopOne,
  togglePlaylistPlayerLoopPlaylist,
  togglePlaylistPlayerShuffle,
} from 'renderer/setup/store/actions';
import { PlayerTypeTypeDef } from '../types';

type props = {
  playerType: PlayerTypeTypeDef;
};

const ToggleButtons = ({ playerType }: props) => {
  const dispatch = useDispatch();

  const toShuffle = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.folderShuffle;
    else if (playerType === 'playlist')
      return state.playlistPlayer.playlistShuffle;
    return false;
  });

  const toLoop = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.loopFolder;
    else if (playerType === 'playlist')
      return state.playlistPlayer.loopPlaylist;
    return false;
  });

  const toLoopOne = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.loopOne;
    else if (playerType === 'playlist') return state.playlistPlayer.loopOne;
    return false;
  });

  return (
    <div className={styles.toggle_button_group}>
      <div
        className={styles.toggle_button}
        style={{
          backgroundColor: toLoop ? colors.accentOpposite : colors.accent,
        }}
      >
        <CustomizedIcon
          title={`Loop current ${playerType}`}
          tooltipPlacement="top"
          icon={RepeatIcon}
          size={20}
          sx={{
            color: '#fff',
          }}
          callback={() => {
            if (playerType === 'folder') {
              dispatch(toggleFolderPlayerLoopFolder());
            } else if (playerType === 'playlist') {
              dispatch(togglePlaylistPlayerLoopPlaylist());
            }
          }}
        />
      </div>
      <div
        className={styles.toggle_button}
        style={{
          backgroundColor: toLoopOne ? colors.accentOpposite : colors.accent,
        }}
      >
        <CustomizedIcon
          title="Loop current audio"
          tooltipPlacement="top"
          icon={RepeatOneIcon}
          size={20}
          sx={{
            color: '#fff',
          }}
          callback={() => {
            if (playerType === 'folder') {
              dispatch(toggleFolderPlayerLoopOne());
            } else if (playerType === 'playlist') {
              dispatch(togglePlaylistPlayerLoopOne());
            }
          }}
        />
      </div>
      <div
        className={styles.toggle_button}
        style={{
          backgroundColor: toShuffle ? colors.accentOpposite : colors.accent,
        }}
      >
        <CustomizedIcon
          title="Shuffle current folder"
          tooltipPlacement="top"
          icon={ShuffleIcon}
          size={20}
          sx={{
            color: '#fff',
          }}
          callback={() => {
            if (playerType === 'folder') {
              dispatch(toggleFolderPlayerShuffle());
            } else if (playerType === 'playlist') {
              dispatch(togglePlaylistPlayerShuffle());
            }
          }}
        />
      </div>
    </div>
  );
};

export default ToggleButtons;
