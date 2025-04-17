import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-16 pt-12">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-16">
          <div className="relative w-20 h-20 mb-4">
            <div className="absolute top-0 left-0 w-16 h-16 bg-[rgb(255,89,23)] opacity-70 rounded-lg transform rotate-12" />
            <div className="absolute top-0 left-4 w-16 h-16 bg-[rgb(255,89,23)] rounded-lg" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-[rgb(255,89,23)]">
            RoomMate
          </h1>
          <p className="text-gray-400 text-sm">
            게스트들을 위한 공간을 만들어주세요
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="w-full max-w-xs space-y-4 mb-12">
          <button
            type="button"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-3 cursor-pointer !rounded-button"
          >
            <Image src="/vite.svg" alt="Next.js Logo" width={24} height={24} />
            <span>
              <Link href="/login">구글로 계속하기</Link>
            </span>
          </button>

          <button
            type="button"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-3 cursor-pointer !rounded-button"
          >
            <Image src="/vite.svg" alt="Next.js Logo" width={24} height={24} />
            <span>
              <Link href="/login">카카오톡으로 계속하기</Link>
            </span>
          </button>
        </div>

        {/* Terms and Privacy */}
        <div className="text-xs text-gray-500 text-center">
          <span>로그인함으로써 </span>
          <a href="#" className="underline">
            개인정보 처리방침
          </a>
          <span> 및 </span>
          <a href="#" className="underline">
            이용약관
          </a>
          <span>에 동의합니다</span>
        </div>
      </div>
    </div>
  );
}
