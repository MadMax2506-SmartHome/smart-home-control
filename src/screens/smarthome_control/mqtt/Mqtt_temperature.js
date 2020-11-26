// MQTT
import MQTT from 'sp-react-native-mqtt';

import Mqtt_notifications_listener_temperature from './Mqtt_notifications_listener_temperature.js'

export default class Mqtt_temperature {
  constructor(_class, uri, qos) {
    this._class   = _class;
    this.uri      = uri;
    this.qos      = qos;
  }

  get_client(clientId) {
    return MQTT.createClient({
      uri: this.uri,
      clientId: "SmartHomeApp_" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
    });
  }

  disconnect() {
    this.delete_device_listener();
    this.delete_global_status_listener();
  }

  delete_temperature_listener() {
    Mqtt_notifications_listener_temperature.disconnect();
  }

  set_temperature_listener(channel) {
    Mqtt_notifications_listener_temperature.create(this._class, this.get_client(), channel, this.qos);
  }
}
