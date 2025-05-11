import { Background } from '@/components/ui/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'tamagui';

export default function ProfileScreen() {
  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Text>Profile</Text>
      </SafeAreaView>
    </Background>
  );
}
