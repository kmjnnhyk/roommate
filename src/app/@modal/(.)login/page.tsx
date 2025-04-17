import { Modal } from '@/app/ui/modal';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  async function login(formData: FormData) {
    'use server';

    const cookieStore = await cookies();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const isHost = true;

    cookieStore.set('auth', isHost ? 'HOST' : 'STAFF', {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    redirect(isHost ? '/host/dashboard' : '/staff/dashboard');
  }

  return (
    <Modal>
      <form action={login}>
        <input type="tel" name="phone" placeholder="전화번호" />
        <button type="submit">Login</button>
      </form>
      <div>login modal</div>
    </Modal>
  );
}
