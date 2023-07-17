import { AppContext } from 'renderer/setup/context';
import styles from './styles.module.scss';
import { useContext } from 'react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

type props = {
  fileTitle: string;
  filePath: string;
};

const PlaylistItem = ({ fileTitle, filePath }: props) => {
  const {
    playlistPlayerAudioPath,
    playlistPlayerLoading,
    setPlaylistPlayerAudioPath,
  } = useContext(AppContext);

  const isPlaying = playlistPlayerAudioPath === filePath;

  const handleItemClick = () => {
    if (playlistPlayerLoading) return;
    if (isPlaying) {
      setPlaylistPlayerAudioPath('');
      return;
    }
    setPlaylistPlayerAudioPath(filePath);
  };

  return (
    <div className={styles.playlist_item_wrapper} onClick={handleItemClick}>
      {!isPlaying ? (
        <CustomizedIcon
          title=""
          icon={PlayCircleIcon}
          oppositeAccentIcon={true}
        />
      ) : (
        <CustomizedIcon
          title=""
          icon={GraphicEqIcon}
          oppositeAccentIcon={true}
        />
      )}
      <h1>{fileTitle}</h1>
    </div>
  );
};

export default PlaylistItem;
