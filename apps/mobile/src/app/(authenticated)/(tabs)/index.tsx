import { YStack, Text, ScrollView, useTheme } from "tamagui";
import type { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "@/components/ui/Background";
import { useRoomStatus } from "@/modules/home/useRoomStatus";
import { useStaffSchedule } from "@/modules/home/useStaffSchedule";
import { HeaderSection } from "@/components/home/HeaderSection";
import { NoticeSection } from "@/components/home/NoticeSection";
import { StaffScheduleSection } from "@/components/home/StaffScheduleSection";
import { RoomStatusSection } from "@/components/home/RoomStatusSection";

// Mock Room Status Data
interface RoomStatus {
  id: string;
  name: string; // e.g., "101호", "여자 도미토리 A"
  type: string; // e.g., "2인실", "4인 도미토리"
  iconName: keyof typeof Ionicons.glyphMap; // Use Ionicons name type
  iconColor?: string; // Optional specific color for icon background/icon
  capacity: number;
  checkedIn: number;
}

// Helper component for section titles
const SectionHeader = ({ title }: { title: string }) => (
  <Text
    fontSize="$6"
    fontWeight="600"
    color={useTheme().color}
    marginBottom="$2"
  >
    {title}
  </Text>
);

export default function HomeScreen() {
  const theme = useTheme();
  const { roomChunks } = useRoomStatus();
  const { weeklySchedule } = useStaffSchedule();

  // Mock staff data with image URLs
  const mockStaffData = [
    {
      name: "Alice",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    { name: "Bob", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    {
      name: "Charlie",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    { name: "Dana", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Eve", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Frank", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    {
      name: "Grace",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
  ];

  // Mock weekly schedule data (without date-fns)
  const mockWeeklySchedule = [
    { dayLabel: "오늘", staff: mockStaffData[0] },
    { dayLabel: "내일", staff: mockStaffData[1] },
    { dayLabel: "5/4 (토)", staff: mockStaffData[2] },
    { dayLabel: "5/5 (일)", staff: mockStaffData[3] },
    { dayLabel: "5/6 (월)", staff: mockStaffData[4] },
    { dayLabel: "5/7 (화)", staff: mockStaffData[5] },
    { dayLabel: "5/8 (수)", staff: mockStaffData[6] },
  ];

  const mockRoomStatus: RoomStatus[] = [
    {
      id: "room101",
      name: "101호",
      type: "2인실",
      iconName: "bed",
      capacity: 2,
      checkedIn: 1,
      iconColor: "$purple10",
    },
    {
      id: "room102",
      name: "102호",
      type: "2인실",
      iconName: "bed-outline",
      capacity: 2,
      checkedIn: 2,
      iconColor: "$pink10",
    },
    {
      id: "dormF1",
      name: "여성 도미토리",
      type: "4인실",
      iconName: "woman",
      capacity: 4,
      checkedIn: 3,
      iconColor: "$blue10",
    },
    {
      id: "dormM1",
      name: "남성 도미토리",
      type: "4인실",
      iconName: "man",
      capacity: 4,
      checkedIn: 1,
      iconColor: "$green10",
    },
    {
      id: "room201",
      name: "201호",
      type: "1인실",
      iconName: "person",
      capacity: 1,
      checkedIn: 0,
      iconColor: "$orange10",
    },
    {
      id: "room202",
      name: "202호",
      type: "가족실",
      iconName: "people",
      capacity: 4,
      checkedIn: 4,
      iconColor: "$yellow10",
    },
  ];

  // Helper function to chunk array for grid layout
  const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

  const roomChunks = chunkArray(mockRoomStatus, 2); // Create 2-column chunks

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$5">
            <HeaderSection />
            <NoticeSection />

            <YStack gap="$2">
              <SectionHeader title="이번주 스탭 근무표" />
              <StaffScheduleSection weeklySchedule={weeklySchedule} />
            </YStack>

            <YStack gap="$3">
              <SectionHeader title="현재 체크인 상황" />
              <RoomStatusSection roomChunks={roomChunks} />
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
