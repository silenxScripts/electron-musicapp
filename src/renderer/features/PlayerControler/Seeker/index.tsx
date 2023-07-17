import Slider from '@mui/material/Slider';
import styles from './styles.module.scss';
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';
import { useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import returnSecondsToTimeString from 'renderer/common/utils/returnSecondsToTimeString';
import { PlayerTypeTypeDef } from '../types';

type props = {
  playerRef: React.MutableRefObject<Tone.Player | null>;
  playerCount: number;
  setPlayerCount: React.Dispatch<React.SetStateAction<number>>;
  isSeeking: boolean;
  setIsSeeking: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  setExternalFunctionTrigger: React.Dispatch<
    React.SetStateAction<'' | 'play-next' | 'play-prev' | 'random'>
  >;
  playerType: PlayerTypeTypeDef;
};

const Seeker = ({
  playerRef,
  playerCount,
  setPlayerCount,
  isSeeking,
  setIsSeeking,
  setIsPlaying,
  duration,
  setExternalFunctionTrigger,
  playerType,
}: props) => {
  const toLoopOne = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.loopOne;
    else if (playerType === 'playlist') return state.playlistPlayer.loopOne;
    return false;
  });

  const toLoop = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.loopFolder;
    else if (playerType === 'playlist')
      return state.playlistPlayer.loopPlaylist;
    return false;
  });

  const toShuffle = useSelector((state: StoreStateTypeDef) => {
    if (playerType === 'folder') return state.folderPlayer.folderShuffle;
    else if (playerType === 'playlist')
      return state.playlistPlayer.playlistShuffle;
    return false;
  });

  const [timerValue, setTimerValue] = useState(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setIsSeeking(true);
    let updatedPlayerCount = newValue as number;
    if (playerRef.current) {
      playerRef.current.stop();
      playerRef.current.start(0, updatedPlayerCount);
      setTimerValue(updatedPlayerCount);
      setPlayerCount(updatedPlayerCount);
    }
  };

  useEffect(() => {
    if (!playerRef.current) return;
    if (playerCount > duration) {
      playerRef.current.stop();
      setTimerValue(0);
      setIsPlaying(false);
      setPlayerCount(0);
      if (toLoopOne) {
        playerRef.current.start();
        setIsPlaying(true);
        return;
      } else if (toLoop) {
        setExternalFunctionTrigger('play-next');
        return;
      } else if (toShuffle) {
        setExternalFunctionTrigger('random');
        return;
      }
      return;
    }
    if (isSeeking) return;
    setTimerValue(playerCount);
  }, [playerCount]);

  return (
    <div className={styles.seeker}>
      <h1>{returnSecondsToTimeString(timerValue)}</h1>
      <div className={styles.seeker_slider}>
        <Slider
          size="small"
          aria-label="Volume"
          value={timerValue}
          onChange={handleChange}
          onChangeCommitted={() => {
            setIsSeeking(false);
            setIsPlaying(true);
          }}
          min={0}
          max={duration}
          step={1}
          sx={{
            color: '#fff',
          }}
        />
      </div>
      <h1>{returnSecondsToTimeString(duration)}</h1>
    </div>
  );
};

export default Seeker;
