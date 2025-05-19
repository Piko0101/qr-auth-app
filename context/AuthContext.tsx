import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  token: "",
  user: "",
  card: "",
  setToken: (token: string) => {},
  setUser: (username: string) => {},
  setCard: (card: string) => {},
});

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const restoreSession = async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      const card = await AsyncStorage.getItem("selectedCard");

      if (token && user && card) {
        setToken(token);
        setUser(user);
        setCard(card);
        // Можно также: setSelectedCard(card);
        router.replace("/(tabs)/qr");
      }
    };

    restoreSession();
  }, []);

  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [card, setCard] = useState("");
  return (
    <AuthContext.Provider
      value={{ token, user, card, setCard, setToken, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
