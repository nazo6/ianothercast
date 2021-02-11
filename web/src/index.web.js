import { AppRegistry } from 'react-native';
import Root from '../../src/Root';

AppRegistry.registerComponent('App', () => Root);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
