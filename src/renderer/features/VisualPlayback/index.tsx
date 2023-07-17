import styles from './styles.module.scss';
import cd from './images/cd.png';
import pointer from './images/pointer.png';

type props = {
  size: string;
  active: boolean;
  title: string;
};

const VisualPlayback = ({ size, active, title }: props) => {
  return (
    <div className={styles.wrapper}>
      <h1>{title}</h1>
      <div
        className={styles.player}
        style={{
          width: size,
          height: size,
        }}
      >
        <img
          src={cd}
          alt="cd"
          className={`${styles.cd} ${active && styles.rotate_cd}`}
        />
        <img
          src={pointer}
          alt="pointer"
          className={styles.pointer}
          style={{
            transform: active ? `rotateZ(50deg)` : `rotateZ(0deg)`,
          }}
        />
      </div>
    </div>
  );
};

export default VisualPlayback;
