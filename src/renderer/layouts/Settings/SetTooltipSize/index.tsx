import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles.module.scss';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import { setTooltipSize } from 'renderer/setup/store/actions';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CustomTooltip from 'renderer/common/components/CustomTooltip';

const SetTooltipSize = () => {
  const dispatch = useDispatch();
  const tooltipSize = useSelector(
    (state: StoreStateTypeDef) => state.tooltipSize
  );

  const increase = () => {
    dispatch(setTooltipSize(tooltipSize + 1));
  };

  const decrease = () => {
    dispatch(setTooltipSize(tooltipSize - 1));
  };

  return (
    <div className={styles.setting_box}>
      <div className={styles.setting_info}>
        <div className={styles.setting_header}>
          <h1>Set tooltip size</h1>
          <div className={styles.counter}>
            <button onClick={increase}>
              <AddIcon sx={{ color: '#fff', fontSize: 16 }} />
            </button>
            <h1>{tooltipSize}px</h1>
            <button onClick={decrease}>
              <RemoveIcon sx={{ color: '#fff', fontSize: 16 }} />
            </button>
          </div>
        </div>
        <p>
          Choose the font size for tooltips in px, by default it is set to 14px
        </p>
      </div>
      <div className={styles.setting_display}>
        <CustomTooltip
          tooltipSize={tooltipSize}
          placement="right"
          title="Example tooltip"
          open={true}
        >
          <h1>Example</h1>
        </CustomTooltip>
      </div>
    </div>
  );
};

export default SetTooltipSize;
