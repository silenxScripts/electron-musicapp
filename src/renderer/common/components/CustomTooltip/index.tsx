import { ReactElement } from 'react';
import Tooltip from '@mui/material/Tooltip';

type Props = {
  tooltipSize: number;
  title: string;
  children: ReactElement<any, any>;
  placement: 'top' | 'bottom' | 'right' | 'left';
  open?: boolean;
};

const CustomTooltip = ({
  tooltipSize,
  title,
  children,
  placement,
  open = false,
}: Props) => {
  const toShow = title.length !== 0;

  return (
    <Tooltip
      title={toShow ? <h6 style={{ fontSize: tooltipSize }}>{title}</h6> : ''}
      placement={placement}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
