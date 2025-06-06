import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface RoomStatus {
  id: string;
  name: string;
  type: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  capacity: number;
  checkedIn: number;
}

export function useRoomStatus() {
  const [roomStatus] = useState<RoomStatus[]>([
    {
      id: 'room101',
      name: '101호',
      type: '2인실',
      iconName: 'bed',
      capacity: 2,
      checkedIn: 1,
      iconColor: '$purple10',
    },
    {
      id: 'room102',
      name: '102호',
      type: '2인실',
      iconName: 'bed-outline',
      capacity: 2,
      checkedIn: 2,
      iconColor: '$pink10',
    },
    {
      id: 'dormF1',
      name: '여성 도미토리',
      type: '4인실',
      iconName: 'woman',
      capacity: 4,
      checkedIn: 3,
      iconColor: '$blue10',
    },
    {
      id: 'dormM1',
      name: '남성 도미토리',
      type: '4인실',
      iconName: 'man',
      capacity: 4,
      checkedIn: 1,
      iconColor: '$green10',
    },
    {
      id: 'room201',
      name: '201호',
      type: '1인실',
      iconName: 'person',
      capacity: 1,
      checkedIn: 0,
      iconColor: '$orange10',
    },
    {
      id: 'room202',
      name: '202호',
      type: '가족실',
      iconName: 'people',
      capacity: 4,
      checkedIn: 4,
      iconColor: '$yellow10',
    },
  ]);

  const chunkArray = <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
    );

  const roomChunks = chunkArray(roomStatus, 2);

  return {
    roomStatus,
    roomChunks,
  };
}
