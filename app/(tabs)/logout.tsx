// app/(tabs)/logout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LogoutScreen() {
  const router = useRouter();
  const { setToken, setUser, setCard } = useAuth();

  const logout = async () => {
    await AsyncStorage.clear(); // или удалить только нужные ключи
    setToken("");
    setUser("");
    setCard("");
    router.replace("/sign-in");
  };
  useEffect(() => {
    logout();
  }, []);

  return null;
}
