import {
  YStack,
  Text,
  Card,
  useTheme,
  XStack,
  Button,
  ScrollView,
  Paragraph,
  View,
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/ui/Background'; // Assuming you have a Background component
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useMemo } from 'react'; // Import useMemo
import { useRouter } from 'expo-router';

// Mock data interface
interface Schedule {
  id: string;
  date: string;
  staffName: string;
  shift: string;
}

// Mock data for schedule items
const mockSchedules: Schedule[] = [
  {
    id: '1',
    date: '2025-05-11',
    staffName: 'Alice',
    shift: '오전 (9:00 - 15:00)',
  },
  {
    id: '2',
    date: '2025-05-11',
    staffName: 'Bob',
    shift: '오후 (15:00 - 21:00)',
  },
  {
    id: '3',
    date: '2025-05-12',
    staffName: 'Charlie',
    shift: '종일 (9:00 - 21:00)',
  },
  {
    id: '4',
    date: '2025-05-15',
    staffName: 'Alice',
    shift: '오전 (9:00 - 15:00)',
  },
  {
    // Add another schedule for Alice in the same month for testing count
    id: '5',
    date: '2025-05-16',
    staffName: 'Alice',
    shift: '오후 (15:00 - 21:00)',
  },
];

// Define staff colors using theme variables
const staffColors: { [key: string]: string } = {
  Alice: '$sub1', // Using theme color names directly if they exist
  Bob: '$sub2',
  Charlie: '$sub3',
  // Add more staff and colors as needed
};

// ... getDaysInMonth and chunkArray helpers ...
// Helper to get days in month (simplified example)
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  // Get the first day of the week (0=Sun, 1=Mon, ...)
  const firstDayOfWeek = date.getDay();
  // Add empty placeholders for days before the 1st
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  // Add actual days
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Helper to chunk array
const chunkArray = <T,>(arr: (T | null)[], size: number): (T | null)[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size),
  );

export default function ScheduleScreen() {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // Use state for current date context
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); // State for selected date

  const router = useRouter();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed (0 = January)
  const monthName = currentDate.toLocaleString('ko-KR', { month: 'long' }); // Use ko-KR for Korean month name

  const daysInMonth = getDaysInMonth(year, month);
  const weeks = chunkArray(daysInMonth, 7); // Group days into weeks

  // Filter schedules for the selected date (simple string comparison for demo)
  const selectedDateString = selectedDate?.toISOString().split('T')[0];
  const schedulesForSelectedDate = mockSchedules.filter(
    (s) => s.date === selectedDateString,
  );

  // Function to get staff colors for a specific date
  const getStaffColorsForDate = (date: Date | null): string[] => {
    if (!date) return [];
    const dateString = date.toISOString().split('T')[0];
    const staffOnDate = mockSchedules
      .filter((s) => s.date === dateString)
      .map((s) => s.staffName);
    // Get unique staff names and map to colors
    return [...new Set(staffOnDate)] // Get unique staff names
      .map((name) => staffColors[name]) // Map to color token
      .filter((color) => !!color); // Filter out undefined colors
  };

  // Calculate total work days for each staff member in the current month
  const staffWorkDays = useMemo(() => {
    const workDaysCount: { [key: string]: Set<string> } = {}; // Use Set to count unique days

    for (const schedule of mockSchedules) {
      try {
        const scheduleDate = new Date(schedule.date);
        // Check if the schedule is in the current month and year
        if (
          scheduleDate.getFullYear() === year &&
          scheduleDate.getMonth() === month
        ) {
          if (!workDaysCount[schedule.staffName]) {
            workDaysCount[schedule.staffName] = new Set();
          }
          workDaysCount[schedule.staffName].add(schedule.date); // Add the date string to the set
        }
      } catch (e) {
        console.error('Error parsing date:', schedule.date, e); // Handle potential invalid date strings
      }
    }

    // Map staff names to their work day count and color
    return Object.entries(staffColors).map(([name, colorToken]) => ({
      name,
      colorToken,
      workDays: workDaysCount[name] ? workDaysCount[name].size : 0, // Get size of the set (unique days)
    }));
  }, [year, month]); // Recalculate when year or month changes

  // Check if there are any schedules for the current month
  const hasSchedulesThisMonth = useMemo(() => {
    return mockSchedules.some((schedule) => {
      try {
        const scheduleDate = new Date(schedule.date);
        return (
          scheduleDate.getFullYear() === year &&
          scheduleDate.getMonth() === month
        );
      } catch {
        return false;
      }
    });
  }, [year, month]);

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAddSchedule = () => {
    // Navigate to add screen
    // router.push('/schedule/add'); // Use the correct path for your add screen
    console.log('Add');
    router.push({
      pathname: '/schedule/create/[month]', // Ensure the file is named [id].tsx
      params: { month: currentDate.getMonth() + 1 }, // Pass the current month (1-indexed)
    });
  };

  const handleOpenEditSheet = (schedule: Schedule) => {
    router.push({
      pathname: '/schedule/edit/[date]', // Ensure the file is named [id].tsx
      params: { date: schedule.date },
    });
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* ... Header Text ... */}
        <XStack paddingHorizontal="$4" paddingVertical="$3" alignItems="center">
          <Text fontSize="$8" fontWeight="bold" color={theme.color}>
            스케쥴
          </Text>
        </XStack>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$4">
            {/* ... Calendar Header ... */}
            <Text fontSize="$7" fontWeight="bold" color={theme.color}>
              {monthName} {year}
            </Text>

            {/* Calendar Card */}
            <Card
              backgroundColor={theme.backgroundHover}
              borderRadius="$4"
              padding="$3"
              gap="$2" // Keep gap for header and content spacing
            >
              {/* Days of Week (Always show) */}
              <XStack>
                {['일', '월', '화', '수', '목', '금', '토'].map(
                  (day, index) => (
                    <View key={`${day}-${index}`} flex={1} alignItems="center">
                      <Text fontSize="$2" color={theme.placeholderColor}>
                        {day}
                      </Text>
                    </View>
                  ),
                )}
              </XStack>

              {/* Conditional Content: Dates Grid OR Add Prompt */}
              {hasSchedulesThisMonth ? (
                // Dates Grid
                <YStack gap="$1">
                  {weeks.map((week, weekIndex) => (
                    <XStack key={weekIndex}>
                      {week.map((day, dayIndex) => {
                        // ... day rendering logic ...
                        const isSelected =
                          day?.toDateString() === selectedDate?.toDateString();
                        const isToday =
                          day?.toDateString() === new Date().toDateString();
                        const colorsForDay = getStaffColorsForDate(day);

                        return (
                          <View
                            key={dayIndex}
                            flex={1}
                            alignItems="center"
                            paddingVertical="$1"
                          >
                            {day ? (
                              <YStack alignItems="center" position="relative">
                                <Button
                                  chromeless
                                  circular
                                  size="$3"
                                  backgroundColor={
                                    isSelected
                                      ? theme.brandColor
                                      : isToday
                                        ? theme.backgroundStrong
                                        : 'transparent'
                                  }
                                  onPress={() => handleDateSelect(day)}
                                  pressStyle={{
                                    backgroundColor: theme.backgroundFocus,
                                  }}
                                >
                                  <Text
                                    color={
                                      isSelected ? theme.color : theme.color
                                    }
                                  >
                                    {day.getDate()}
                                  </Text>
                                </Button>
                                {colorsForDay.length > 0 && !isSelected && (
                                  <XStack
                                    position="absolute"
                                    bottom={-2}
                                    alignSelf="center"
                                    gap="$0.5"
                                  >
                                    {colorsForDay
                                      .slice(0, 3)
                                      .map((colorToken, index) => (
                                        <View
                                          key={index}
                                          width={5}
                                          height={5}
                                          borderRadius={2.5}
                                          backgroundColor={
                                            theme[colorToken] ?? theme.gray8
                                          }
                                        />
                                      ))}
                                  </XStack>
                                )}
                              </YStack>
                            ) : (
                              <View style={{ height: 40 }} /> // Placeholder
                            )}
                          </View>
                        );
                      })}
                    </XStack>
                  ))}
                </YStack>
              ) : (
                // "Add Schedule" Prompt inside the Card
                <YStack
                  alignItems="center"
                  justifyContent="center" // Center content vertically
                  gap="$3"
                  paddingVertical="$6" // Add vertical padding for spacing
                  minHeight={200} // Ensure the card has some height
                >
                  <Text color={theme.placeholderColor} textAlign="center">
                    이번 달에 등록된 스케줄이 없습니다.
                  </Text>
                  <Button
                    icon={
                      <Ionicons
                        name="add-circle-outline"
                        size={18}
                        color={theme.brandColor.val}
                      />
                    }
                    onPress={handleAddSchedule}
                    size="$3"
                  >
                    스케줄 등록하기
                  </Button>
                </YStack>
              )}
            </Card>

            {/* Staff Work Days Legend (Always show below card) */}
            <XStack gap="$3" flexWrap="wrap" marginTop="$3">
              {staffWorkDays.map(({ name, colorToken, workDays }) => (
                <XStack key={name} alignItems="center" gap="$1.5">
                  <View
                    width={10}
                    height={10}
                    borderRadius={5}
                    backgroundColor={theme[colorToken] ?? theme.gray8}
                  />
                  <Text fontSize="$2" color={theme.color}>
                    {name}: {workDays}일
                  </Text>
                </XStack>
              ))}
            </XStack>

            {/* Remove the old conditional prompt section from here */}
            {/* {!hasSchedulesThisMonth && ( ... )} */}

            {/* Schedule List for Selected Date (Only show if there are schedules this month) */}
            {hasSchedulesThisMonth && (
              <YStack gap="$2" marginTop="$4">
                {/* ... Schedule List Header ... */}
                <XStack justifyContent="space-between" alignItems="center">
                  <Text fontSize="$6" fontWeight="600" color={theme.color}>
                    근무 일정
                    {selectedDate
                      ? `(${selectedDate.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })})`
                      : ''}
                  </Text>
                  {/* ... Ellipsis button ... */}
                  <Button
                    size="$2"
                    chromeless
                    icon={
                      <Ionicons
                        name="ellipsis-horizontal"
                        size={20}
                        color={theme.placeholderColor.val}
                      />
                    }
                  />
                </XStack>
                {/* ... Schedule List Items (Conditional rendering based on selectedDate) ... */}
                {schedulesForSelectedDate.length > 0 ? (
                  schedulesForSelectedDate.map((schedule, index) => (
                    <Card
                      key={schedule.id}
                      backgroundColor={theme.backgroundHover}
                      padding="$3"
                      borderRadius="$4"
                    >
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        {/* ... Schedule item details ... */}
                        <XStack gap="$3" alignItems="center">
                          <View
                            backgroundColor={theme.backgroundStrong}
                            paddingHorizontal="$2"
                            paddingVertical="$1"
                            borderRadius="$2"
                          >
                            <Text fontSize="$2" color={theme.color}>
                              {index + 1}
                            </Text>
                          </View>
                          <YStack>
                            <Text
                              fontSize="$4"
                              fontWeight="500"
                              color={theme.color}
                            >
                              {schedule.staffName}
                            </Text>
                            <Paragraph fontSize="$2" color={theme.color}>
                              {schedule.shift}
                            </Paragraph>
                          </YStack>
                        </XStack>
                        <Button
                          size="$2"
                          chromeless
                          onPress={() => handleOpenEditSheet(schedule)}
                          icon={
                            <Ionicons
                              name="pencil-outline"
                              size={18}
                              color={theme.placeholderColor.val}
                            />
                          }
                        />
                      </XStack>
                    </Card>
                  ))
                ) : (
                  <Card
                    backgroundColor={theme.backgroundHover}
                    padding="$3"
                    borderRadius="$4"
                    alignItems="center"
                  >
                    <Text color={theme.placeholderColor}>
                      선택된 날짜에 근무 일정이 없습니다.
                    </Text>
                  </Card>
                )}
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
