import { useContext } from 'react';
import styles from './styles.module.scss';
import { AppContext } from 'renderer/setup/context';
import CustomButton from 'renderer/common/components/CustomButton';

const Choices = () => {
  const { choicesState, setChoicesState } = useContext(AppContext);

  return (
    <div
      className={styles.wrapper}
      style={{
        display: choicesState.message.length ? 'flex' : 'none',
      }}
    >
      <div className={styles.prompt}>
        <h1>{choicesState.message}</h1>
        <div className={styles.choices_group}>
          {choicesState.choices.map((choice, index) => (
            <CustomButton
              key={index}
              title={choice}
              width="40%"
              callback={() => {
                choicesState.callback(choice);
                setChoicesState({
                  message: '',
                  choices: ['Yes', 'No'],
                  callback: () => {},
                });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Choices;
