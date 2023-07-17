import { AppContext } from 'renderer/setup/context';
import PlayerController from '../PlayerControler';
import PlaylistItem from './PlaylistItem';
import styles from './styles.module.scss';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';

type props = {
  songs: Array<{
    fileTitle: string;
    filePath: string;
  }>;
};

const PlaylistViewer = ({ songs }: props) => {
  const {
    playlistPlayerAudioPath,
    playlistPlayerLoading,
    setPlaylistPlayerAudioPath,
    setPlaylistPlayerLoading,
  } = useContext(AppContext);

  const toShowExtraFeatures = useSelector(
    (state: StoreStateTypeDef) => state.showExtraFeatures
  );

  const [externalFunctionTrigger, setExternalFunctionTrigger] = useState<
    'play-next' | 'play-prev' | 'random' | ''
  >('');

  useEffect(() => {
    let currentPlayingIndex = 0;
    let prevIndex = 0;
    songs.map((song) => {
      if (song.filePath !== playlistPlayerAudioPath) return;
      currentPlayingIndex = songs.indexOf(song);
    });
    if (externalFunctionTrigger === '') return;
    else if (externalFunctionTrigger === 'play-prev') {
      if (currentPlayingIndex === 0) {
        prevIndex = songs.length - 1;
        setPlaylistPlayerAudioPath(songs[prevIndex].filePath);
        return;
      }
      prevIndex = currentPlayingIndex - 1;
      setPlaylistPlayerAudioPath(songs[prevIndex].filePath);
      return;
    } else if (externalFunctionTrigger === 'play-next') {
      let currentPlayingIndex = 0;
      let nextIndex = 0;
      songs.map((song) => {
        if (song.filePath !== playlistPlayerAudioPath) return;
        currentPlayingIndex = songs.indexOf(song);
      });
      if (currentPlayingIndex === songs.length - 1) {
        nextIndex = 0;
        setPlaylistPlayerAudioPath(songs[nextIndex].filePath);
        return;
      }
      nextIndex = currentPlayingIndex + 1;
      setPlaylistPlayerAudioPath(songs[nextIndex].filePath);
      return;
    } else if (externalFunctionTrigger === 'random') {
      const randomGeneratedIndex = Math.floor(Math.random() * songs.length);
      setPlaylistPlayerAudioPath(songs[randomGeneratedIndex].filePath);
      return;
    }
  }, [externalFunctionTrigger]);

  return (
    <div className={styles.playlist_viewer_wrapper}>
      {songs.map((song, index) => (
        <PlaylistItem
          filePath={song.filePath}
          fileTitle={song.fileTitle}
          key={index}
        />
      ))}
      <div
        className={styles.audio_player_wrapper}
        style={{
          display: playlistPlayerAudioPath.length ? 'flex' : 'none',
          opacity: playlistPlayerLoading ? '.4' : '1',
        }}
      >
        <PlayerController
          playerType="playlist"
          path={playlistPlayerAudioPath}
          setPath={setPlaylistPlayerAudioPath}
          loading={playlistPlayerLoading}
          setLoading={setPlaylistPlayerLoading}
          toShowExtraFeatures={toShowExtraFeatures}
          setExternalFunctionTrigger={setExternalFunctionTrigger}
        />
      </div>
    </div>
  );
};

export default PlaylistViewer;
