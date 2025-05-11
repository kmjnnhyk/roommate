import { Background } from '@/components/ui/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  YStack,
  XStack,
  Text,
  Button,
  useTheme,
  ScrollView,
  H3,
  H4,
  Card,
  Paragraph,
  Separator,
  View,
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface MembershipPlan {
  id: 'free' | 'basic' | 'pro';
  name: string;
  price: string;
  billingCycle: string;
  features: PlanFeature[];
  isCurrentPlan?: boolean; // 현재 사용 중인 요금제인지 여부
  themeColor?: string; // 요금제별 테마 색상 (선택적)
}

const plans: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '₩0',
    billingCycle: '평생',
    features: [
      { text: '기본 게스트 관리', included: true },
      { text: '최대 5개 방 등록', included: true },
      { text: '기본 알림 기능', included: true },
      { text: '커뮤니티 지원', included: true },
      { text: '고급 통계 기능', included: false },
      { text: '우선 고객 지원', included: false },
    ],
    isCurrentPlan: true, // 예시: 현재 Free 요금제 사용 중
    themeColor: '$gray10',
  },
  {
    id: 'basic',
    name: 'Basic',
    price: '₩15,000',
    billingCycle: '월',
    features: [
      { text: '모든 Free 기능 포함', included: true },
      { text: '최대 20개 방 등록', included: true },
      { text: '스태프 관리 (최대 3명)', included: true },
      { text: '실시간 예약 알림', included: true },
      { text: '기본 통계 기능', included: true },
      { text: '이메일 고객 지원', included: true },
      { text: '고급 통계 기능', included: false },
    ],
    themeColor: '$blue10',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₩35,000',
    billingCycle: '월',
    features: [
      { text: '모든 Basic 기능 포함', included: true },
      { text: '무제한 방 등록', included: true },
      { text: '스태프 관리 (무제한)', included: true },
      { text: '자동화된 체크인/아웃', included: true },
      { text: '고급 통계 및 리포트', included: true },
      { text: '전용 고객 지원 매니저', included: true },
    ],
    themeColor: '$purple10',
  },
];

const PlanCard = ({
  plan,
  onSelectPlan,
}: {
  plan: MembershipPlan;
  onSelectPlan: (planId: MembershipPlan['id']) => void;
}) => {
  const theme = useTheme();
  const cardBorderColor = plan.isCurrentPlan
    ? theme.brandColor
    : theme.borderColor;
  const cardBackgroundColor = plan.isCurrentPlan
    ? theme.brandColor
    : theme.backgroundHover; // 1A for ~10% opacity

  return (
    <Card
      bordered
      padding="$4"
      gap="$3"
      borderColor={cardBorderColor}
      backgroundColor={cardBackgroundColor}
      width="100%" // Ensure full width for consistency
      // elevation={plan.isCurrentPlan ? "$2" : "$1"} // Add subtle elevation
    >
      <H3 color={theme.color}>{plan.name}</H3>
      <XStack alignItems="flex-end" gap="$1.5">
        <Text fontSize="$8" fontWeight="bold" color={theme.color}>
          {plan.price}
        </Text>
        <Text fontSize="$3" color={theme.colorPress} paddingBottom="$1">
          / {plan.billingCycle}
        </Text>
      </XStack>
      <Separator />
      <YStack gap="$2">
        <H4 color={theme.color}>주요 기능:</H4>
        {plan.features.map((feature, index) => (
          <XStack key={index} alignItems="center" gap="$2">
            <Ionicons
              name={
                feature.included ? 'checkmark-circle' : 'close-circle-outline'
              }
              size={20}
              color={feature.included ? 'green' : 'red'}
            />
            <Paragraph
              color={feature.included ? theme.color : theme.colorPress}
              flex={1}
            >
              {feature.text}
            </Paragraph>
          </XStack>
        ))}
      </YStack>
      <Button
        size="$4"
        onPress={() => onSelectPlan(plan.id)}
        disabled={plan.isCurrentPlan}
        iconAfter={
          plan.isCurrentPlan ? undefined : (
            <Ionicons name="arrow-forward" size={18} />
          )
        }
      >
        {plan.isCurrentPlan ? '현재 요금제' : '요금제 선택'}
      </Button>
    </Card>
  );
};

export default function MembershipScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleSelectPlan = (planId: MembershipPlan['id']) => {
    // 실제 앱에서는 선택한 요금제로 변경하는 로직 (예: 결제 페이지로 이동)
    // router.push(`/payment?plan=${planId}`); // 예시
    alert(
      `${plans.find((p) => p.id === planId)?.name} 요금제를 선택하셨습니다. (결제 로직 필요)`,
    );
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header */}
        <XStack
          paddingHorizontal="$3"
          paddingVertical="$2.5"
          alignItems="center"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          <Button
            circular
            size="$3"
            onPress={() => router.back()}
            backgroundColor="$backgroundTransparent"
            pressStyle={{ backgroundColor: '$backgroundFocus' }}
            icon={
              <Ionicons name="arrow-back" size={24} color={theme.color.val} />
            }
          />
          <H4 color="$color" marginLeft="$3" flex={1} textAlign="left">
            멤버십 요금제
          </H4>
        </XStack>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$4" alignItems="center">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
