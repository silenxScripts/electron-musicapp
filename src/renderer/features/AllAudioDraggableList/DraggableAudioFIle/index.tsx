import { useDrag } from 'react-dnd';
import styles from './styles.module.scss';
import { PLAYLIST_FILE_ITEM } from 'renderer/common/data/draggablesType';

type props = {
  filePath: string;
};

const DraggableAudioFile = ({ filePath }: props) => {
  const fullFileTitle = (() => {
    const filePathSplitList = filePath.split('\\');
    const lastIndex = filePathSplitList.length - 1;
    const fileTitle = filePathSplitList[lastIndex];
    return fileTitle;
  })();

  const [{ isDragging }, dragRef] = useDrag({
    type: PLAYLIST_FILE_ITEM,
    item: { fileTitle: fullFileTitle, filePath: filePath },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      className={styles.wrapper}
      style={{ opacity: isDragging ? '.4' : '1' }}
      ref={dragRef}
    >
      <h1>{fullFileTitle}</h1>
      <p>{filePath.replace('\\', ' -> ')}</p>
    </div>
  );
};

export default DraggableAudioFile;
