import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "qr-code";
          if (route.name === "schedule") iconName = "calendar-outline";
          else if (route.name === "settings") iconName = "settings-outline";
          else if (route.name === "logout") iconName = "log-out-outline";

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "rgb(103, 80, 164)",
        headerRight: () => (
          <Text style={{ marginRight: 10, color: "#555" }}>
            {" "}
            {user ? `👤 ${user}` : ""}
          </Text>
        ),
      })}
    >
      <Tabs.Screen name="qr" options={{ title: "QR" }} />
      <Tabs.Screen name="schedule" options={{ title: "Расписания" }} />
      <Tabs.Screen name="settings" options={{ title: "Настройки" }} />
      <Tabs.Screen name="logout" options={{ title: "Выход" }} />
    </Tabs>
  );
}
