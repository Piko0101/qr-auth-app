import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function AppLayout({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <View style={[styles.container, centered && styles.centered]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
  },
});
