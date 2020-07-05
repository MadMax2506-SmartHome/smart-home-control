import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, View, Text, Button } from 'react-native';

export default class ControlView extends Component {
  render() {
    return(
      <View style={style.main}>
        <View>
          <ActivityIndicator size="large" color="#00000" />
        </View>
        <View style={style.info}>
          <Text>{(this.props.text == undefined) ? '' : this.props.text}</Text>
        </View>
        <View style={style.btn}>
          <Button
            title="Abbrechen"
            color = "#000000"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  main: {
    alignItems: 'center',
  },
  info: {
    marginTop: 20
  },
  btn: {
    marginTop: 20
  }
});
