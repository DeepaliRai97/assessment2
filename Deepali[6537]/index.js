import { AppRegistery } from 'react-native';
import App from './App';
import { name as appname } from './app.json';
import 'react-native-gesture-handler';

AppRegistery.registerComponent(appname, () => App);