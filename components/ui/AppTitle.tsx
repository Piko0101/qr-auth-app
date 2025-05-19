import { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';

export default function AppTitle({
  children,
  style,
}: {
  children: ReactNode;
  style?: TextStyle;
}) {
  return (
    <Text style={[{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }, style]}>
      {children}
    </Text>
  );
}

