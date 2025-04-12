'use client';

import { use } from 'react';

export function Rooms({ rooms }: { rooms: Promise<string[]> }) {
  const roomList = use(rooms);

  return (
    <div>
      {roomList.map((room) => {
        return <div key={room}>{room}</div>;
      })}
    </div>
  );
}
