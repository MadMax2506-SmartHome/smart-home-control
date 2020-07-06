import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

export default class ControlRight extends Component  {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.elem}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Settings')}
          >
            <Image
              source={require('../../../data/pictures/settings.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.elem}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Image
              source={require('../../../data/pictures/logout.png')}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    marginRight: 15,
  },
  elem: {
    marginLeft: 10
  }
});