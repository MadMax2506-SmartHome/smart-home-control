import { openDatabase } from 'react-native-sqlite-storage';

const DB_NAME         = "smarthome.db";
const DB_TABLE_GLOBAL = "smarthome";
const DB_TABLE_MQTT   = "mqtt";
const DB_TABLE_NAS    = "nas";
const DB_TABLE_USER   = "user";

export default class DB {
  constructor(class_) {
    this.class_ = class_;
    this.con    = openDatabase({ name: DB_NAME });

    this.data = {
      user: {},
      mqtt: {},
      nas: {}
    }

    this.create();

    this.select_user();
    this.select_mqtt();
    this.select_nas();
  }

  set_data(option, data) {
    this.data[option] = data
  }

  create() {
    // user
    var sql_user = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_USER + "("
      + "userid int,"
      + "first_name char(255),"
      + "surname char(255),"
      + "PRIMARY KEY(userid));";

    // mqtt
    var sql_mqtt = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_MQTT + "("
      + "mqttid int,"
      + "typ char(10),"
      + "ipaddress char(15),"
      + "port int,"
      + "PRIMARY KEY(mqttid));";

    // nas
    var sql_nas = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_NAS + "("
      + "nasid int,"
      + "ipaddress char(15),"
      + "macaddress char(12),"
      + "username char(255),"
      + "password char(255),"
      + "PRIMARY KEY(nasid));";

    //sql
    this.con.transaction(tx => {
      tx.executeSql(sql_user, []);
      tx.executeSql(sql_mqtt, []);
      tx.executeSql(sql_nas, []);
    });
  }

// user
  get_name() {
    return this.get_first_name() + " " + this.get_surname()
  }

  get_first_name() {
    return (this.data == null || this.data.first_name == null) ? '' : this.data.first_name;
  }

  get_surname() {
    return (this.data == null || this.data.surname == null) ? '' : this.data.surname;
  }

  insert_user(values) {
    var sql_user     = "INSERT INTO " + DB_TABLE_USER + "(userid, first_name, surname) VALUES(?, ?, ?);";

    var values_user  = [1, values.first_name, values.surname];
  }

  update_user(values) {
    var sql_user     = "UPDATE " + DB_TABLE_USER + " SET first_name = ?, surname = ? WHERE userid = ?;";
    var values_user  = [values.first_name, values.surname, 1];

    this.con.transaction(tx => {
      tx.executeSql(sql_user, values_user);
    });
  }

  select_user() {
    var sql_user = "SELECT first_name, surname FROM " + DB_TABLE_USER + ";"
    this.con.transaction(tx => {
      tx.executeSql(sql_user, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.set_data_from_sqlite("user", data);
        } else {
          this.insert_user({first_name: "", surname: ""})
          this.class_.set_data_from_sqlite("user", null);
        }
      });
    });
  }

// mqtt
  get_mqtt_uri() {
    return this.get_mqtt_type() + "://" + this.get_mqtt_ipaddress() + ":" + this.get_mqtt_port();
  }

  get_mqtt_type() {
    return (this.data == null || this.data.mqtt_type == null) ? 'mqtt' : this.data.mqtt_type;
  }

  get_mqtt_port() {
    return (this.data == null || this.data.mqtt_port == null) ? '' : this.data.mqtt_port.toString();
  }

  get_mqtt_ipaddress() {
    return (this.data == null || this.data.mqtt_ipaddress == null) ? '' : this.data.mqtt_ipaddress;
  }

  insert_mqtt(values) {
    var sql_mqtt     = "INSERT INTO " + DB_TABLE_MQTT + "(mqttid, typ, ipaddress, port) VALUES(?, ?, ?, ?);";

    var values_mqtt  = [1, values.mqtt_typ, values.mqtt_ipaddress, parseInt(values.mqtt_port)];
  }

  update_mqtt(values) {
    var sql_mqtt     = "UPDATE " + DB_TABLE_MQTT + " SET typ = ?, ipaddress = ?, port = ? WHERE mqttid = ?;";
    var values_mqtt  = [values.typ, values.ipaddress, parseInt(values.port), 1];

    this.con.transaction(tx => {
      tx.executeSql(sql_mqtt, values_mqtt);
    });
  }

  select_mqtt() {
    var sql_mqtt = "SELECT typ, ipaddress, port FROM " + DB_TABLE_MQTT + ";"
    this.con.transaction(tx => {
      tx.executeSql(sql_mqtt, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.set_data_from_sqlite("mqtt", data);
        } else {
          this.insert_user({typ: "mqtt", ipaddress: "", port: ""})
          this.class_.set_data_from_sqlite("mqtt", null);
        }
      });
    });
  }

// nas
  get_nas_data() {
    return this.data.nas
  }

  get_nas_ipaddress() {
    return (this.data == null || this.data.nas.ipaddress == null) ? '' : this.data.nas_ipaddress;
  }

  get_nas_macaddress() {
    return (this.data == null || this.data.nas.macaddress == null) ? '' : this.data.nas_macaddress;
  }

  get_nas_user() {
    return (this.data == null || this.data.nas.username == null) ? '' : this.data.nas_username;
  }

  get_nas_password() {
    return (this.data == null || this.data.nas.password == null) ? '' : this.data.nas_password;
  }

  insert_nas(values) {
    var sql_nas      = "INSERT INTO " + DB_TABLE_NAS + "(nasid, ipaddress, macaddress, username, password) VALUES(?, ?, ?, ?, ?);";

    var values_nas   = [1, values.nas_ipaddress, values.nas_macaddress, values.nas_user, values.nas_password];
  }

  update_nas(values) {
    var sql_nas     = "UPDATE " + DB_TABLE_NAS + " SET ipaddress = ?, macaddress = ?, username = ?, password = ? WHERE nasid = ?;";
    var values_nas  = [values.ipaddress, values.macaddress, values.username, values.password, 1];

    this.con.transaction(tx => {
      tx.executeSql(sql_nas, values_nas);
    });
  }

  select_nas() {
    var sql_nas = "SELECT ipaddress, macaddress, username, password FROM " + DB_TABLE_NAS + ";"
    this.con.transaction(tx => {
      tx.executeSql(sql_nas, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.set_data_from_sqlite("nas", data);
        } else {
          this.insert_user({ipaddress: "", macaddress: "", username: "", password: ""})
          this.class_.set_data_from_sqlite("nas", null);
        }
      });
    });
  }
}
