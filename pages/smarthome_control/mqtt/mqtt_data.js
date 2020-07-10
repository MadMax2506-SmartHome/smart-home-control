import MQTT from 'sp-react-native-mqtt';

import Mqtt_notification_listener_devices from './Mqtt_notification_listener_devices.js'
import Mqtt_notifications_listener_global_status from './Mqtt_notifications_listener_global_status.js';

export default class Mqtt_data {
  constructor(_class, uri, qos) {
    this._class  = _class;
    this.uri        = uri;
    this.qos        = qos;
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

  delete_device_listener() {
    Mqtt_notification_listener_devices.disconnect();
  }

  set_device_listener(channel) {
    Mqtt_notification_listener_devices.create(this._class, this.get_client(), channel, this.qos);
  }

  delete_global_status_listener() {
    Mqtt_notifications_listener_global_status.disconnect();
  }

  set_global_status_listener(channel) {
    Mqtt_notifications_listener_global_status.create(this._class, this.get_client(), channel, this.qos);
  }

  publish(topic, msg, retained) {
    this.get_client().then(function(client) {
      client.on('connect', function() {
        client.publish(topic, msg, 0, retained);
      });
      client.connect();
    }).catch();
  }
}
