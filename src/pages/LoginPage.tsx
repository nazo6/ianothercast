import { tw } from 'tailwind';
import * as React from 'react';
import { Button, TextInput, View } from 'react-native';
import { getStatusWithAuth } from '../api/auth';

const LoginPage: React.FC<{
  goApp: (token: string, userId: string) => void;
}> = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const login = async () => {
    setIsLoading(true);
    const status = await getStatusWithAuth(email, password);
    setIsLoading(false);
    if (status.authenticated) {
      props.goApp(status.user.token, status.user.user_id);
    } else {
      //
    }
  };
  return (
    <>
      <View style={tw('flex justify-center items-center w-full h-full')}>
        <View
          style={tw('flex justify-center items-center w-full h-full max-w-xs')}>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="Enter e-mail"
          />
          <TextInput
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
            placeholder="Enter password"
          />
          <Button
            onPress={() => login()}
            disabled={isLoading}
            title={isLoading ? 'Loading' : 'Login'}
          />
        </View>
      </View>
    </>
  );
};

export default LoginPage;
