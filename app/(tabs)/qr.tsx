import * as CryptoJS from 'crypto-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import AppButton from '../../components/ui/AppButton';
import AppLayout from '../../components/ui/AppLayout';
import AppTitle from '../../components/ui/AppTitle';

export default function QRScreen() {
  const [data, setData] = useState('');
  const [timestamp, setTimestamp] = useState('');

  const generateQr = () => {
    const cert = 'MIIDpzCCAo+gAwIBAgI...'; // Тестовый сертификат
    const date = new Date();
    const payload = cert + date.toISOString();
    const encrypted = CryptoJS.AES.encrypt(payload, 'secret').toString();
    setData(encrypted);
    setTimestamp(date.toLocaleString());
  };

  useEffect(() => {
    generateQr();
  }, []);

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
          <AppButton title="Обновить" onPress={generateQr} />
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
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  time: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
  },
  actions: {
    justifyContent: 'center',
    paddingBottom: 16,
  },
});
