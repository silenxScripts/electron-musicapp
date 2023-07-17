import { useContext } from 'react';
import styles from './styles.module.scss';
import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import { AppContext } from 'renderer/setup/context';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import AlbumIcon from '@mui/icons-material/Album';
import getTitleFromPath from 'renderer/common/utils/getTitleFromPath';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import StoreStateTypeDef from 'renderer/setup/store/types/storeStateTypeDef';
import CustomTooltip from 'renderer/common/components/CustomTooltip';
import { FILE_ITEM } from 'renderer/common/data/draggablesType';

type props = {
  filePath: string;
  handleClick: (filePath: string) => void;
};

const FileItem = ({ filePath, handleClick }: props) => {
  const fileTitle = getTitleFromPath(filePath);
  const tooltipTitle = (() => {
    const pathSplitList = filePath.split('\\');
    const lastIndex = pathSplitList.length - 1;
    const title = pathSplitList[lastIndex];
    return title;
  })();

  const tooltipSize = useSelector(
    (state: StoreStateTypeDef) => state.tooltipSize
  );
  const { folderPlayerAudioPath } = useContext(AppContext);

  const isActive = folderPlayerAudioPath === filePath;

  const [{ isDragging }, dragRef] = useDrag({
    type: FILE_ITEM,
    item: { filePath: filePath },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <CustomTooltip
      title={tooltipTitle}
      placement="right"
      tooltipSize={tooltipSize}
    >
      <div
        ref={dragRef}
        style={{
          opacity: isDragging ? '.4' : '1',
        }}
        className={styles.file_item}
        onClick={() => handleClick(filePath)}
      >
        <span />
        <CustomizedIcon
          title=""
          icon={isActive ? SlowMotionVideoIcon : AlbumIcon}
          oppositeAccentIcon={true}
          sx={{
            zIndex: 2,
          }}
        />
        <h1>{fileTitle}</h1>
      </div>
    </CustomTooltip>
  );
};

export default FileItem;
