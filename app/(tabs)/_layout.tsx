import { Tabs } from "expo-router";
import * as React from "react";
import { Image, View } from "react-native";

import { ThemeToggle } from "~/components/ThemeToggle";
import { HomeIcon } from "~/lib/icons/Home";
import { PieChartIcon } from "~/lib/icons/PieChart";
import { SettingsIcon } from "~/lib/icons/Settings";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ animation: "shift", headerRight: () => <ThemeToggle /> }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerLeft: () => (
            <View className="flex-1 py-1.5">
              <Image
                className="h-full aspect-square rounded-full"
                source={require("~/assets/images/icon.png")}
              />
            </View>
          ),
          tabBarIcon: ({ color, size }) => <HomeIcon {...{ color, size }} />,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          tabBarIcon: ({ color, size }) => (
            <PieChartIcon {...{ color, size }} />
          ),
          title: "Reports",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon {...{ color, size }} />
          ),
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
