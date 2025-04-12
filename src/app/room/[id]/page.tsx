import { getRooms } from '@/app/lib';
import { Rooms } from '@/app/ui/rooms';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = getRooms() as Promise<string[]>;
  return (
    <div>
      My Post: {id}
      <Suspense fallback={<div>loading...</div>}>
        <Rooms rooms={result} />
      </Suspense>
    </div>
  );
}
