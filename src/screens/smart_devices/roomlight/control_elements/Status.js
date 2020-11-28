import React, {Component} from 'react';
import { View, Text, Switch } from 'react-native';

// Style
import { StyleText } from '../../../../res/style/style.js'
import { StyleGroup } from '../../../../res/style/input.js'

//I18n
import I18n from '../../../../i18n/i18n.js';

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
              {I18n.t("smart_home.light.control.status")}
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
