import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">
      <h1 className="text-4xl font-bold">우리사이</h1>
      <Link href="/login">login</Link>
    </div>
  );
}
