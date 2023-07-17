import { useState } from 'react';
import FolderList from './FolderList';
import FolderView from './FolderView';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FolderExplorer = () => {
  const [selectedFolder, setSelectedFolder] = useState('');

  if (selectedFolder === '')
    return <FolderList setSelectedFolder={setSelectedFolder} />;

  return (
    <DndProvider backend={HTML5Backend}>
      <FolderView
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
    </DndProvider>
  );
};

export default FolderExplorer;
