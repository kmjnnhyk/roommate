import { Background } from '@/components/ui/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import { YStack, Button, Text, useTheme } from 'tamagui';
import { useRouter } from 'expo-router';
import Logo from '../../../assets/images/logo.svg'; // SVG 파일을 직접 import
import { Dimensions } from 'react-native';
import { useSession } from '@/providers/session';

const { width } = Dimensions.get('window');
const logoSize = width * 0.75; // 로고 크기를 화면 너비의 50%로 설정 (조정 가능)

export default function UnauthenticatedScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { signIn } = useSession();

  const handleLoginPress = () => {
    signIn();
    router.replace('/(authenticated)');
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
          gap="$10"
        >
          {/* Logo Section */}
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Logo
              color={theme.brandColor.val}
              width={logoSize}
              height={logoSize}
            />
          </YStack>

          {/* Button Section */}
          <YStack width="100%">
            <Button size="$5" onPress={handleLoginPress}>
              <Text color={theme.color} fontWeight="bold">
                로그인
              </Text>
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </Background>
  );
}
