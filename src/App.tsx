import React from 'react';
import {StatusBar, Text, View} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar />
      <View style={{flex: 1, backgroundColor: 'grey'}}>
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Text>aaa</Text>
        </View>
        <View style={{height: 100, backgroundColor: 'green'}} />
      </View>
    </>
  );
};

export default App;
