import styles from './styles.module.scss';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import Replay30Icon from '@mui/icons-material/Replay30';
import Replay10Icon from '@mui/icons-material/Replay10';
import Replay5Icon from '@mui/icons-material/Replay5';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Forward5Icon from '@mui/icons-material/Forward5';
import Forward10Icon from '@mui/icons-material/Forward10';
import Forward30Icon from '@mui/icons-material/Forward30';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import * as Tone from 'tone';

type props = {
  toShowExtraFeatures: boolean;
  loading: boolean;
  playerRef: React.MutableRefObject<Tone.Player | null>;
  playerCount: number;
  setPlayerCount: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  duration: number;
  setExternalFunctionTrigger: React.Dispatch<
    React.SetStateAction<'' | 'play-next' | 'play-prev' | 'random'>
  >;
};

const MainControls = ({
  toShowExtraFeatures,
  loading,
  playerRef,
  playerCount,
  setPlayerCount,
  isPlaying,
  setIsPlaying,
  duration,
  setExternalFunctionTrigger,
}: props) => {
  const handleAudioPause = () => {
    if (loading) return;
    if (playerRef.current) {
      playerRef.current.stop();
      setIsPlaying(false);
    }
  };

  const handleAudioPlay = () => {
    if (loading) return;
    if (playerRef.current) {
      playerRef.current.start(0, playerCount);
      setIsPlaying(true);
    }
  };

  const skipOrRewindInTime = (toSkip: boolean, timeInSeconds: number) => {
    if (loading) return;
    setIsPlaying(true);
    if (!playerRef.current) return;
    let newPlayerCount = 0;
    playerRef.current.stop(0);
    if (toSkip) {
      if (playerCount + timeInSeconds >= duration) {
        setPlayerCount(0);
        playerRef.current.start(0, 0);
        return;
      }
      setPlayerCount((currentPlayerCount) => {
        newPlayerCount = currentPlayerCount + timeInSeconds;
        return newPlayerCount;
      });
      playerRef.current.start(0, newPlayerCount);
      return;
    }
    if (playerCount - timeInSeconds <= 0) {
      setPlayerCount(0);
      playerRef.current.start(0, 0);
      return;
    }
    setPlayerCount((currentPlayerCount) => {
      newPlayerCount = currentPlayerCount - timeInSeconds;
      return newPlayerCount;
    });
    playerRef.current.start(0, newPlayerCount);
  };

  const handlePrevAudio = () => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    setExternalFunctionTrigger('play-prev');
  };

  const handleNextAudio = () => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    setExternalFunctionTrigger('play-next');
  };

  return (
    <div
      className={styles.main_controls}
      style={{
        pointerEvents: loading ? 'none' : 'all',
      }}
    >
      {toShowExtraFeatures !== false && (
        <>
          <MainControlIcons
            title="Rewind 30s"
            icon={Replay30Icon}
            callback={() => skipOrRewindInTime(false, 30)}
          />
          <MainControlIcons
            title="Rewind 10s"
            icon={Replay10Icon}
            callback={() => skipOrRewindInTime(false, 10)}
          />
        </>
      )}
      <MainControlIcons
        title="Rewind 5s"
        icon={Replay5Icon}
        callback={() => skipOrRewindInTime(false, 5)}
      />
      <MainControlIcons
        title="Prev audio"
        icon={SkipPreviousIcon}
        callback={handlePrevAudio}
      />
      {isPlaying !== false ? (
        <MainControlIcons
          title=""
          main={true}
          icon={PauseCircleFilledIcon}
          callback={handleAudioPause}
        />
      ) : (
        <MainControlIcons
          title=""
          main={true}
          icon={PlayCircleIcon}
          callback={handleAudioPlay}
        />
      )}
      <MainControlIcons
        title="Next audio"
        icon={SkipNextIcon}
        callback={handleNextAudio}
      />
      <MainControlIcons
        title="Skip 5s"
        icon={Forward5Icon}
        callback={() => skipOrRewindInTime(true, 5)}
      />
      {toShowExtraFeatures !== false && (
        <>
          <MainControlIcons
            title="Skip 10s"
            icon={Forward10Icon}
            callback={() => skipOrRewindInTime(true, 10)}
          />
          <MainControlIcons
            title="Skip 30s"
            icon={Forward30Icon}
            callback={() => skipOrRewindInTime(true, 30)}
          />
        </>
      )}
    </div>
  );
};

export default MainControls;

type mainControlIconProps = {
  main?: boolean;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  title: string;
  callback?: () => void;
};

const MainControlIcons = ({
  main = false,
  icon: Icon,
  title,
  callback = () => {},
}: mainControlIconProps) => {
  return (
    <CustomizedIcon
      oppositeAccentIcon={true}
      tooltipPlacement="top"
      size={main ? 36 : 28}
      title={title}
      icon={Icon}
      callback={callback}
      sx={{
        marginRight: '2px',
      }}
    />
  );
};
