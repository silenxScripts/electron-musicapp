import { AppContext } from 'renderer/setup/context';
import styles from './styles.module.scss';
import { useContext } from 'react';
import CustomButton from 'renderer/common/components/CustomButton';

const Alert = () => {
  const { setAlertState, alertState } = useContext(AppContext);

  return (
    <div
      className={styles.wrapper}
      style={{
        display: alertState.messages[0] !== '' ? 'flex' : 'none',
      }}
    >
      <div className={styles.prompt}>
        {/* <img src={alertState.mode} alt="X" /> */}
        {alertState.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
        <div className={styles.button_wrapper}>
          <CustomButton
            title="Close"
            width="fit-content"
            padding={[5, 20]}
            callback={() => {
              setAlertState({
                messages: [''],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
