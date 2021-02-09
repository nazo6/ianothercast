import * as React from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  Text,
  View,
} from 'react-native';
import { tw } from 'tailwind';
import { RoconRoot } from 'rocon/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { RecoilRoot } from 'recoil';

const MouseHandlerEventEmitter = new NativeEventEmitter(
  NativeModules.MouseHandler,
);

const Root = () => {
  const history = React.useMemo(() => {
    return createMemoryHistory();
  }, []);
  const [url, setUrl] = React.useState('');
  React.useEffect(() => {
    let unlisten = history.listen(({ location }) => {
      setUrl(`${location.pathname}${location.search}${location.hash}`);
    });
    const fn = async () => {
      if (Platform.OS === 'windows') {
        await NativeModules.MouseHandler.Register();
        MouseHandlerEventEmitter.addListener('XButton1Click', () => {
          console.log('back');
          history.back();
        });
        MouseHandlerEventEmitter.addListener('XButton2Click', () => {
          history.forward();
        });
      }
    };
    fn();
    return () => {
      unlisten();
      if (Platform.OS === 'windows') {
        NativeModules.MouseHandler.Remove();
        MouseHandlerEventEmitter.removeAllListeners('XButton1Click');
        MouseHandlerEventEmitter.removeAllListeners('XButton2Click');
      }
    };
  }, []);
  return (
    <>
      <View style={tw('h-full')}>
        <RoconRoot history={history}>
          <RecoilRoot>
            <Text>{url}</Text>
            <App />
          </RecoilRoot>
        </RoconRoot>
      </View>
    </>
  );
};

export default Root;
