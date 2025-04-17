'use client';

import { useState } from 'react';

const staffList = [
  { name: '김민수', color: 'bg-orange-500', days: [1, 3, 7, 14, 21] },
  { name: '박지현', color: 'bg-blue-500', days: [2, 4, 8, 15, 22] },
  { name: '최유진', color: 'bg-green-500', days: [5, 9, 16, 23, 28] },
];

function getMonthDays(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function Page() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = getMonthDays(year, month);

  // 달력 헤더
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 1일의 요일
  const firstDay = new Date(year, month, 1).getDay();

  // 달력 셀 배열 생성
  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }
  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  // 이전/다음 달 이동
  const prevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">스태프 근무 달력</h1>
      <div className="flex items-center mb-4 gap-4">
        <button
          type="button"
          onClick={prevMonth}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          &lt;
        </button>
        <span className="text-lg font-semibold">
          {year}년 {month + 1}월
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="px-2 py-1 bg-gray-700 rounded"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full max-w-2xl bg-[#18181b] rounded-lg p-4">
        {weekDays.map((w) => (
          <div key={w} className="text-center text-gray-400 font-medium">
            {w}
          </div>
        ))}
        {calendarCells.map((day, idx) => (
          <div
            key={`${day}-${idx}`}
            className={`h-20 border border-[#232326] rounded flex flex-col items-center justify-start p-1 ${
              day ? 'bg-[#232326]' : 'bg-transparent'
            }`}
          >
            <div className="text-xs text-gray-400">{day}</div>
            <div className="flex flex-col gap-1 mt-1">
              {day &&
                staffList
                  .filter((staff) => staff.days.includes(day))
                  .map((staff) => (
                    <span
                      key={staff.name}
                      className={`text-xs px-2 py-0.5 rounded-full ${staff.color} text-white`}
                    >
                      {staff.name}
                    </span>
                  ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        {staffList.map((staff) => (
          <div key={staff.name} className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${staff.color} inline-block`}
            />
            <span className="text-sm">{staff.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
