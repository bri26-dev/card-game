export function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];

  for (let index = shuffledArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledArray[index], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[index],
    ];
  }

  return shuffledArray;
}
