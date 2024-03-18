export function declOfNum(number: number, words: [string, string, string]) {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]
  ];
}

export function capitalizeFirstLetter(str: string) {
  const arr = str.split(' ');
  arr[0] = arr[0].slice(0, 1).toUpperCase() + arr[0].slice(1);
  return arr.join(' ');
}
