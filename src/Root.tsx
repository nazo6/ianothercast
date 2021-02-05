import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { tw } from 'tailwind';
import { RoconRoot } from 'rocon/react';
import App from './App';
import { createMemoryHistory } from 'history';
import { RecoilRoot } from 'recoil';

const Root = () => {
  const history = React.useMemo(() => {
    return createMemoryHistory();
  }, []);
  return (
    <>
      <SafeAreaView style={tw('h-full')}>
        <RoconRoot history={history}>
          <RecoilRoot>
            <App />
          </RecoilRoot>
        </RoconRoot>
      </SafeAreaView>
    </>
  );
};

export default Root;
