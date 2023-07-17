import styles from './styles.module.scss';
import ToggleButtons from './ToggleButtons';
import MainControls from './MainControls';
import VolumeControl from './VolumeControl';
import Seeker from './Seeker';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { LOAD_AUDIO_FILE } from 'ipcEvents';
import * as Tone from 'tone';
import { AppContext } from 'renderer/setup/context';
import { PlayerTypeTypeDef } from './types';

type props = {
  toShowExtraFeatures: boolean;
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setExternalFunctionTrigger: React.Dispatch<
    React.SetStateAction<'' | 'play-next' | 'play-prev' | 'random'>
  >;
  playerType: PlayerTypeTypeDef;
};

const PlayerController = ({
  toShowExtraFeatures,
  path,
  setPath,
  loading,
  setLoading,
  setExternalFunctionTrigger,
  playerType,
}: props) => {
  const { setAlertState } = useContext(AppContext);

  const [duration, setDuration] = useState(0);
  const playerRef = useRef<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerCount, setPlayerCount] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const loadAudioBufferArray = () => {
    window.electron.ipcRenderer.sendMessage(LOAD_AUDIO_FILE, path);
  };

  // UseEffect responsible for loading the audio file and setting up the player
  useEffect(() => {
    if (!path.length) return;
    setLoading(true);
    loadAudioBufferArray();
    setPlayerCount(0);
    setIsPlaying(false);
    window.electron.ipcRenderer.on(
      LOAD_AUDIO_FILE,
      (status, bufferArray, duration) => {
        if (playerRef.current) {
          playerRef.current.dispose();
        }

        if (typeof status !== typeof '') return;
        if (status === 'error') {
          setPath('');
          setLoading(false);
          setAlertState({
            messages: [
              'Something went wrong whilst trying to load audio file...',
              ' 1. Check if the file exists.',
              ' 2. Check if the audio file is a valid audio.',
            ],
          });
          return;
        }

        const audioBufferArray = bufferArray as ArrayBuffer;
        const audioDuration = duration as number;

        const createPlayerRefrence = async () => {
          try {
            const decodedBuffer = await Tone.context.decodeAudioData(
              audioBufferArray
            );
            const playerObj = new Tone.Player(decodedBuffer).toDestination();
            playerRef.current = playerObj;
            setDuration(Math.round(audioDuration));
            playerRef.current.start();
            setIsPlaying(true);
            setLoading(false);
          } catch (error) {
            setAlertState({
              messages: [
                "There's been a problem loading the file.",
                'Try again or check if file is corrupted.',
              ],
            });
            setPath('');
            setLoading(false);
          }
        };

        (async () => await createPlayerRefrence())(); //IIFE
      }
    );

    return () => {
      if (!playerRef.current) return;
      if (playerRef.current.state === 'started') {
        playerRef.current.stop();
      }
      playerRef.current.dispose();
      window.electron.ipcRenderer.removeAllListeners(LOAD_AUDIO_FILE);
    };
  }, [path]);

  // UseEffect responsible for updating playerCounter every 1 second given it is playing.
  useEffect(() => {
    const playerCountInterval = setInterval(() => {
      if (isPlaying) {
        setPlayerCount((currentCount) => currentCount + 1);
      }
    }, 1000);
    return () => {
      clearInterval(playerCountInterval);
    };
  }, [isPlaying]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.player}>
        <div className={styles.controller}>
          <ToggleButtons playerType={playerType} />
          <MainControls
            toShowExtraFeatures={toShowExtraFeatures}
            loading={loading}
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            playerRef={playerRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            duration={duration}
            setExternalFunctionTrigger={setExternalFunctionTrigger}
          />
          <VolumeControl playerRef={playerRef} playerType={playerType} />
        </div>
        <Seeker
          duration={duration}
          isSeeking={isSeeking}
          setIsSeeking={setIsSeeking}
          playerCount={playerCount}
          playerRef={playerRef}
          setIsPlaying={setIsPlaying}
          setPlayerCount={setPlayerCount}
          setExternalFunctionTrigger={setExternalFunctionTrigger}
          playerType={playerType}
        />
      </div>
    </div>
  );
};

export default PlayerController;
