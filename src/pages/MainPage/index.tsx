import * as React from 'react';

import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native';

const MainPage: React.FC = () => {
  useEffect(() => {
    console.log('1');
    const fn = async () => {
      console.log(await AsyncStorage.getAllKeys());
    };
    fn();
  }, []);
  return <Text>MainPage</Text>;
};

export default MainPage;
