import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/HapticTab";
import { Icon } from "@/components/ui/Icon";
import { useTheme } from "tamagui";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.brandColor.val,
        tabBarInactiveTintColor: theme.borderColor.val,
        tabBarInactiveBackgroundColor: theme.background.val,
        tabBarActiveBackgroundColor: theme.background.val,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          paddingTop: 12,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="home"
              color={focused ? theme.brandColor.val : theme.borderColor.val}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="check-in"
        options={{
          title: "check-in",
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="checkbox-outline"
              color={focused ? theme.brandColor.val : theme.borderColor.val}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: "schedule",
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="calendar"
              color={focused ? theme.brandColor.val : theme.borderColor.val}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "chat",
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name="chatbubble"
              color={focused ? theme.brandColor.val : theme.borderColor.val}
            />
          ),
        }}
      />
    </Tabs>
  );
}
