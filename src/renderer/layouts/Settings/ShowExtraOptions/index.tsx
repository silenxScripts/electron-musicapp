import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles.module.scss';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { colors } from 'renderer/common/data/colors';
import Replay30Icon from '@mui/icons-material/Replay30';
import Replay10Icon from '@mui/icons-material/Replay10';
import Replay5Icon from '@mui/icons-material/Replay5';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Forward5Icon from '@mui/icons-material/Forward5';
import Forward10Icon from '@mui/icons-material/Forward10';
import Forward30Icon from '@mui/icons-material/Forward30';
import { toggleShowExtraFeatures } from 'renderer/setup/store/actions';

const ShowExtraOptions = () => {
  const dispatch = useDispatch();
  const toShow = useSelector(
    (state: StoreStateTypeDef) => state.showExtraFeatures
  );

  const toggleToShow = () => {
    dispatch(toggleShowExtraFeatures());
  };

  return (
    <div className={styles.setting_box}>
      <div className={styles.setting_info}>
        <div className={styles.setting_header}>
          <h1>Show extra player options</h1>
          <button
            style={{
              background: toShow ? colors.accentOpposite : colors.accent,
            }}
            onClick={toggleToShow}
          >
            {toShow ? 'On' : 'Off'}
          </button>
        </div>
        <p>
          Shows more rewind and forward options in player for both folders and
          playlists.
        </p>
      </div>
      <div className={styles.setting_display}>
        {toShow !== false && (
          <>
            <Replay30Icon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
            <Replay10Icon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
          </>
        )}
        <Replay5Icon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
        <SkipPreviousIcon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
        <PlayCircleIcon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
        <SkipNextIcon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
        <Forward5Icon sx={{ color: colors.accentOpposite, fontSize: 30 }} />
        {toShow !== false && (
          <>
            <Forward10Icon
              sx={{ color: colors.accentOpposite, fontSize: 30 }}
            />
            <Forward30Icon
              sx={{ color: colors.accentOpposite, fontSize: 30 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ShowExtraOptions;
