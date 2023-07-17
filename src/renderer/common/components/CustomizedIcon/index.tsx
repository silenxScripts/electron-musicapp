import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { colors } from 'renderer/common/data/colors';
import CustomTooltip from '../CustomTooltip';
import { useSelector } from 'react-redux';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';

type props = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  title: string;
  tooltipPlacement?: 'right' | 'left' | 'top' | 'bottom';
  size?: number;
  oppositeAccentIcon?: boolean;
  sx?: object;
  callback?: () => void;
};

const CustomizedIcon = ({
  icon: Icon,
  title,
  tooltipPlacement = 'right',
  size = 26,
  oppositeAccentIcon = false,
  sx = {},
  callback = () => {},
}: props) => {
  const tooltipSize = useSelector(
    (state: StoreStateTypeDef) => state.tooltipSize
  );

  return (
    <CustomTooltip
      title={title}
      placement={tooltipPlacement}
      tooltipSize={tooltipSize}
    >
      <Icon
        onClick={callback}
        sx={{
          color: oppositeAccentIcon ? colors.accentOpposite : colors.accent,
          fontSize: size,
          cursor: title !== '' ? 'pointer' : 'auto',
          ...sx,
        }}
      />
    </CustomTooltip>
  );
};

export default CustomizedIcon;
