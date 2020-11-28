import React, {Component} from 'react';
import { View, Text, Switch } from 'react-native';

import { StyleText } from '../../../../res/style/style.js'
import { StyleGroup } from '../../../../res/style/input.js'

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
          <View style={StyleGroup.header}>
            <Text style={StyleText()}>
              LED-Leiste (ON | OFF)
            </Text>
          </View>
          <View style={StyleGroup.main}>
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
