import {
  ADD_TO_PLAYLIST,
  GET_PLAYLIST_ITEMS,
  REMOVE_FROM_PLAYLIST,
} from 'ipcEvents';
import styles from './styles.module.scss';
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from 'renderer/setup/context';
import RemovableItem from '../RemovableItem';
import { RemovableItemDataTypeDef } from '../types';
import { useDrop } from 'react-dnd';
import { PLAYLIST_FILE_ITEM } from 'renderer/common/data/draggablesType';

type props = {
  selectedPlaylist: string;
};

type PlaylistItemTypeDef = {
  filePath: string;
  fileTitle: string;
};

const PlaylistItems = ({ selectedPlaylist }: props) => {
  const { setAlertState } = useContext(AppContext);

  const [playlistItems, setPlaylistItems] = useState<
    Array<PlaylistItemTypeDef>
  >([]);

  const refreshPlaylistItems = () => {
    window.electron.ipcRenderer.sendMessage(
      GET_PLAYLIST_ITEMS,
      selectedPlaylist
    );
  };

  const removeFromPlaylist = (data: RemovableItemDataTypeDef) => {
    window.electron.ipcRenderer.sendMessage(
      REMOVE_FROM_PLAYLIST,
      selectedPlaylist,
      data.title
    );
  };

  const handlePlaylistItemInsert = (item: {
    fileTitle: string;
    filePath: string;
  }) => {
    if (selectedPlaylist === '') return;
    window.electron.ipcRenderer.sendMessage(
      ADD_TO_PLAYLIST,
      selectedPlaylist,
      item.fileTitle,
      item.filePath
    );
  };

  const [{ isOver }, dropRef] = useDrop({
    accept: PLAYLIST_FILE_ITEM, // Replace 'YOUR_ITEM_TYPE' with your custom item type
    drop: (item) => {
      handlePlaylistItemInsert(item as { fileTitle: string; filePath: string });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    window.electron.ipcRenderer.on(
      GET_PLAYLIST_ITEMS,
      (status, playlistsList) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setPlaylistItems(playlistsList as Array<PlaylistItemTypeDef>);
          return;
        }
        setAlertState({
          messages: [
            'There was a problem loading audios',
            'Restart the app if problem persues.',
          ],
        });
      }
    );

    window.electron.ipcRenderer.on(
      REMOVE_FROM_PLAYLIST,
      (status, updatedPlaylist) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setPlaylistItems(updatedPlaylist as Array<PlaylistItemTypeDef>);
          return;
        }
        setAlertState({
          messages: [
            'There was a problem removing audio',
            'Restart the app if problem persues.',
          ],
        });
      }
    );

    window.electron.ipcRenderer.on(
      ADD_TO_PLAYLIST,
      (status, updatedPlaylist) => {
        if (typeof status !== typeof '') return;
        if (status === 'success') {
          setPlaylistItems(updatedPlaylist as Array<PlaylistItemTypeDef>);
          return;
        }
        setAlertState({
          messages: [
            'There was a problem adding audio',
            'Restart the app if problem persues.',
          ],
        });
      }
    );

    return () => {
      window.electron.ipcRenderer.removeAllListeners(GET_PLAYLIST_ITEMS);
      window.electron.ipcRenderer.removeAllListeners(REMOVE_FROM_PLAYLIST);
      window.electron.ipcRenderer.removeAllListeners(ADD_TO_PLAYLIST);
    };
  }, []);

  useEffect(() => {
    if (selectedPlaylist === '') {
      setPlaylistItems([]);
    } else {
      refreshPlaylistItems();
    }
  }, [selectedPlaylist]);

  return (
    <div className={styles.wrapper} ref={dropRef}>
      <h1>Songs</h1>
      <hr />
      {playlistItems.length !== 0 ? (
        <div className={styles.scroll_list}>
          {playlistItems.map((item, index) => {
            return (
              <RemovableItem
                data={{ title: item.fileTitle, filePath: item.filePath }}
                key={index}
                actionCallback={removeFromPlaylist}
                refreshCallback={refreshPlaylistItems}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PlaylistItems;
