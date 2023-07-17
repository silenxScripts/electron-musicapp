import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setViewPageUrl } from 'renderer/setup/store/actions';
import PlaylistManager from 'renderer/layouts/PlaylistManager';
import PlaylistPageNavbar from 'renderer/features/PlaylistPageNavbar';
import { Outlet } from 'react-router-dom';

const PlaylistsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setViewPageUrl('/index.html/playlists'));
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
      }}
    >
      <PlaylistPageNavbar />
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default PlaylistsPage;
