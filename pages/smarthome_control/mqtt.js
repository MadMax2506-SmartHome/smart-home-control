import MQTT from 'sp-react-native-mqtt';

import Check_mqtt_server from '../../madmax_modules/mqtt/check_mqtt_server.js'

export default class MqttHome {
  constructor(class_, uri) {
    Check_mqtt_server.check(class_, this.getClient(uri));
  }

  disconnect() {
    Check_mqtt_server.disconnect()
  }

  getClient(uri) {
    return MQTT.createClient({
      uri: uri,
      clientId: "SmartHomeApp_" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
    });
  }
}
