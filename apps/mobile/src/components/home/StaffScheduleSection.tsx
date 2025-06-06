import { Avatar, Card, Text, useTheme, XStack, YStack } from "tamagui";
import { DaySchedule } from "@/modules/home/useStaffSchedule";

interface StaffScheduleSectionProps {
  weeklySchedule: DaySchedule[];
}

export function StaffScheduleSection({
  weeklySchedule,
}: StaffScheduleSectionProps) {
  const theme = useTheme();

  return (
    <YStack gap="$2">
      <Card
        backgroundColor={theme.backgroundHover}
        borderRadius="$4"
        padding="$3"
      >
        <XStack justifyContent="space-around" alignItems="flex-start">
          {weeklySchedule.map((daySchedule, index) => (
            <YStack key={index} alignItems="center" gap="$1" flex={1}>
              <Text
                fontSize="$1"
                color={theme.placeholderColor}
                fontWeight="bold"
                textAlign="center"
              >
                {daySchedule.dayLabel}
              </Text>
              <Avatar circular size="$3">
                <Avatar.Image
                  accessibilityLabel={`${daySchedule.staff.name} Avatar`}
                  src={daySchedule.staff.avatar}
                />
                <Avatar.Fallback backgroundColor={theme.backgroundStrong} />
              </Avatar>
              <Text
                fontSize="$1"
                color={theme.color}
                numberOfLines={1}
                textAlign="center"
              >
                {daySchedule.staff.name}
              </Text>
            </YStack>
          ))}
        </XStack>
      </Card>
    </YStack>
  );
}
