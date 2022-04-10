import { registerRootComponent } from 'expo';
import { typography } from './utils/Typography';

import App from './App';

typography();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
