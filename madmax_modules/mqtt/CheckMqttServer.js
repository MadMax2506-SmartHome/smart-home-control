import _ from 'underscore';

module.exports = {
  check(class_, mqttClient) {
    if (!mqttClient) {
      return;
    }
    this.onConnect    = this.onConnect.bind(this);
    this.onClosed     = this.onClosed.bind(this);
    this.onError      = this.onError.bind(this);
    this.onMessage    = this.onMessage.bind(this);
    this.disconnect   = this.disconnect.bind(this);

    this.config = _.extend({
      class_: class_,
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
      console.log('Now killing open mqtt notification manager.');
      this.client.disconnect();
    }
  },
  onError(error) {},
  onConnect() {
    this.config.class_.setMqttServerToAvailable();
  },
  onClosed(err) {},
  onMessage(msg) {},
};
