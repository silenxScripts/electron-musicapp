import { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import styles from './styles.module.scss';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import * as Tone from 'tone';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFolderPlayerVolume,
  setPlaylistPlayerVolume,
} from 'renderer/setup/store/actions';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { PlayerTypeTypeDef } from '../types';

type props = {
  playerRef: React.MutableRefObject<Tone.Player | null>;
  playerType: PlayerTypeTypeDef;
};

const VolumeControl = ({ playerRef, playerType }: props) => {
  const dispatch = useDispatch();
  const volume = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.folderVolume;
    else if (playerType === 'playlist')
      return state.playlistPlayer.playlistVolume;
    return 100;
  });

  const [volumeValue, setVolumeValue] = useState(volume);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolumeValue(newValue as number);
    if (playerRef.current) {
      const volumeValue = (newValue as number) / 100;
      playerRef.current.volume.value = Tone.gainToDb(volumeValue);
      if (playerType === 'folder') {
        dispatch(setFolderPlayerVolume(newValue as number));
      } else if (playerType === 'playlist') {
        dispatch(setPlaylistPlayerVolume(newValue as number));
      }
    }
  };

  return (
    <div className={styles.volume_control}>
      <Stack
        spacing={2}
        direction="row"
        sx={{ width: '100%' }}
        alignItems="center"
      >
        <Slider
          size="small"
          aria-label="Volume"
          value={volumeValue}
          onChange={handleChange}
          min={0}
          max={100}
          step={10}
        />
        <CustomizedIcon
          icon={
            volumeValue >= 50
              ? VolumeUp
              : volumeValue === 0
              ? VolumeOffIcon
              : VolumeDown
          }
          title=""
        />
      </Stack>
    </div>
  );
};

export default VolumeControl;
