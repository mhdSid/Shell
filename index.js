/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// console.disableYellowBox = true;
const RenderApp = () => App;
AppRegistry.registerComponent(appName, RenderApp);
