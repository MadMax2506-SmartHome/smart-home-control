import React, {Component} from 'react';

// SplashScreen
import SplashScreen from 'react-native-splash-screen'

// Navigation
import Navigation from './pages/navigation/Navigation.js'

import {SafeAreaProvider} from 'react-native-safe-area-context';

// Warnungen ausblenden
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);

    SplashScreen.show()
  }

  render() {
    return (
      <SafeAreaProvider>
        <Navigation/>
      </SafeAreaProvider>
    );
  }
}
