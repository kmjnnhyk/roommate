import { redirect } from 'next/navigation';
import { getRooms } from '../lib';

export async function GET(request: Request) {
  const result = await getRooms();
  const hasRooms = result.length > 0;

  if (hasRooms) {
    redirect('/room/1');
  } else {
    redirect('/room/create');
  }
}
