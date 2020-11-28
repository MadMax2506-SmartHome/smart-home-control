import React, {Component} from 'react';
import { Text, View } from 'react-native';

import { Color, Font, StyleMain, StyleHeadline } from '../../res/style/style.js'
import { StyleOutput } from '../../res/style/output.js'

export default class RoomThermometerTab extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data

    var { mqtt } =  this.data;
    var room_thermometer = mqtt.get_room_thermometer_device();
    room_thermometer.register_update_function(() => this.refresh_temperature())
  }

  refresh_temperature() {
    this.setState({});
  }

  render() {
    var { mqtt } =  this.data;
    var room_thermometer = mqtt.get_room_thermometer_device();

    var humidity    = room_thermometer.get_humidity();
    var temperature = room_thermometer.get_temperature();

    return (
      <View style={StyleMain.container}>
        <View>
          <Text style={StyleHeadline(Color.black, 0, 0, 'auto', Font.size.headline.two)}>
            Thermometer
          </Text>
        </View>

        <View style={[StyleOutput.panel, {marginTop: "5%"}]}>
          <View style={StyleOutput.wrapper_label}>
            <Text style={StyleOutput.label}>
              Temperatur
            </Text>
          </View>
          <View style={StyleOutput.wrapper_value}>
            <Text style={StyleOutput.value}>
              { temperature } ° Celsius
            </Text>
          </View>
        </View>

        <View style={StyleOutput.panel}>
          <View style={StyleOutput.wrapper_label}>
            <Text style={StyleOutput.label}>
              Luftfeuchtigkeit
            </Text>
          </View>
          <View style={StyleOutput.wrapper_value}>
            <Text style={StyleOutput.value}>
              { humidity } %
            </Text>
          </View>
        </View>
      </View>
    );
  }
};
