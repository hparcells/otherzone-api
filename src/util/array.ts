export function randomOf<K>(array: K[]): K {
  return array[Math.floor(Math.random() * array.length)];
}
