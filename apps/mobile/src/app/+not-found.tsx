import { Link } from 'expo-router';
import { Text } from 'tamagui';

export default function NotFoundScreen() {
  return (
    <Link href="/">
      <Text>Not Found</Text>
    </Link>
  );
}
