// app/(tabs)/logout.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LogoutScreen() {
  const router = useRouter();
  const { setToken, setUser } = useAuth();
  useEffect(() => {
    setToken('');
    setUser('');
    router.replace('/sign-in');
  }, []);

  return null;
}
