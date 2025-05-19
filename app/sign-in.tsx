import AppButton from "@/components/ui/AppButton";
import AppInput from "@/components/ui/AppInput";
import AppLayout from "@/components/ui/AppLayout";
import AppTitle from "@/components/ui/AppTitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export default function SignInScreen() {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  const router = useRouter();

  const sendCode = () => {
    if (phone.length !== 10) {
      Alert.alert("Ошибка", "Введите 10 цифр после +7");
      return;
    }
    Alert.alert("SMS отправлено", "Используйте код 1234 для входа");
    setStep("code");
  };

  const completeLogin = async () => {
    try {
      await AsyncStorage.setItem("token", `${phone}-key`);
      await AsyncStorage.setItem("user", phone as string);

      router.replace({
        pathname: "/select-card",
        params: {
          phone,
          cards: JSON.stringify(["1234 5678 9012 3456", "9876 5432 1098 7654"]),
        },
      });
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
      Alert.alert("Ошибка", "Не удалось сохранить данные");
    }
  };
  const verifyCode = () => {
    if (code !== "1234") {
      Alert.alert("Неверный код");
      return;
    }
    completeLogin();
    // Переход на экран выбора карты, передаём телефон и карты
  };

  return (
    <AppLayout centered>
      <AppTitle>Вход</AppTitle>

      {step === "phone" && (
        <>
          <AppInput
            label="+7 Номер телефона"
            placeholder="7771234567"
            value={phone}
            onChangeText={(text) =>
              setPhone(text.replace(/[^0-9]/g, "").slice(0, 10))
            }
            keyboardType="numeric"
          />
          <AppButton title="Получить код" onPress={sendCode} />
        </>
      )}

      {step === "code" && (
        <>
          <AppInput
            label="Код из SMS"
            placeholder="1234"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <AppButton title="Подтвердить код" onPress={verifyCode} />
        </>
      )}
    </AppLayout>
  );
}
