import { useSession } from '@/providers/session';
import { Redirect } from 'expo-router';

export default function RootScreen() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/(unauthenticated)" />;
  }

  return <Redirect href="/(authenticated)" />;
}
