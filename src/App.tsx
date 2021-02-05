import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import tailwind from 'tailwind-rn';

const App = () => {
  return (
    <>
      <SafeAreaView style={tailwind('h-full')}>
        <View style={tailwind('pt-12 items-center')}>
          <View style={tailwind('rounded-3xl py-3 px-6 bg-blue-200')}>
            <Text style={tailwind('text-blue-800 font-semibold')}>
              Hello Tailwind
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
