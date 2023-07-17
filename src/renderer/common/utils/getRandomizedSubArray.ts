function getRandomizedSubArray<T>(array: Array<T>, size: number): Array<T> {
  if (size >= array.length) {
    return array.slice();
  }

  const randomizedList: Array<T> = [];
  const cloneArray = array.slice();

  while (randomizedList.length < size) {
    const randomIndex = Math.floor(Math.random() * cloneArray.length);

    randomizedList.push(cloneArray[randomIndex]);
    cloneArray.splice(randomIndex, 1);
  }

  return randomizedList;
}

export default getRandomizedSubArray;
