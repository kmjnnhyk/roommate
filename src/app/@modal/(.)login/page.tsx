import { Modal } from '@/app/ui/modal';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function Page() {
  async function login(formData: FormData) {
    'use server';

    const cookieStore = await cookies();

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookieStore.set('session', 'phone', {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });

    redirect('/room');
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
