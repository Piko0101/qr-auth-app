import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
  return (
    <Button
      mode="contained"
      style={styles.button}
      onPress={onPress}
      contentStyle={{ paddingVertical: 8 }}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
  },
});
