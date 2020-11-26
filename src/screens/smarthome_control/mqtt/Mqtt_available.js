// MQTT
import MQTT from 'sp-react-native-mqtt';

import Check_mqtt_server from '../../../components/check_mqtt_server.js'

export default class Mqtt_available {
  constructor(_class, uri) {
    Check_mqtt_server.check(_class, this.getClient(uri));
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
