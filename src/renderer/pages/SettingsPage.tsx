import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setViewPageUrl } from 'renderer/setup/store/actions';
import Settings from 'renderer/layouts/Settings';

const SettingsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setViewPageUrl('/index.html/settings'));
  }, []);

  return <Settings />;
};

export default SettingsPage;
