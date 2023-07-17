import styles from './styles.module.scss';

type props = {
  title?: string;
  width?: string;
  padding?: Array<number>;
  callback?: () => void;
  style?: object;
};

const CustomButton = ({
  title = 'Default',
  width = '80%',
  padding = [5, 10],
  callback = () => {},
  style = {},
}: props) => {
  return (
    <button
      className={styles.button}
      style={{
        padding: `${padding[0]}px ${padding[1]}px`,
        width: width,
      }}
      onClick={callback}
    >
      {title}
    </button>
  );
};

export default CustomButton;
