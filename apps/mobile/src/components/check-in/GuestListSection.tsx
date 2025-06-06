import { Text, useTheme, YStack } from "tamagui";
import { GuestCheckinInfo } from "@/modules/check-in/useGuestCheckin";
import { GuestCard } from "./GuestCard";

interface GuestListSectionProps {
  groupedGuests: Record<string, GuestCheckinInfo[]>;
  onToggleCheckin: (id: string) => void;
  onSendMessage: (guest: GuestCheckinInfo) => void;
}

export function GuestListSection({
  groupedGuests,
  onToggleCheckin,
  onSendMessage,
}: GuestListSectionProps) {
  const theme = useTheme();

  return (
    <YStack gap="$3">
      {Object.entries(groupedGuests).map(([roomName, guestsInRoom]) => (
        <YStack key={roomName} gap="$3">
          <Text
            fontSize="$4"
            fontWeight="500"
            color={theme.color}
            paddingLeft="$1"
          >
            {roomName} ({guestsInRoom.length}명)
          </Text>
          {guestsInRoom.map((guest) => (
            <GuestCard
              key={guest.id}
              guest={guest}
              onToggleCheckin={onToggleCheckin}
              onSendMessage={onSendMessage}
            />
          ))}
        </YStack>
      ))}
    </YStack>
  );
}
