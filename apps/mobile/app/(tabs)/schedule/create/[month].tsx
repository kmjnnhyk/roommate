import { Background } from '@/components/ui/Background';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  YStack,
  Text,
  useTheme,
  ScrollView,
  XStack,
  Button,
  Card,
  View,
  H4,
  Separator,
  Checkbox, // Import Checkbox
  Label, // Import Label
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';

// --- Mock Data & Helpers (Should ideally be shared) ---
interface Schedule {
  id: string; // May not be needed for creation, but keep for consistency
  date: string; // YYYY-MM-DD
  staffName: string;
  shift: string; // Or maybe just assign staff per day initially? Let's simplify to just staff assignment per day.
}

// Define staff colors using theme variables
const staffColors: { [key: string]: string } = {
  Alice: '$sub1',
  Bob: '$sub2',
  Charlie: '$sub3',
};

const staffList = Object.keys(staffColors);

// Helper to get days in month
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];
  const firstDayOfWeek = date.getDay();
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
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

// Helper to format date to YYYY-MM-DD
const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// --- End Mock Data & Helpers ---

export default function ScheduleCreateScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ month: string }>();
  const targetMonth = params.month
    ? Number.parseInt(params.month, 10) - 1
    : new Date().getMonth(); // Month is 0-indexed

  // State for the calendar display and selection
  const [displayDate, setDisplayDate] = useState(() => {
    const now = new Date();
    // Use current year and the target month from params
    return new Date(now.getFullYear(), targetMonth, 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // State to hold the draft schedule being created
  // Map<YYYY-MM-DD, Set<staffName>>
  const [draftSchedules, setDraftSchedules] = useState<
    Map<string, Set<string>>
  >(new Map());

  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const monthName = displayDate.toLocaleString('ko-KR', { month: 'long' });

  const daysInMonth = getDaysInMonth(year, month);
  const weeks = chunkArray(daysInMonth, 7);

  // Function to handle date selection
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Function to toggle staff assignment for the selected date
  const toggleStaffForSelectedDate = (staffName: string) => {
    if (!selectedDate) return;
    const dateString = formatDate(selectedDate);
    setDraftSchedules((prevSchedules) => {
      const newSchedules = new Map(prevSchedules);
      const staffSet = new Set(newSchedules.get(dateString) || []); // Get existing set or create new
      if (staffSet.has(staffName)) {
        staffSet.delete(staffName); // Remove staff
      } else {
        staffSet.add(staffName); // Add staff
      }
      // If set is empty after deletion, remove the date entry from the map
      if (staffSet.size === 0) {
        newSchedules.delete(dateString);
      } else {
        newSchedules.set(dateString, staffSet);
      }
      return newSchedules;
    });
  };

  // Calculate total work days for each staff member based on draftSchedules
  const staffWorkDays = useMemo(() => {
    const workDaysCount: { [key: string]: number } = {};
    // Initialize counts for each staff member
    for (const name of staffList) {
      workDaysCount[name] = 0;
    }

    for (const staffSet of draftSchedules.values()) {
      // Iterate over the sets of staff names
      for (const staffName of staffSet) {
        if (workDaysCount[staffName] !== undefined) {
          workDaysCount[staffName]++;
        }
      }
    }

    return Object.entries(staffColors).map(([name, colorToken]) => ({
      name,
      colorToken,
      workDays: workDaysCount[name] || 0,
    }));
  }, [draftSchedules]);

  // Function to handle saving the draft schedule
  const handleSaveSchedule = () => {
    console.log('Saving Schedule:', draftSchedules);
    // Here you would typically convert draftSchedules into the format needed
    // (e.g., an array of Schedule objects) and send it to your backend/storage.
    // For now, just log it and go back.

    // Example conversion (if needed):
    const finalSchedules: Omit<Schedule, 'id' | 'shift'>[] = [];
    draftSchedules.forEach((staffSet, date) => {
      for (const staffName of staffSet) {
        finalSchedules.push({ date, staffName });
      }
    });
    console.log('Converted Schedules:', finalSchedules);

    // TODO: Add logic to save `finalSchedules` (e.g., update mockSchedules in index or call API)

    router.back(); // Go back to the previous screen
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$4">
            {/* Header */}
            <XStack justifyContent="space-between" alignItems="center">
              <H4 color={theme.color}>
                스케줄 생성 ({monthName} {year})
              </H4>
              <Button
                chromeless
                icon={
                  <Ionicons name="close" size={24} color={theme.color.val} />
                }
                onPress={() => router.back()}
              />
            </XStack>

            {/* Calendar Card */}
            <Card
              backgroundColor={theme.backgroundHover}
              borderRadius="$4"
              padding="$3"
              gap="$2"
            >
              {/* Days of Week */}
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

              {/* Dates Grid */}
              <YStack gap="$1">
                {weeks.map((week, weekIndex) => (
                  <XStack key={weekIndex}>
                    {week.map((day, dayIndex) => {
                      const dateString = formatDate(day);
                      const isSelected =
                        day?.toDateString() === selectedDate?.toDateString();
                      const staffForDay =
                        draftSchedules.get(dateString) || new Set();
                      const colorsForDay = Array.from(staffForDay)
                        .map((name) => staffColors[name])
                        .filter(Boolean);

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
                                  isSelected ? theme.brandColor : 'transparent'
                                }
                                onPress={() => handleDateSelect(day)}
                                pressStyle={{
                                  backgroundColor: theme.backgroundFocus,
                                }}
                                borderWidth={1} // Add border to make clickable area clearer
                                borderColor={
                                  isSelected
                                    ? theme.brandColor
                                    : theme.borderColor
                                }
                              >
                                <Text
                                  color={isSelected ? theme.color : theme.color}
                                >
                                  {day.getDate()}
                                </Text>
                              </Button>
                              {colorsForDay.length > 0 && ( // Show dots always if assigned
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
            </Card>

            {/* Staff Assignment Section */}
            {selectedDate && (
              <YStack gap="$3" marginTop="$3">
                <Separator />
                <Text fontSize="$5" fontWeight="600" color={theme.color}>
                  {formatDate(selectedDate)} 스태프 지정
                </Text>
                {staffList.map((staffName) => {
                  const dateString = formatDate(selectedDate);
                  const isChecked =
                    draftSchedules.get(dateString)?.has(staffName) ?? false;
                  const colorToken = staffColors[staffName];

                  return (
                    <XStack key={staffName} space="$3" alignItems="center">
                      <Checkbox
                        id={`staff-${staffName}`}
                        checked={isChecked}
                        onCheckedChange={() =>
                          toggleStaffForSelectedDate(staffName)
                        }
                        size="$4" // Adjust size as needed
                        backgroundColor={
                          isChecked
                            ? (theme[colorToken] ?? theme.brandColor)
                            : theme.background
                        }
                        borderColor={theme.borderColor}
                      >
                        <Checkbox.Indicator>
                          <Icon
                            size={28}
                            name="checkbox"
                            color={theme.brandColor.val}
                          />
                        </Checkbox.Indicator>
                      </Checkbox>
                      <Label htmlFor={`staff-${staffName}`} color={theme.color}>
                        {staffName}
                      </Label>
                    </XStack>
                  );
                })}
                <Separator />
              </YStack>
            )}

            {/* Workday Summary */}
            <YStack gap="$2" marginTop="$3">
              <Text fontSize="$5" fontWeight="600" color={theme.color}>
                이번 달 근무 일수
              </Text>
              <XStack gap="$3" flexWrap="wrap">
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
            </YStack>

            {/* Spacer to push save button down */}
            <YStack flex={1} />

            {/* Save Button */}
            <Button
              size="$4"
              onPress={handleSaveSchedule}
              iconAfter={
                <Ionicons
                  name="save-outline"
                  size={18}
                  color={theme.color.val}
                />
              }
            >
              스케줄 저장
            </Button>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
