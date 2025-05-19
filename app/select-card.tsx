import AppButton from "@/components/ui/AppButton";
import AppLayout from "@/components/ui/AppLayout";
import AppTitle from "@/components/ui/AppTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function SelectCardScreen() {
  const [selected, setSelected] = useState("");
  const [cards, setCards] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Здесь можно подгрузить из AsyncStorage или просто хардкод:
    setCards(["1234 5678 9012 3456", "9876 5432 1098 7654"]);
    (async () => {
      const saved = await AsyncStorage.getItem("selectedCard");
      if (saved) setSelected(saved);
    })();
  }, []);

  const handleSelectCard = async (card: string) => {
    await AsyncStorage.setItem("selectedCard", card);
    setSelected(card);
    router.replace("/(tabs)/qr"); // Назад на QR экран
  };

  return (
    <AppLayout>
      <AppTitle>Выбор карты</AppTitle>
      <RadioButton.Group
        onValueChange={setSelected}
        value={selected}
      >
        {cards.map((card, index) => (
          <View key={index} style={{ paddingVertical: 8 }}>
            <RadioButton.Item label={card} value={card} />
          </View>
        ))}
      </RadioButton.Group>
      <AppButton
        title="Сохранить и продолжить"
        onPress={() => handleSelectCard(selected)}
        disabled={!selected}
      />
    </AppLayout>
  );
}

