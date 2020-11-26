import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, View, Text, Button } from 'react-native';

export default class Load_data extends Component {
  render() {
    let button = this.props.abort == null ? null : <Button title="Abbrechen" color = "#000000" onPress={() => this.props.abort()}/>
    let text = (this.props.text == undefined) ? '' : this.props.text

    return (
      <View style={style.main}>
        <View>
          <ActivityIndicator size="large" color="#00000" />
        </View>
        <View style={style.info}>
          <Text>{text}</Text>
        </View>
        <View style={style.btn}>{button}</View>
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
