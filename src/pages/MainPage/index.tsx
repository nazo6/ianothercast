import * as React from 'react';

import { tw } from 'tailwind';
import { Text } from 'react-native';
import { View } from 'react-native';

const MainPage: React.FC = () => {
  return (
    <View
      style={tw('h-full')}
      onStartShouldSetResponder={() => true}
      onResponderStart={(e) => {
        console.log(e);
      }}>
      <Text>Text</Text>
    </View>
  );
};

export default MainPage;
