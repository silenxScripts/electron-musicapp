type PlaylistDataTypeDef = { title: string };
type PlaylistItemTypeDef = { title: string; filePath: string };

export type RemovableItemDataTypeDef =
  | PlaylistDataTypeDef
  | PlaylistItemTypeDef;
