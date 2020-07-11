import React, {Component} from 'react';

// Navigation
import Navigation from './pages/navigation/Navigation.js'

// Warnungen ausblenden
console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigation />
    );
  }
};
