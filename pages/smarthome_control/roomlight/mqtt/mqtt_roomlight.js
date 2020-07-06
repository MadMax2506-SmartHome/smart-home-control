import MQTT from 'sp-react-native-mqtt';

import MqttNotificationListener_Devices from './mqtt_notification_listener_devices.js'
import MqttNotificationsListenerGlobalStatus from './mqtt_notifications_listener_global_status.js';

export default class MqttRoomlight {
  constructor(roomlight, uri, qos) {
    this.roomlight  = roomlight;
    this.uri        = uri;
    this.qos        = qos;
  }

  getClient(clientId) {
    return MQTT.createClient({
      uri: this.uri,
      clientId: "SmartHomeApp_" + (((1+Math.random())*0x1000000)|0).toString(16).substring(1),
    });
  }

  deleteDeviceListener() {
    MqttNotificationListener_Devices.disconnect();
  }

  setDeviceListener(channel) {
    MqttNotificationListener_Devices.create(this.roomlight, this.getClient(), channel, this.qos);
  }

  deleteGlobalStatusListener() {
    MqttNotificationsListenerGlobalStatus.disconnect();
  }

  setGlobalStatusListener(channel) {
    MqttNotificationsListenerGlobalStatus.create(this.roomlight, this.getClient(), channel, this.qos);
  }

  publish(topic, msg, retained) {
    this.getClient().then(function(client) {
      client.on('connect', function() {
        client.publish(topic, msg, 0, retained);
      });
      client.connect();
    }).catch();
  }
}
