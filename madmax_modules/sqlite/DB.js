import { openDatabase } from 'react-native-sqlite-storage';

const DB_NAME         = "smarthome.db";
const DB_TABLE_GLOBAL = "smarthome";
const DB_TABLE_MQTT   = "mqtt";
const DB_TABLE_USER   = "user";

export default class DB {
  constructor(class_) {
    this.data   = null;
    this.class_ = class_;
    this.con    = openDatabase({ name: DB_NAME });

    this.create();
    this.select();
  }

  create() {
    //user
    var sqlUser = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_USER + "("
      + "userid int,"
      + "vorname char(255),"
      + "nachname char(255),"
      + "PRIMARY KEY(userid));";

    //mqtt
    var sqlMqtt = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_MQTT + "("
      + "mqttid int,"
      + "typ char(10),"
      + "ipadresse char(15),"
      + "port int,"
      + "PRIMARY KEY(mqttid));";

    //global
    var sqlGlobal = "CREATE TABLE IF NOT EXISTS " + DB_TABLE_GLOBAL + "("
      + "userid int, "
      + "mqttid int, "
      + "PRIMARY KEY(userid, mqttid),"
      + "FOREIGN KEY(userid) REFERENCES " + DB_TABLE_USER + "(userid),"
      + "FOREIGN KEY(mqttid) REFERENCES " + DB_TABLE_MQTT + "(mqttid));";

    //sql
    this.con.transaction(tx => {
      tx.executeSql(sqlUser, []);
      tx.executeSql(sqlMqtt, []);
      tx.executeSql(sqlGlobal, []);
    });
  }

  insert(vorname, nachname, typ, ipAdresse, port) {
    //user
    var sqlUser     = "INSERT INTO " + DB_TABLE_USER + "(userid, vorname, nachname) VALUES(?, ?, ?);";
    var valuesUser  = [1, vorname, nachname];

    //mqtt
    var sqlMqtt     = "INSERT INTO " + DB_TABLE_MQTT + "(mqttid, typ, ipadresse, port) VALUES(?, ?, ?, ?);";
    var valuesMqtt  = [1, typ, ipAdresse, parseInt(port)];

    //global
    var sqlGlobal     = "INSERT INTO " + DB_TABLE_GLOBAL + "(userid, mqttid) VALUES(?, ?);";
    var valuesGlobal  = [1, 1];

    this.con.transaction(tx => {
      tx.executeSql(sqlUser, valuesUser);
      tx.executeSql(sqlMqtt, valuesMqtt);
      tx.executeSql(sqlGlobal, valuesGlobal);
    });
  }

  update(vorname, nachname, typ, ipAdresse, port) {
    //user
    var sqlUser     = "UPDATE " + DB_TABLE_USER + " SET vorname = ?, nachname = ? WHERE userid = ?;";
    var valuesUser  = [vorname, nachname, 1];

    //mqtt
    var sqlMqtt     = "UPDATE " + DB_TABLE_MQTT + " SET typ = ?, ipAdresse = ?, port = ? WHERE mqttid = ?;";
    var valuesMqtt  = [typ, ipAdresse, parseInt(port), 1];

    this.con.transaction(tx => {
      tx.executeSql(sqlUser, valuesUser);
      tx.executeSql(sqlMqtt, valuesMqtt);
    });
  }

  select() {
    var sql     = "SELECT u.vorname, u.nachname, m.typ, m.ipAdresse, m.port FROM (" + DB_TABLE_GLOBAL + " s INNER JOIN " + DB_TABLE_USER + " u ON u.userid=s.userid) INNER JOIN " + DB_TABLE_MQTT + " m ON m.mqttid=s.mqttid;"
    this.con.transaction(tx => {
      tx.executeSql(sql, [], (tx, res) => {
        var length = res.rows.length;
        if(length > 0) {
          var data = res.rows.item(0);
          this.class_.setDataFromSQLite(data);
        } else {
          this.class_.setDataFromSQLite(null);
        }
      });
    });
  }

// global
  setData(data) {
    this.data = data;
  }

  checkIfDataNull() {
    return (this.getUser() == '' || this.getMqttUri() == '') ? true : false;
  }

//user
  getVorname() {
    return (this.data == null || this.data.vorname == null) ? '' : this.data.vorname;
  }

  getNachname() {
    return (this.data == null || this.data.nachname == null) ? '' : this.data.nachname;
  }

  getUser() {
    return (this.getVorname() == '' || this.getNachname() == '') ? '' : this.getVorname() + " " + this.getNachname();
  }

//mqtt
  getType() {
    return (this.data == null || this.data.typ == null) ? '' : this.data.typ;
  }

  getPort() {
    return (this.data == null || this.data.port == null) ? '' : this.data.port.toString();
  }

  getIpAddress() {
    return (this.data == null || this.data.ipadresse == null) ? '' : this.data.ipadresse;
  }

  getMqttUri() {
    return (this.getType() == '' || this.getIpAddress() == '' || this.getPort() == '') ? '' : this.getType() + "://" + this.getIpAddress() + ":" + this.getPort();
  }
}
