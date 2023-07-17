import styles from './styles.module.scss';

const IdleMenu = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.animation_wrapper}>
        {[1, 2, 3, 4, 5].map((value, index) => (
          <div
            key={index}
            className={styles.circle}
            style={{ animationDuration: `${value}0s` }}
          />
        ))}
      </div>
      <div className={styles.animation_wrapper_right}>
        {[1, 2, 3, 4, 5].map((value, index) => (
          <div
            key={index}
            className={styles.circle}
            style={{ animationDuration: `${value}0s` }}
          />
        ))}
      </div>
      <div className={styles.animation_wrapper_left}>
        {[1, 2, 3, 4, 5].map((value, index) => (
          <div
            key={index}
            className={styles.circle}
            style={{ animationDuration: `${value}0s` }}
          />
        ))}
      </div>
      <h5>No audio file selected.</h5>
    </div>
  );
};

export default IdleMenu;
