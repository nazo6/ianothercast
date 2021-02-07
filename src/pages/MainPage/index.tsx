import * as React from 'react';

import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewWindows } from 'react-native-windows/Libraries/Components/View/ViewWindows';
import { tw } from 'tailwind';
import { Text } from 'react-native';

const MainPage: React.FC = () => {
  useEffect(() => {
    const fn = async () => {
      console.log(await AsyncStorage.getAllKeys());
    };
    fn();
  }, []);
  return (
    <ViewWindows
      style={tw('h-full')}
      focusable={true}
      onStartShouldSetResponder={() => true}
      onResponderStart={(e) => {
        console.log(e);
      }}
      onKeyDown={(e) => {
        console.log(e.nativeEvent.code);
      }}>
      <Text>Text</Text>
    </ViewWindows>
  );
};

export default MainPage;
