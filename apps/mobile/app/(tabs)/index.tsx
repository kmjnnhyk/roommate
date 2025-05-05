import { useState } from 'react';
import {
  YStack,
  XStack,
  Text,
  Button,
  Avatar,
  Card,
  ListItem,
  ScrollView,
  useTheme,
  View,
  Paragraph,
  Progress,
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/ui/Background';
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

  // Mock staff data with image URLs
  const mockStaffData = [
    {
      name: 'Alice',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    { name: 'Bob', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    {
      name: 'Charlie',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    { name: 'Dana', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Eve', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { name: 'Frank', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    {
      name: 'Grace',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
  ];

  // Mock weekly schedule data (without date-fns)
  const mockWeeklySchedule = [
    { dayLabel: '오늘', staff: mockStaffData[0] },
    { dayLabel: '내일', staff: mockStaffData[1] },
    { dayLabel: '5/4 (토)', staff: mockStaffData[2] },
    { dayLabel: '5/5 (일)', staff: mockStaffData[3] },
    { dayLabel: '5/6 (월)', staff: mockStaffData[4] },
    { dayLabel: '5/7 (화)', staff: mockStaffData[5] },
    { dayLabel: '5/8 (수)', staff: mockStaffData[6] },
  ];

  const mockRoomStatus: RoomStatus[] = [
    {
      id: 'room101',
      name: '101호',
      type: '2인실',
      iconName: 'bed',
      capacity: 2,
      checkedIn: 1,
      iconColor: '$purple10',
    },
    {
      id: 'room102',
      name: '102호',
      type: '2인실',
      iconName: 'bed-outline',
      capacity: 2,
      checkedIn: 2,
      iconColor: '$pink10',
    },
    {
      id: 'dormF1',
      name: '여성 도미토리',
      type: '4인실',
      iconName: 'woman',
      capacity: 4,
      checkedIn: 3,
      iconColor: '$blue10',
    },
    {
      id: 'dormM1',
      name: '남성 도미토리',
      type: '4인실',
      iconName: 'man',
      capacity: 4,
      checkedIn: 1,
      iconColor: '$green10',
    },
    {
      id: 'room201',
      name: '201호',
      type: '1인실',
      iconName: 'person',
      capacity: 1,
      checkedIn: 0,
      iconColor: '$orange10',
    },
    {
      id: 'room202',
      name: '202호',
      type: '가족실',
      iconName: 'people',
      capacity: 4,
      checkedIn: 4,
      iconColor: '$yellow10',
    },
  ];

  const handleRegisterGuest = () => {
    alert('게스트 등록 로직 실행');
  };

  // Helper function to chunk array for grid layout
  const chunkArray = <T,>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
    );

  const roomChunks = chunkArray(mockRoomStatus, 2); // Create 2-column chunks

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$5">
            {/* Header */}
            <XStack alignItems="center" justifyContent="space-between">
              <XStack alignItems="center" gap="$3">
                <Avatar circular size="$5">
                  <Avatar.Image
                    accessibilityLabel="Host Avatar"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                  />
                  <Avatar.Fallback backgroundColor={theme.background} />
                </Avatar>
                <YStack>
                  <Text color={theme.placeholderColor} fontSize="$2">
                    Welcome back,
                  </Text>
                  <Text color={theme.color} fontSize="$7" fontWeight="600">
                    Host Name
                  </Text>
                </YStack>
              </XStack>
              <Button
                chromeless
                circular
                icon={
                  <Ionicons
                    name="menu"
                    size={28}
                    color={theme.brandColor.val}
                  />
                } // Use brandColor for icon
                onPress={() => alert('Open Drawer')}
              />
            </XStack>

            {/* 오늘의 공유사항 */}
            <YStack gap="$2">
              <Card
                backgroundColor={theme.backgroundHover}
                padding="$3"
                borderRadius="$4"
              >
                <Text color={theme.color}>
                  오늘은 18시에 소등 예정입니다. 공용 공간 정리 부탁드립니다.
                  추가 공지사항 확인해주세요.
                </Text>
              </Card>
            </YStack>

            {/* 이번주 스탭 근무표 (Single Wrapper) */}
            <YStack gap="$2">
              <SectionHeader title="이번주 스탭 근무표" />
              {/* Single Card Wrapper */}
              <Card
                backgroundColor={theme.backgroundHover} // Use .val
                borderRadius="$4"
                padding="$3" // Add padding to the wrapper card
              >
                {/* Horizontal stack for the days */}
                <XStack justifyContent="space-around" alignItems="flex-start">
                  {mockWeeklySchedule.map((daySchedule, index) => (
                    // Vertical stack for each day's info
                    <YStack
                      key={index}
                      alignItems="center" // Center items horizontally
                      gap="$1" // Gap between day, avatar, name
                      flex={1} // Allow each day to take equal space
                    >
                      <Text
                        fontSize="$1" // Smaller font size
                        color={theme.placeholderColor} // Use .val
                        fontWeight="bold"
                        textAlign="center"
                      >
                        {daySchedule.dayLabel}
                      </Text>
                      <Avatar circular size="$3">
                        {/* Smaller Avatar */}
                        <Avatar.Image
                          accessibilityLabel={`${daySchedule.staff.name} Avatar`}
                          src={daySchedule.staff.avatar}
                        />
                        {/* Use a slightly darker fallback for better visibility */}
                        <Avatar.Fallback
                          backgroundColor={theme.backgroundStrong}
                        />
                      </Avatar>
                      <Text
                        fontSize="$1" // Smaller font size
                        color={theme.color} // Use .val
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

            {/* 현재 체크인 상황 (Room Grid) */}
            <YStack gap="$3">
              {/* Increased gap for the section */}
              <SectionHeader title="현재 체크인 상황" />
              {/* Grid Layout using YStack of XStacks */}
              <YStack gap="$3">
                {roomChunks.map((chunk, rowIndex) => (
                  <XStack
                    key={rowIndex}
                    gap="$3"
                    justifyContent="space-between"
                  >
                    {chunk.map((room) => {
                      const progressValue =
                        room.capacity > 0
                          ? (room.checkedIn / room.capacity) * 100
                          : 0;
                      return (
                        <Card
                          key={room.id}
                          flex={1} // Make cards share space equally in the row
                          backgroundColor={theme.backgroundHover}
                          borderRadius="$4"
                          padding="$3"
                          gap="$3" // Gap between elements inside the card
                        >
                          <YStack gap="$2">
                            {/* Top Row: Icon and Occupancy Text */}
                            <XStack
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Avatar
                                circular
                                size="$3"
                                backgroundColor={theme.backgroundStrong}
                              >
                                <Ionicons
                                  name={room.iconName}
                                  size={18}
                                  color={theme.color.val}
                                />
                              </Avatar>
                              <Paragraph fontSize="$1" fontWeight="bold">
                                {room.checkedIn} / {room.capacity}
                              </Paragraph>
                            </XStack>
                            {/* Middle: Room Name and Type */}
                            <YStack>
                              <Text
                                fontSize="$4"
                                fontWeight="600"
                                color={theme.color}
                                numberOfLines={1}
                              >
                                {room.name}
                              </Text>
                              <Paragraph fontSize="$1">{room.type}</Paragraph>
                            </YStack>
                            {/* Bottom: Progress Bar */}
                            <Progress value={progressValue} size="$0.75">
                              {/* Adjust size as needed */}
                              <Progress.Indicator
                                animation="bouncy"
                                backgroundColor={theme.brandColor}
                              />
                            </Progress>
                          </YStack>
                        </Card>
                      );
                    })}
                    {/* Add a placeholder View if the last row has only one item */}
                    {chunk.length === 1 && <View flex={1} />}
                  </XStack>
                ))}
              </YStack>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
