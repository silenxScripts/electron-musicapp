import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles.module.scss';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { colors } from 'renderer/common/data/colors';
import { toggleRememberView } from 'renderer/setup/store/actions';

const RememberLastPage = () => {
  const dispatch = useDispatch();
  const toRemember = useSelector(
    (state: StoreStateTypeDef) => state.rememberView
  );

  const toggleToRemember = () => {
    dispatch(toggleRememberView());
  };

  return (
    <div className={styles.setting_box}>
      <div className={styles.setting_info}>
        <div className={styles.setting_header}>
          <h1>To remember last screen</h1>
          <button
            style={{
              background: toRemember ? colors.accentOpposite : colors.accent,
            }}
            onClick={toggleToRemember}
          >
            {toRemember ? 'On' : 'Off'}
          </button>
        </div>
        <p>If turned on, application will open at last screen closed</p>
      </div>
      <div className={styles.setting_display}></div>
    </div>
  );
};

export default RememberLastPage;
