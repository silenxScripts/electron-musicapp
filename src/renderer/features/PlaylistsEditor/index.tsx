import { DndProvider } from 'react-dnd';
import PlaylistItems from './PlaylistItems';
import PlaylistsList from './PlaylistsList';
import { useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PlaylistsEditor = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState('');

  return (
    <div
      style={{
        width: '70%',
        paddingLeft: '10px',
        display: 'flex',
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <PlaylistItems selectedPlaylist={selectedPlaylist} />
        <PlaylistsList
          selectedPlaylist={selectedPlaylist}
          setSelectedPlaylist={setSelectedPlaylist}
        />
      </DndProvider>
    </div>
  );
};

export default PlaylistsEditor;
