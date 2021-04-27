import React, {Component} from 'react';
import {View, Text} from 'react-native';

// Style
import {StyleMain, StyleText, Color} from '../../../res/style/style.js';

// Components
import Logo from '../../../components/Logo.js';

//I18n
import DESIGNATIONS from '../../../res/Designations.js';

export default class HomeTab extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data;
  }

  render() {
    var {user} = this.data;

    return (
      <View style={StyleMain.container}>
        <Logo />

        <Text style={StyleText(Color.black, '2%', 'center')}>
          {DESIGNATIONS.welcome(user.get_data())}
        </Text>
      </View>
    );
  }
}
