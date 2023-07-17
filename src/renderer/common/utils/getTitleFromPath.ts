const getTitleFromPath = (path: string) => {
  const pathSplitList = path.split('\\');
  const lastIndex = pathSplitList.length - 1;
  const fullTitle = pathSplitList[lastIndex];
  const title = fullTitle.slice(0, 17);
  const isFolderTitleLong = title.length >= 17;
  const postFix = isFolderTitleLong ? '...' : '';
  return `${title}${postFix}`;
};

export default getTitleFromPath;
