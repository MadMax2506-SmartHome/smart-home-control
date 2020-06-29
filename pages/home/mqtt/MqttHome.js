import MQTT from 'sp-react-native-mqtt';

import CheckMqttServer from '../../../madmax_modules/mqtt/CheckMqttServer.js'

export default class MqttHome {
  constructor(class_, uri) {
    CheckMqttServer.check(class_, this.getClient(uri));
  }
  getClient(uri) {
    return MQTT.createClient({
      uri: uri,
      clientId: "SmartHomeApp_" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
    });
  }
}
