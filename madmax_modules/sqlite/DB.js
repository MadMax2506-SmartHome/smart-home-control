import { openDatabase } from 'react-native-sqlite-storage';

const DB_NAME           = "smarthome.db";
const DB_TABLE_FEATURE  = "feature";
const DB_TABLE_USER     = "user";
const DB_TABLE_MQTT     = "mqtt";
const DB_TABLE_NAS      = "nas";


export default class DB {
  constructor(class_) {
    this.class_ = class_;
    this.con    = openDatabase({ name: DB_NAME });

    this.load_data = {
      feature: false,
      user: false,
      mqtt: false,
      nas: false,
    }

    this.is_empty = {
      feature: false,
      user: false,
      mqtt: false,
      nas: false,
    }

    this.data = {
      feature: {
        is_smart_home_control_active: false,
        is_nas_control_active: false,
      },
      user: {
        first_name: null,
        surname: null,
      },
      mqtt: {
        typ: null,
        ipaddress: null,
        port: null,
      },
      nas: {
        ipaddress: null,
        macaddress: null,
        username: null,
        password: null,
      }
    }

    this.create();

    this.select_feature();
    this.select_user();
    this.select_mqtt();
    this.select_nas();
  }

  is_data_load() {
    return (this.load_data.feature && this.load_data.user && this.load_data.mqtt && this.load_data.nas)
  }

  get_data() {
    return this.data
  }

  set_data(category, data) {
    this.load_data[category] = true

    if(data == null) {
      this.is_empty[category] = true
    } else {
      if(category == "feature") {
        data.is_smart_home_control_active = Boolean(data.is_smart_home_control_active)
        data.is_nas_control_active        = Boolean(data.is_nas_control_active)
      }
      this.data[category] = data
    }
  }

  create() {
    // feature
    var sql_feature = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_FEATURE + "("
      + "id int,"
      + "is_smart_home_control_active bool,"
      + "is_nas_control_active bool,"
      + "PRIMARY KEY(id));";

    // user
    var sql_user = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_USER + "("
      + "id int,"
      + "first_name char(255),"
      + "surname char(255),"
      + "PRIMARY KEY(id));";

    // mqtt
    var sql_mqtt = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_MQTT + "("
      + "id int,"
      + "typ char(10),"
      + "ipaddress char(15),"
      + "port int,"
      + "PRIMARY KEY(id));";

    // nas
    var sql_nas = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_NAS + "("
      + "id int,"
      + "ipaddress char(15),"
      + "macaddress char(12),"
      + "username char(255),"
      + "password char(255),"
      + "PRIMARY KEY(id));";

    // sql
    this.con.transaction(tx => {
      tx.executeSql(sql_feature, []);
      tx.executeSql(sql_user, []);
      tx.executeSql(sql_mqtt, []);
      tx.executeSql(sql_nas, []);
    });
  }

// feature
  is_feature_data_empty() {
    return this.is_empty.feature
  }

  get_feature_data() {
    return this.data.feature
  }

  get_is_smart_home_control_active() {
    return (this.data == null || this.data.feature.is_smart_home_control_active == null) ? '' : Boolean(this.data.feature.is_smart_home_control_active);
  }

  get_is_nas_control_active() {
    return (this.data == null || this.data.feature.is_nas_control_active == null) ? '' : Boolean(this.data.feature.is_nas_control_active);
  }

  insert_feature(data) {
    var sql     = "INSERT INTO " + DB_TABLE_FEATURE + "(id, is_smart_home_control_active, is_nas_control_active) VALUES(?, ?, ?);";
    var values  = [1, data.is_smart_home_control_active, data.is_nas_control_active];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  update_feature(data) {
    var sql     = "UPDATE " + DB_TABLE_FEATURE + " SET is_smart_home_control_active = ?, is_nas_control_active = ? WHERE id = ?;";
    var values  = [data.is_smart_home_control_active, data.is_nas_control_active, 1];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  select_feature() {
    var sql = "SELECT is_smart_home_control_active, is_nas_control_active FROM " + DB_TABLE_FEATURE + ";"

    this.con.transaction(tx => {
      tx.executeSql(sql, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.set_data_from_sqlite("feature", data);
        } else {
          this.class_.set_data_from_sqlite("feature", null);
        }
      });
    });
  }

// user
  is_user_data_empty() {
    return this.is_empty.user
  }

  get_user_data() {
    return this.data.user
  }

  get_name() {
  return (this.get_first_name() == "" || this.get_surname() == "") ? "" : this.get_first_name() + " " + this.get_surname()
  }

  get_first_name() {
    return (this.data == null || this.data.user.first_name == null) ? '' : this.data.user.first_name;
  }

  get_surname() {
    return (this.data == null || this.data.user.surname == null) ? '' : this.data.user.surname;
  }

  insert_user(data) {
    var sql     = "INSERT INTO " + DB_TABLE_USER + "(id, first_name, surname) VALUES(?, ?, ?);";
    var values  = [1, data.first_name, data.surname];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  update_user(data) {
    var sql     = "UPDATE " + DB_TABLE_USER + " SET first_name = ?, surname = ? WHERE id = ?;";
    var values  = [data.first_name, data.surname, 1];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  select_user() {
    var sql = "SELECT first_name, surname FROM " + DB_TABLE_USER + ";"

    this.con.transaction(tx => {
      tx.executeSql(sql, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.set_data_from_sqlite("user", data);
        } else {
          this.class_.set_data_from_sqlite("user", null);
        }
      });
    });
  }

// mqtt
  is_mqtt_data_empty() {
    return this.is_empty.mqtt
  }

  get_mqtt_data() {
    return this.data.mqtt
  }

  get_mqtt_uri() {
    return (this.get_mqtt_type() == "" || this.get_mqtt_ipaddress() == "" || this.get_mqtt_port() == "") ? "" : this.get_mqtt_type() + "://" + this.get_mqtt_ipaddress() + ":" + this.get_mqtt_port();
  }

  get_mqtt_type() {
    return (this.data == null || this.data.mqtt.type == null) ? 'mqtt' : this.data.mqtt.type;
  }

  get_mqtt_port() {
    return (this.data == null || this.data.mqtt.port == null) ? '' : this.data.mqtt.port.toString();
  }

  get_mqtt_ipaddress() {
    return (this.data == null || this.data.mqtt.ipaddress == null) ? '' : this.data.mqtt.ipaddress;
  }

  insert_mqtt(data) {
    var sql     = "INSERT INTO " + DB_TABLE_MQTT + "(id, typ, ipaddress, port) VALUES(?, ?, ?, ?);";
    var values  = [1, data.typ, data.ipaddress, parseInt(data.port)];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  update_mqtt(data) {
    var sql     = "UPDATE " + DB_TABLE_MQTT + " SET typ = ?, ipaddress = ?, port = ? WHERE id = ?;";
    var values  = [data.typ, data.ipaddress, parseInt(data.port), 1];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  select_mqtt() {
    var sql = "SELECT typ, ipaddress, port FROM " + DB_TABLE_MQTT + ";"

    this.con.transaction(tx => {
      tx.executeSql(sql, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          data.port = data.port.toString()
          this.class_.set_data_from_sqlite("mqtt", data);
        } else {
          this.class_.set_data_from_sqlite("mqtt", null);
        }
      });
    });
  }

// nas
  is_nas_data_empty() {
    return this.is_empty.nas
  }

  get_nas_data() {
    return this.data.nas
  }

  get_nas_ipaddress() {
    return (this.data == null || this.data.nas.ipaddress == null) ? '' : this.data.nas.ipaddress;
  }

  get_nas_macaddress() {
    return (this.data == null || this.data.nas.macaddress == null) ? '' : this.data.nas.macaddress;
  }

  get_nas_username() {
    return (this.data == null || this.data.nas.username == null) ? '' : this.data.nas.username;
  }

  get_nas_password() {
    return (this.data == null || this.data.nas.password == null) ? '' : this.data.nas.password;
  }

  insert_nas(data) {
    var sql     = "INSERT INTO " + DB_TABLE_NAS + "(id, ipaddress, macaddress, username, password) VALUES(?, ?, ?, ?, ?);";
    var values  = [1, data.ipaddress, data.macaddress, data.username, data.password];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  update_nas(data) {
    var sql     = "UPDATE " + DB_TABLE_NAS + " SET ipaddress = ?, macaddress = ?, username = ?, password = ? WHERE id = ?;";
    var values  = [data.ipaddress, data.macaddress, data.username, data.password, 1];

    this.con.transaction(tx => {
      tx.executeSql(sql, values);
    });
  }

  select_nas() {
    var sql = "SELECT ipaddress, macaddress, username, password FROM " + DB_TABLE_NAS + ";"

    this.con.transaction(tx => {
      tx.executeSql(sql, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.set_data_from_sqlite("nas", data);
        } else {
          this.class_.set_data_from_sqlite("nas", null);
        }
      });
    });
  }
}
