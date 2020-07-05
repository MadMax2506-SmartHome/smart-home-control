import React, {Component} from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

export default class Status extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status,
    }
  }

  render() {
    return (
        <View>
          <View style={style.header}>
            <Text>
              LED-Leiste (ON | OFF):
            </Text>
          </View>
          <View style={style.main}>
            <Switch
              value={this.state.status}
              onValueChange={(status) => {
                this.setState({status: status});
                if(this.props.onChange != undefined) {
                  this.props.onChange(status)
                }
              }}
            />
        </View>
      </View>
    );
  }
};

const style = StyleSheet.create({
  header: {
    width: "100%",
  },
  main: {
    width: "100%",
    alignItems: 'flex-start',
    paddingLeft: "3%",
    paddingRight: "3%",
  },
});
