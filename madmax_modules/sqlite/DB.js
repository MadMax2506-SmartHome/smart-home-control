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
    this.data = {
      feature: {
        is_smart_home_control_active: null,
        is_nas_control_active: null,
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
    return (this.load_data.feature && this.load_data.user && this.load_data.mqtt && this.load_data.nas) == true ? true : false
  }

  get_data() {
    return this.data
  }

  set_data(category, data) {
    if(data != null) {
      if(category == "feature") {
        data.is_smart_home_control_active = Boolean(data.is_smart_home_control_active)
        data.is_nas_control_active        = Boolean(data.is_nas_control_active)
      }

      this.data[category]       = data
      this.load_data[category]  = true
    }
  }

  create() {
    // feature
    var sql_feature = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_FEATURE + "("
      + "feature_id int,"
      + "is_smart_home_control_active bool,"
      + "is_nas_control_active bool,"
      + "PRIMARY KEY(feature_id));";

    // user
    var sql_user = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_USER + "("
      + "user_id int,"
      + "first_name char(255),"
      + "surname char(255),"
      + "PRIMARY KEY(user_id));";

    // mqtt
    var sql_mqtt = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_MQTT + "("
      + "mqtt_id int,"
      + "typ char(10),"
      + "ipaddress char(15),"
      + "port int,"
      + "PRIMARY KEY(mqtt_id));";

    // nas
    var sql_nas = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_NAS + "("
      + "nas_id int,"
      + "ipaddress char(15),"
      + "macaddress char(12),"
      + "username char(255),"
      + "password char(255),"
      + "PRIMARY KEY(nas_id));";

    //sql
    this.con.transaction(tx => {
      tx.executeSql(sql_feature, []);
      tx.executeSql(sql_user, []);
      tx.executeSql(sql_mqtt, []);
      tx.executeSql(sql_nas, []);
    });
  }

// feature
  is_feature_data_empty() {
    let { feature } = this.data

    if(feature.is_smart_home_control_active == null
      && feature.is_nas_control_active == null) {
      return true
    } else {
      return false
    }
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

  insert_feature(values) {
    var sql_feature     = "INSERT INTO " + DB_TABLE_FEATURE + "(feature_id, is_smart_home_control_active, is_nas_control_active) VALUES(?, ?, ?);";

    var values_feature  = [1, values.is_smart_home_control_active, values.is_nas_control_active];
    this.con.transaction(tx => {
      tx.executeSql(sql_feature, values_feature);
    });
  }

  update_feature(values) {
    var sql_feature     = "UPDATE " + DB_TABLE_FEATURE + " SET is_smart_home_control_active = ?, is_nas_control_active = ? WHERE feature_id = ?;";
    var values_feature  = [values.is_smart_home_control_active, values.is_nas_control_active, 1];

    this.con.transaction(tx => {
      tx.executeSql(sql_feature, values_feature);
    });
  }

  select_feature() {
    var sql_feature = "SELECT is_smart_home_control_active, is_nas_control_active FROM " + DB_TABLE_FEATURE + ";"
    this.con.transaction(tx => {
      tx.executeSql(sql_feature, [], (tx, res) => {
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
    let { user } = this.data

    if(user.first_name == null
      && user.surname == null) {
      return true
    } else {
      return false
    }
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

  insert_user(values) {
    var sql_user     = "INSERT INTO " + DB_TABLE_USER + "(user_id, first_name, surname) VALUES(?, ?, ?);";

    var values_user  = [1, values.first_name, values.surname];
    this.con.transaction(tx => {
      tx.executeSql(sql_user, values_user);
    });
  }

  update_user(values) {
    var sql_user     = "UPDATE " + DB_TABLE_USER + " SET first_name = ?, surname = ? WHERE user_id = ?;";
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
          this.class_.set_data_from_sqlite("user", null);
        }
      });
    });
  }

// mqtt
  is_mqtt_data_empty() {
    let { mqtt } = this.data

    if(mqtt.typ == null
      && mqtt.ipaddress == null
      && mqtt.port == null) {
      return true
    } else {
      return false
    }
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

  insert_mqtt(values) {
    var sql_mqtt     = "INSERT INTO " + DB_TABLE_MQTT + "(mqtt_id, typ, ipaddress, port) VALUES(?, ?, ?, ?);";

    var values_mqtt  = [1, values.typ, values.ipaddress, parseInt(values.port)];

    this.con.transaction(tx => {
      tx.executeSql(sql_mqtt, values_mqtt);
    });
  }

  update_mqtt(values) {
    var sql_mqtt     = "UPDATE " + DB_TABLE_MQTT + " SET typ = ?, ipaddress = ?, port = ? WHERE mqtt_id = ?;";
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
    let { nas } = this.data

    if(nas.ipaddress == null
      && nas.macaddress == null
      && nas.username == null
      && nas.password == null) {
      return true
    } else {
      return false
    }
  }

  get_nas_data() {
    return this.data.nas
  }

  get_nas_ipaddress() {
    return (this.data == null || this.data.nas.ipaddress == null) ? '' : this.data.nas_ipaddress;
  }

  get_nas_macaddress() {
    return (this.data == null || this.data.nas.macaddress == null) ? '' : this.data.nas_macaddress;
  }

  get_nas_username() {
    return (this.data == null || this.data.nas.username == null) ? '' : this.data.nas_username;
  }

  get_nas_password() {
    return (this.data == null || this.data.nas.password == null) ? '' : this.data.nas_password;
  }

  insert_nas(values) {
    var sql_nas      = "INSERT INTO " + DB_TABLE_NAS + "(nas_id, ipaddress, macaddress, username, password) VALUES(?, ?, ?, ?, ?);";

    var values_nas   = [1, values.ipaddress, values.macaddress, values.username, values.password];

    this.con.transaction(tx => {
      tx.executeSql(sql_nas, values_nas);
    });
  }

  update_nas(values) {
    var sql_nas     = "UPDATE " + DB_TABLE_NAS + " SET ipaddress = ?, macaddress = ?, username = ?, password = ? WHERE nas_id = ?;";
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
          this.class_.set_data_from_sqlite("nas", null);
        }
      });
    });
  }
}
