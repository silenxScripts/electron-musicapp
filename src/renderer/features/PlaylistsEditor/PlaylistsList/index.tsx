import React, { useContext, useEffect, useState, FormEvent } from 'react';
import styles from './styles.module.scss';
import {
  ADD_NEW_PLAYLIST,
  GET_ALL_PLAYLISTS,
  REMOVE_PLAYLIST,
} from 'ipcEvents';
import { AppContext } from 'renderer/setup/context';
import AddIcon from '@mui/icons-material/Add';
import { noOfCharsInPlaylistName } from 'renderer/common/data/constants';
import RemovableItem from '../RemovableItem';
import { RemovableItemDataTypeDef } from '../types';

type props = {
  selectedPlaylist: string;
  setSelectedPlaylist: React.Dispatch<React.SetStateAction<string>>;
};

const PlaylistsList = ({ selectedPlaylist, setSelectedPlaylist }: props) => {
  const { setAlertState, setChoicesState } = useContext(AppContext);

  const [allPlaylists, setAllPlaylists] = useState<Array<string>>([]);
  const [newPlaylistInputValue, setNewPlaylistInputValue] = useState('');

  const refreshPlaylistList = () => {
    window.electron.ipcRenderer.sendMessage(GET_ALL_PLAYLISTS);
  };

  const addPlaylist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newPlaylistInputValue.length || !newPlaylistInputValue.trim()) {
      setNewPlaylistInputValue('');
      return;
    }
    if (allPlaylists.includes(newPlaylistInputValue)) {
      setAlertState({
        messages: ['Playlist already exists.'],
      });
      setNewPlaylistInputValue('');
      return;
    }
    window.electron.ipcRenderer.sendMessage(
      ADD_NEW_PLAYLIST,
      newPlaylistInputValue
    );
  };

  const removePlaylist = ({ title }: RemovableItemDataTypeDef) => {
    setChoicesState({
      message: `Are you sure you want to delete ${selectedPlaylist}?`,
      choices: ['Delete', 'Cancel'],
      callback(choice) {
        if (choice === 'Cancel') return;
        window.electron.ipcRenderer.sendMessage(REMOVE_PLAYLIST, title);
        setSelectedPlaylist('');
      },
    });
  };

  useEffect(() => {
    window.electron.ipcRenderer.on(
      GET_ALL_PLAYLISTS,
      (status, playlistsList) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setAllPlaylists(playlistsList as Array<string>);
          return;
        }
        setAlertState({
          messages: [
            'There was a problem loading playlists',
            'Restart the app if problem persues.',
          ],
        });
      }
    );

    window.electron.ipcRenderer.on(ADD_NEW_PLAYLIST, (status) => {
      if (typeof status !== typeof '') return;
      if (status === 'success') {
        setNewPlaylistInputValue('');
        refreshPlaylistList();
        return;
      }
      setAlertState({
        messages: [
          'There was a problem adding playlist',
          'Restart the app if problem persues.',
        ],
      });
    });

    window.electron.ipcRenderer.on(REMOVE_PLAYLIST, (status) => {
      if (typeof status !== typeof '') return;
      if (status === 'success') {
        setNewPlaylistInputValue('');
        refreshPlaylistList();
        return;
      }
      setAlertState({
        messages: [
          'There was a problem deleting playlist',
          'Restart the app if problem persues.',
        ],
      });
    });

    refreshPlaylistList();

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_ALL_PLAYLISTS);
      window.electron.ipcRenderer.removeAllListeners(ADD_NEW_PLAYLIST);
      window.electron.ipcRenderer.removeAllListeners(REMOVE_PLAYLIST);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={addPlaylist}>
        <input
          type="text"
          placeholder="Add a new playlist"
          value={newPlaylistInputValue}
          onChange={(e) => {
            const currentValue = e.target.value;
            if (currentValue.trim().length <= noOfCharsInPlaylistName)
              setNewPlaylistInputValue(currentValue);
          }}
        />
        <button type="submit">
          <AddIcon sx={{ color: '#fff' }} />
        </button>
      </form>
      {allPlaylists.length !== 0 ? (
        <div className={styles.scroll_list}>
          {allPlaylists.map((playlist, index) => {
            const doesMatchWithSelectedPlaylist = selectedPlaylist === playlist;

            return (
              <RemovableItem
                data={{ title: playlist }}
                key={index + 20}
                actionCallback={removePlaylist}
                refreshCallback={refreshPlaylistList}
                itemClickCallback={() =>
                  doesMatchWithSelectedPlaylist
                    ? setSelectedPlaylist('')
                    : setSelectedPlaylist(playlist)
                }
                selected={doesMatchWithSelectedPlaylist}
                cursorPointer={true}
              />
            );
          })}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default PlaylistsList;
