import * as React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {tw} from 'tailwind';

const App = () => {
  return (
    <>
      <SafeAreaView style={tw('h-full')}>
        <View style={tw('pt-12 items-center')}>
          <View style={tw('rounded-3xl py-3 px-6 bg-blue-200')}>
            <Text style={tw('text-blue-800 font-semibold')}>
              Hello Tailwind
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
