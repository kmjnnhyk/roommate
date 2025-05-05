import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  YStack,
  Text,
  Button,
  Label,
  Input,
  Select,
  Adapt,
  Sheet,
  H4,
  useTheme,
  ScrollView,
  XStack,
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/ui/Background';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '@/components/ui/Icon';

// --- Mock Data and Constants (Redefined or import from a shared location) ---
interface Schedule {
  id: string;
  date: string;
  staffName: string;
  shift: string;
}

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
    date: '2025-05-12',
    staffName: 'Alice',
    shift: '오전 (9:00 - 15:00)',
  },
  {
    id: '5',
    date: '2025-05-15',
    staffName: 'Alice',
    shift: '오전 (9:00 - 15:00)',
  },
];

const staffColors: { [key: string]: string } = {
  Alice: '$blue10',
  Bob: '$green10',
  Charlie: '$orange10',
};

const staffList = Object.keys(staffColors);
const shiftOptions = [
  '오전 (9:00 - 15:00)',
  '오후 (15:00 - 21:00)',
  '종일 (9:00 - 21:00)',
];
// --- End Mock Data ---

export default function ScheduleEditScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ date: string }>();
  const theme = useTheme();

  const scheduleDate = params.date;

  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [editStaffName, setEditStaffName] = useState('');
  const [editShift, setEditShift] = useState('');
  const [editDate, setEditDate] = useState(''); // Add state for date if needed

  // Load schedule data based on ID when the component mounts or ID changes
  useEffect(() => {
    if (scheduleDate) {
      const scheduleToEdit = mockSchedules.find((s) => s.date === scheduleDate);
      if (scheduleToEdit) {
        setEditingSchedule(scheduleToEdit);
        setEditStaffName(scheduleToEdit.staffName);
        setEditShift(scheduleToEdit.shift);
        setEditDate(scheduleToEdit.date);
      } else {
        // Handle case where schedule is not found (e.g., show error, navigate back)
        console.error('Schedule not found for ID:', scheduleDate);
        router.back();
      }
    }
  }, [scheduleDate, router]);

  // Function to handle saving changes
  const handleSaveChanges = () => {
    if (!editingSchedule) return;
    // Add actual update logic here (e.g., update mockSchedules or call API)
    // Find index and update the mock data array for demo purposes
    const index = mockSchedules.findIndex((s) => s.id === editingSchedule.id);
    if (index !== -1) {
      mockSchedules[index] = {
        ...editingSchedule,
        staffName: editStaffName,
        shift: editShift,
      };
    }
    router.back(); // Go back after saving
  };

  // Function to handle deleting schedule
  const handleDeleteSchedule = () => {
    if (!editingSchedule) return;
    // Add actual delete logic here
    // Remove from mock data array for demo purposes
    const index = mockSchedules.findIndex((s) => s.id === editingSchedule.id);
    if (index !== -1) {
      mockSchedules.splice(index, 1);
    }
    router.back(); // Go back after deleting
  };

  // Memoize Select items
  const staffSelectItems = useMemo(
    () => staffList.map((name) => ({ name, value: name })),
    [],
  );
  const shiftSelectItems = useMemo(
    () => shiftOptions.map((shift) => ({ name: shift, value: shift })),
    [],
  );

  if (!editingSchedule) {
    // Optional: Show a loading indicator or null while data is loading
    return (
      <Background>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Loading...</Text>
        </SafeAreaView>
      </Background>
    );
  }

  return (
    <Background>
      {/* Add ScrollView in case content overflows on smaller screens */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <YStack
          flex={1}
          padding="$4"
          gap="$4"
          backgroundColor={theme.background}
        >
          {/* Header */}
          <XStack justifyContent="space-between" alignItems="center">
            <H4 color={theme.color}>근무 일정 수정</H4>
            {/* Optional: Add a close button if needed, otherwise rely on back gesture/button */}
            {/* <Button chromeless icon={<Ionicons name="close" size={24} />} onPress={() => router.back()} /> */}
          </XStack>

          {/* Form Fields */}
          <YStack gap="$4">
            {/* Display Date */}
            <YStack gap="$1">
              <Label htmlFor="edit-date" color={theme.placeholderColor}>
                날짜
              </Label>
              <Input
                id="edit-date"
                value={editDate}
                editable={false} // Keep date non-editable for this example
                backgroundColor={theme.backgroundStrong}
                color={theme.color}
                borderColor={theme.borderColor}
              />
            </YStack>

            {/* Staff Select */}
            <YStack gap="$1">
              <Label htmlFor="edit-staff" color={theme.placeholderColor}>
                스탭
              </Label>
              <Select
                id="edit-staff"
                value={editStaffName}
                onValueChange={setEditStaffName}
              >
                <Select.Trigger
                  width="100%"
                  iconAfter={<Ionicons name="chevron-down" />}
                >
                  <Select.Value
                    placeholder="스탭 선택..."
                    color={theme.color}
                  />
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                  <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                  </Sheet>
                </Adapt>

                <Select.Content zIndex={200000}>
                  <Select.Viewport minWidth={200}>
                    <Select.Group>
                      <Select.Label>스탭 목록</Select.Label>
                      {staffSelectItems.map((item, i) => (
                        <Select.Item
                          index={i}
                          key={item.name}
                          value={item.value}
                        >
                          <Select.ItemText>{item.name}</Select.ItemText>
                          <Select.ItemIndicator marginLeft="auto">
                            <Icon
                              size={16}
                              name="checkbox-outline"
                              color={theme.brandColor.val}
                            />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select>
            </YStack>

            {/* Shift Select */}
            <YStack gap="$1">
              <Label htmlFor="edit-shift" color={theme.placeholderColor}>
                근무 시간
              </Label>
              <Select
                id="edit-shift"
                value={editShift}
                onValueChange={setEditShift}
              >
                <Select.Trigger
                  width="100%"
                  iconAfter={<Ionicons name="chevron-down" />}
                >
                  <Select.Value
                    placeholder="근무 시간 선택..."
                    color={theme.color}
                  />
                </Select.Trigger>

                <Adapt when="sm" platform="touch">
                  <Sheet modal dismissOnSnapToBottom snapPointsMode="fit">
                    <Sheet.Frame>
                      <Sheet.ScrollView>
                        <Adapt.Contents />
                      </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                  </Sheet>
                </Adapt>

                <Select.Content zIndex={200000}>
                  <Select.Viewport minWidth={200}>
                    <Select.Group>
                      <Select.Label>근무 시간 옵션</Select.Label>
                      {shiftSelectItems.map((item, i) => (
                        <Select.Item
                          index={i}
                          key={item.name}
                          value={item.value}
                        >
                          <Select.ItemText>{item.name}</Select.ItemText>
                          <Select.ItemIndicator marginLeft="auto">
                            <Icon
                              size={16}
                              name="checkbox-outline"
                              color={theme.brandColor.val}
                            />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Group>
                  </Select.Viewport>
                </Select.Content>
              </Select>
            </YStack>
          </YStack>

          {/* Spacer to push buttons towards bottom if content is short */}
          <YStack flex={1} />

          {/* Action Buttons */}
          <YStack gap="$3">
            <XStack gap="$3">
              <Button flex={1} onPress={() => router.back()}>
                취소
              </Button>
              <Button flex={1} onPress={handleSaveChanges}>
                저장
              </Button>
            </XStack>
            {/* Delete Button */}
            <Button
              icon={<Ionicons name="trash-outline" size={16} />}
              onPress={handleDeleteSchedule}
            >
              삭제
            </Button>
          </YStack>
        </YStack>
      </ScrollView>
    </Background>
  );
}
