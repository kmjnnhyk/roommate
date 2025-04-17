import { Button } from '@/app/ui/button';
import Link from 'next/link';

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-[#1A1B1E]">
      {/* Top Navigation */}
      <div className="fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-[#1A1B1E]/95 backdrop-blur-sm z-10">
        <i className="fas fa-home text-[rgb(255,89,23)] text-2xl" />
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[rgb(255,89,23)] to-[rgb(255,120,70)]" />
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 px-6 pt-20 pb-20 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            안녕하세요, 김사장님
          </h1>
          <p className="text-gray-400 mt-1">오늘도 좋은 하루 되세요!</p>
        </div>
        {/* Weekly Staff Status */}
        <div className="bg-[#25262B] rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-medium">이번주 스탭</h2>
            <Link href="/staff">
              <p className="text-gray-400 text-sm font-normal">수정하기</p>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    { day: '목', date: '4/17' },
                    { day: '금', date: '4/18' },
                    { day: '토', date: '4/19' },
                    { day: '일', date: '4/20' },
                    { day: '월', date: '4/21' },
                    { day: '화', date: '4/22' },
                    { day: '수', date: '4/23' },
                  ].map((item, index) => (
                    <th
                      key={`${item.date}-${index}`}
                      className={`text-gray-400 text-sm font-normal pb-3 ${index === 0 ? 'text-[rgb(255,89,23)]' : ''}`}
                    >
                      <div className="flex flex-col items-center">
                        <span>{item.day}</span>
                        <span className="text-xs mt-1">{item.date}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {[
                    { name: '정현우' },
                    { name: '한소희' },
                    { name: '강동원' },
                    { name: '김민지' },
                    { name: '이서연' },
                    { name: '박지훈' },
                    { name: '최유진' },
                  ].map((staff, index) => (
                    <td key={`${staff.name}-${index}`} className="text-center">
                      <div className="flex flex-col items-center">
                        <img
                          src={`https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20young%20asian%20hotel%20staff%20member%20in%20uniform%20with%20clean%20background&width=40&height=40&seq=${index + 10}&orientation=squarish`}
                          className="w-10 h-10 rounded-full mx-auto mb-1"
                          alt={staff.name}
                        />
                        <p className="text-white text-xs">{staff.name}</p>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Today's Check-in */}
        <div className="bg-[#25262B] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-medium">오늘의 체크인</h2>
          </div>
          <div className="space-y-4">
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">체크인 현황</span>
              </div>
              <div className="relative h-2 bg-[#2C2D32] rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-[rgb(255,89,23)] rounded-full"
                  style={{ width: '60%' }}
                />
                <div
                  className="absolute left-0 top-0 h-full bg-[rgb(255,150,23)] rounded-full"
                  style={{ width: '15%' }}
                />
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[rgb(255,89,23)]" />
                    <span className="text-gray-400">예정 시간 입력 (12명)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[rgb(255,150,23)]" />
                    <span className="text-gray-400">체크인 완료 (3명)</span>
                  </div>
                </div>
              </div>
            </div>
            <Button label="자세히 보기" />
          </div>
        </div>
      </div>
    </div>
  );
}
