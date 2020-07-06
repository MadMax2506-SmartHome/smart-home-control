import React, {Component} from 'react';
import { View, StatusBar } from 'react-native';

import Navigation from './pages/navigation/navigation.js'

export default class App extends Component {
  render() {
    return (
      <Navigation />
    );
  }
};
