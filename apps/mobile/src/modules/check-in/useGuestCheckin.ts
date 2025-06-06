import { useState } from 'react';

export interface GuestCheckinInfo {
  id: string;
  name: string;
  roomName: string;
  isCheckedIn: boolean;
  estimatedTime: string | null;
  attendingParty: boolean;
  phoneNumber: string;
}

export function useGuestCheckin() {
  const [bulkMessage, setBulkMessage] = useState(
    '안녕하세요! 오늘 저녁 7시에 로비에서 간단한 파티가 있을 예정입니다. 많은 참석 부탁드립니다 :)',
  );

  const [guests, setGuests] = useState<GuestCheckinInfo[]>([
    {
      id: '1',
      name: '김민준',
      roomName: '101호',
      isCheckedIn: true,
      estimatedTime: '15:00',
      attendingParty: true,
      phoneNumber: '010-1234-5678',
    },
    {
      id: '2',
      name: '이수현',
      roomName: '102호',
      isCheckedIn: false,
      estimatedTime: '17:30',
      attendingParty: false,
      phoneNumber: '010-9876-5432',
    },
    {
      id: '3',
      name: '박지훈',
      roomName: '101호',
      isCheckedIn: false,
      estimatedTime: null,
      attendingParty: true,
      phoneNumber: '010-1111-2222',
    },
    {
      id: '4',
      name: '최유나',
      roomName: '여성 도미토리',
      isCheckedIn: true,
      estimatedTime: '16:00',
      attendingParty: true,
      phoneNumber: '010-3333-4444',
    },
    {
      id: '5',
      name: '정재현',
      roomName: '남성 도미토리',
      isCheckedIn: false,
      estimatedTime: '19:00',
      attendingParty: false,
      phoneNumber: '010-5555-6666',
    },
  ]);

  const groupedGuests = guests.reduce(
    (acc, guest) => {
      const room = guest.roomName;
      if (!acc[room]) {
        acc[room] = [];
      }
      acc[room].push(guest);
      return acc;
    },
    {} as Record<string, GuestCheckinInfo[]>,
  );

  const handleSendBulkMessage = () => {
    const guestNames = guests.map((g) => g.name).join(', ');
    alert(
      `다음 게스트에게 메시지 일괄 발송:\n${guestNames}\n\n내용:\n${bulkMessage}`,
    );
  };

  const handleSendMessage = (guest: GuestCheckinInfo) => {
    alert(`${guest.name}님(${guest.phoneNumber})에게 문자 발송 기능 실행`);
  };

  const toggleCheckin = (guestId: string) => {
    setGuests(
      guests.map((g) =>
        g.id === guestId ? { ...g, isCheckedIn: !g.isCheckedIn } : g,
      ),
    );
  };

  return {
    bulkMessage,
    setBulkMessage,
    guests,
    groupedGuests,
    handleSendBulkMessage,
    handleSendMessage,
    toggleCheckin,
  };
}
