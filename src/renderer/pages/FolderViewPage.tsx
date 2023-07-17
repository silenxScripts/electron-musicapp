import FolderExplorer from 'renderer/features/FolderExplorer';
import IdleMenu from 'renderer/layouts/FolderAudioPlayer/IdleMenu';
import { AppContext } from 'renderer/setup/context';
import { useContext } from 'react';
import FolderAudioPlayer from 'renderer/layouts/FolderAudioPlayer';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setViewPageUrl } from 'renderer/setup/store/actions';

const FolderViewPage = () => {
  const dispatch = useDispatch();
  const { folderPlayerAudioPath } = useContext(AppContext);

  useEffect(() => {
    dispatch(setViewPageUrl('/index.html'));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
      }}
    >
      <FolderExplorer />
      <div
        style={{
          flex: 1,
          position: 'relative',
        }}
      >
        {folderPlayerAudioPath.length !== 0 ? (
          <FolderAudioPlayer />
        ) : (
          <IdleMenu />
        )}
      </div>
    </div>
  );
};

export default FolderViewPage;
