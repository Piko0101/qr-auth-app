import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = React.ComponentProps<typeof TextInput>;

export default function AppInput(props: Props) {
  return <TextInput mode="outlined" style={styles.input} {...props} />;
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
});
