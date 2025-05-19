import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import forge from "node-forge";
import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { PUBLIC_KEY_PEM } from "../../assets/certs/publicKey";
import AppButton from "../../components/ui/AppButton";
import AppLayout from "../../components/ui/AppLayout";
import AppTitle from "../../components/ui/AppTitle";

export default function QRScreen() {
  const [data, setData] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const router = useRouter();

  const generateQr = (card: string) => {
    const publicCert = forge.pki.certificateFromPem(PUBLIC_KEY_PEM);
    const publicKey = publicCert.publicKey as forge.pki.rsa.PublicKey;

    const date = new Date(Date.now() + 5 * 60 * 1000); // +5 мин
    const isoDate = date.toISOString();
    const encryptedCard = forge.util.encode64(
      publicKey.encrypt(card, "RSAES-PKCS1-V1_5")
    );

    const encryptedDate = forge.util.encode64(
      publicKey.encrypt(isoDate, "RSAES-PKCS1-V1_5")
    );

    const payload = `${encryptedCard}.${encryptedDate}`;

    setData(payload);
    setTimestamp(new Date(Date.now()).toLocaleString());
  };

  const loadCard = useCallback(async () => {
    const selectedCard = await AsyncStorage.getItem("selectedCard");
    if (selectedCard) {
      setCardNumber(selectedCard);
      generateQr(selectedCard);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCard();
    }, [loadCard])
  );

  return (
    <AppLayout>
      <AppTitle>QR Авторизация</AppTitle>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subtitle}>Ваш QR-код:</Text>
          <View style={styles.qrContainer}>
            {data && <QRCode value={data} size={200} />}
          </View>
          <Text style={styles.time}>Сгенерировано: {timestamp}</Text>
        </Card.Content>
        <Divider />
        <Card.Actions style={styles.actions}>
          <AppButton
            title="Обновить"
            onPress={() => generateQr(cardNumber)}
            style={styles.smallButton}
          />
          <AppButton
            title="Сменить карту"
            onPress={() => router.push("/select-card")}
            style={styles.smallButton}
          />
        </Card.Actions>
      </Card>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 24,
    borderRadius: 12,
    elevation: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    textAlign: "center",
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  time: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    paddingBottom: 16,
  },
  smallButton: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
});
