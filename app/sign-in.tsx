import AppTitle from '@/components/ui/AppTitle';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AppButton from '../components/ui/AppButton';
import AppInput from '../components/ui/AppInput';
import AppLayout from '../components/ui/AppLayout';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setToken, setUser } = useAuth();

  const handleLogin = () => {
    const fakeToken = `${username}-key-xyz`;
    setToken(fakeToken);
    setUser(username);
    router.replace('/(tabs)/qr');
  };
  

  return (
    <AppLayout centered>
      <AppTitle>Вход в систему</AppTitle>
      <AppInput
        label="Имя пользователя"
        placeholder="Введите имя"
        value={username}
        onChangeText={setUsername}
      />
      <AppInput
        label="Пароль"
        placeholder="Введите пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton title="Войти" onPress={handleLogin} />
    </AppLayout>
  );
}
