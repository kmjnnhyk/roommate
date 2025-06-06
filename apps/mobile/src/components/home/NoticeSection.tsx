import { Card, Text, useTheme, YStack } from "tamagui";

export function NoticeSection() {
  const theme = useTheme();

  return (
    <YStack gap="$2">
      <Card
        backgroundColor={theme.backgroundHover}
        padding="$3"
        borderRadius="$4"
      >
        <Text color={theme.color}>
          오늘은 18시에 소등 예정입니다. 공용 공간 정리 부탁드립니다. 추가
          공지사항 확인해주세요.
        </Text>
      </Card>
    </YStack>
  );
}
