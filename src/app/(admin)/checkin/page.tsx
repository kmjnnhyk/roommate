import { Button } from '@/app/ui/button';

export default function Page() {
  // 예시 데이터
  const guests = [
    {
      name: '이민수',
      room: '201호',
      status: '체크인 완료',
      isPartyParticipant: false,
      time: '14:05',
      phoneNumber: '010-1234-5678',
      avatar:
        'https://readdy.ai/api/search-image?query=asian%20guest%20portrait&width=40&height=40&seq=1&orientation=squarish',
    },
    {
      name: '박지현',
      room: '202호',
      status: '예정',
      isPartyParticipant: true,
      time: '15:00',
      phoneNumber: '010-1234-5678',
      avatar:
        'https://readdy.ai/api/search-image?query=asian%20guest%20portrait&width=40&height=40&seq=2&orientation=squarish',
    },
    {
      name: '김서준',
      room: '203호',
      status: '예정',
      isPartyParticipant: true,
      time: '16:30',
      phoneNumber: '010-1234-5678',
      avatar:
        'https://readdy.ai/api/search-image?query=asian%20guest%20portrait&width=40&height=40&seq=3&orientation=squarish',
    },
    {
      name: '최유진',
      room: '204호',
      status: '체크인 완료',
      isPartyParticipant: true,
      time: '13:40',
      phoneNumber: '010-1234-5678',
      avatar:
        'https://readdy.ai/api/search-image?query=asian%20guest%20portrait&width=40&height=40&seq=4&orientation=squarish',
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#1A1B1E]">
      {/* Main Content */}
      <div className="flex-1 px-6 pt-20 pb-20 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            게스트 체크인 현황
          </h1>
          <p className="text-gray-400 mt-1">
            오늘 체크인 예정 및 완료된 게스트 목록입니다.
          </p>
        </div>
        <div className="bg-[#25262B] rounded-xl px-4">
          <div className="divide-y divide-[#2C2D32]">
            {guests.map((guest, idx) => (
              <div key={guest.name} className="flex items-center py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{guest.name}</span>
                    <span className="text-xs text-gray-400">
                      {`( ${guest.phoneNumber} )`}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    체크인 예정 시간: {guest.time}
                  </div>
                </div>
                <span
                  className={
                    guest.status === '체크인 완료'
                      ? 'px-3 py-1 rounded-full text-xs font-semibold bg-[rgb(255,89,23)] text-white'
                      : 'px-3 py-1 rounded-full text-xs font-semibold bg-[#2C2D32] text-gray-400'
                  }
                >
                  {guest.status}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                  {guest.isPartyParticipant ? '파티 참가' : '파티 불참'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
