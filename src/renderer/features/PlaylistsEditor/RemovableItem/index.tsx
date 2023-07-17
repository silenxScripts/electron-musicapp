import { colors } from 'renderer/common/data/colors';
import { RemovableItemDataTypeDef } from '../types';
import styles from './styles.module.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTooltip from 'renderer/common/components/CustomTooltip';
import { useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';

type props = {
  data: RemovableItemDataTypeDef;
  actionCallback: (data: RemovableItemDataTypeDef) => void;
  refreshCallback: () => void;
  itemClickCallback?: () => void;
  selected?: boolean;
  cursorPointer?: boolean;
};

const RemovableItem = ({
  data,
  actionCallback,
  refreshCallback,
  itemClickCallback = () => {},
  selected = false,
  cursorPointer = false,
}: props) => {
  const tooltipSize = useSelector(
    (state: StoreStateTypeDef) => state.tooltipSize
  );

  const handleClick = () => {
    refreshCallback();
    actionCallback(data);
  };

  return (
    <div
      className={styles.item_wrapper}
      onClick={itemClickCallback}
      style={{
        cursor: cursorPointer ? 'pointer' : 'auto',
        background: selected ? colors.layerZero : colors.layerTwo,
      }}
    >
      <CustomTooltip
        title={!cursorPointer ? data.title : ''}
        tooltipSize={tooltipSize}
        placement="top"
      >
        <h4>{data.title}</h4>
      </CustomTooltip>
      <button onClick={handleClick}>
        <DeleteIcon sx={{ color: '#fff' }} />
      </button>
    </div>
  );
};

export default RemovableItem;
