import _ from 'underscore';

module.exports = {
  check(_class, mqttClient) {
    if (!mqttClient) {
      return;
    }
    this.onConnect    = this.onConnect.bind(this);
    this.onClosed     = this.onClosed.bind(this);
    this.onError      = this.onError.bind(this);
    this.onMessage    = this.onMessage.bind(this);
    this.disconnect   = this.disconnect.bind(this);

    this.config = _.extend({
      _class: _class,
    });

    mqttClient.then((client) => {
      this.client = client;
      client.on('closed', this.onClosed);
      client.on('error', this.onError);
      client.on('message', this.onMessage);
      client.on('connect', this.onConnect);
      client.connect();
    }).catch();

  },
  disconnect() {
    if(this.client) {
      console.log('Now killing open mqtt availability listener manager.');
      this.client.disconnect();
    }
  },
  onError(error) {},
  onConnect() {
    this.config._class.set_mqtt_brocker_to_available();
  },
  onClosed(err) {},
  onMessage(msg) {},
};
