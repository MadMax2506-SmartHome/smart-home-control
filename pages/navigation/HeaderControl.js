import React, {Component} from 'react';
//import { StyleSheet, View, Button, Text, } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

export default class HeaderControl extends Component  {
  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.props.navigation.navigate('Settings')}
        >
          <Image
            source={require('../../data/pictures/settings.png')}
            style={styles.ImageIconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    marginRight: 15,
  },
});
