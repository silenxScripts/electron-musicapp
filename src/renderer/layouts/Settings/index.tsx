import styles from './styles.module.scss';
import ShowExtraOptions from './ShowExtraOptions';
import SetTooltipSize from './SetTooltipSize';
import RememberLastPage from './RememberLastPage';

const Settings = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>Settings</h1>
      </div>
      <ShowExtraOptions />
      <hr />
      <SetTooltipSize />
      <hr />
      <RememberLastPage />
    </div>
  );
};

export default Settings;
