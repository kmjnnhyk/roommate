'use client';

import { useRouter } from 'next/navigation';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="relative flex w-full max-w-2xl flex-col items-center justify-center rounded-lg bg-gray-800 p-4">
        <div className="flex w-full justify-end">
          <button
            className="rounded-full bg-white p-2 text-black"
            type="button"
            onClick={() => router.back()}
          >
            Close modal
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
