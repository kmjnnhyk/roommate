import { cache } from 'react';

export const getRooms = cache(async () => {
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
});
