'use client';

import { useRouter } from 'next/navigation';

export function Button({
  label,
  onClick,
}: { label: string; onClick?: () => void }) {
  const router = useRouter();

  return (
    <button
      type="button"
      className="w-full mt-4 py-3 bg-[#2C2D32] rounded-lg text-white flex items-center justify-center space-x-2 hover:bg-[#3A3B40] transition-colors !rounded-button"
      onClick={() => {
        router.push('/checkIn');
      }}
    >
      <span>{label}</span>
      <i className="fas fa-chevron-right text-sm" />
    </button>
  );
}
