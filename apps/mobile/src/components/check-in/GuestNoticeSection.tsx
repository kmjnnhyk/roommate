import { Ionicons } from "@expo/vector-icons";
import { Button, Card, TextArea, useTheme, YStack } from "tamagui";

interface GuestNoticeSectionProps {
  bulkMessage: string;
  setBulkMessage: (message: string) => void;
  onSendBulkMessage: () => void;
}

export function GuestNoticeSection({
  bulkMessage,
  setBulkMessage,
  onSendBulkMessage,
}: GuestNoticeSectionProps) {
  const theme = useTheme();

  return (
    <YStack gap="$2">
      <Card
        backgroundColor={theme.backgroundHover}
        padding="$3"
        borderRadius="$4"
        gap="$3"
      >
        <TextArea
          placeholder="게스트에게 보낼 공지 내용을 입력하세요..."
          value={bulkMessage}
          onChangeText={setBulkMessage}
          backgroundColor="$backgroundTransparent"
          color={theme.color}
          borderColor={theme.borderColor}
          placeholderTextColor={theme.placeholderColor}
          minHeight={80}
        />
        <Button
          iconAfter={<Ionicons name="send-outline" size={16} />}
          onPress={onSendBulkMessage}
        >
          일괄 전송
        </Button>
      </Card>
    </YStack>
  );
}
