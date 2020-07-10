import React, {Component} from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ControlRight extends Component  {
  render() {
    return (
      <View style={styles.main}>
        <View style={styles.elem}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.onPress()}
          >
            <Ionicons name="save" size={40} color="black"/>
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
