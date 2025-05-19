// app/(tabs)/logout.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    // Очистить данные при необходимости
    router.replace('/sign-in');
  }, []);

  return null;
}
