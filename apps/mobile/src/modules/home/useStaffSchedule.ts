import { useState } from 'react';

interface StaffMember {
  name: string;
  avatar: string;
}

export interface DaySchedule {
  dayLabel: string;
  staff: StaffMember;
}

export function useStaffSchedule() {
  const [mockStaffData] = useState<StaffMember[]>([
    {
      name: 'Alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    { name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    {
      name: 'Charlie',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    { name: 'Dana', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Eve', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Frank', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    {
      name: 'Grace',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ]);

  const [weeklySchedule] = useState<DaySchedule[]>([
    { dayLabel: '오늘', staff: mockStaffData[0] },
    { dayLabel: '내일', staff: mockStaffData[1] },
    { dayLabel: '5/4 (토)', staff: mockStaffData[2] },
    { dayLabel: '5/5 (일)', staff: mockStaffData[3] },
    { dayLabel: '5/6 (월)', staff: mockStaffData[4] },
    { dayLabel: '5/7 (화)', staff: mockStaffData[5] },
    { dayLabel: '5/8 (수)', staff: mockStaffData[6] },
  ]);

  return {
    weeklySchedule,
  };
}
