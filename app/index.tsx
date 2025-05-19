// app/index.tsx
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Здесь можно заменить на проверку токена или asyncStorage
    const loggedIn = false; // заменим позже на логику
    setAuthenticated(loggedIn);
  }, []);

  if (authenticated) return <Redirect href="/(tabs)/qr" />;
  return <Redirect href="/sign-in" />;
}
