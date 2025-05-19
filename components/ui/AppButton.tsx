import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export default function AppButton({ title, onPress, disabled, style }: Props) {
  return (
    <Button
      mode="contained"
      style={[styles.button, style]}
      onPress={onPress}
      contentStyle={{ paddingVertical: 8 }}
      disabled={disabled}
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
