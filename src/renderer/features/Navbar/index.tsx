import CustomizedIcon from 'renderer/common/components/CustomizedIcon';
import styles from './styles.module.scss';
import { NavLinksData } from './navLinksData';
import { useNavigate } from 'react-router-dom';
import logo from 'renderer/common/assets/logo.png';

const Navbar = ({ path }: { path: string }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_logo}>
        <img src={logo} alt="X" />
      </div>
      <div className={styles.nav_links}>
        {NavLinksData.map((navLink, index) => (
          <div
            className={styles.nav_link}
            key={index}
            onClick={() => {
              navigate(`${path}/${navLink.link}`);
            }}
          >
            <CustomizedIcon
              title={navLink.title}
              icon={navLink.icon}
              tooltipPlacement="right"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
