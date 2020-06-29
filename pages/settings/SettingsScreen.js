import React, {Component} from 'react';
import { StyleSheet, ScrollView, View, Text, Button, TextInput, ToastAndroid, BackHandler } from 'react-native';

import DB from '../../madmax_modules/sqlite/DB.js'
import STYLE from '../../data/config/style.js'

import LoadData from "../../madmax_modules/loadData/LoadData.js"

export default class SettingsScreen extends Component  {
  constructor(props) {
    super(props);

    this.db = new DB(this);
    this.newTupel = true;
    this.state = {
      values: {
        uri: null,
        vorname: null,
        nachname: null,
        ipAddress: null,
        port: null,
      },
      dataIsLoadedFromSQLiteDB: false,
    }
  }

  setDataFromSQLite(data) {
    this.db.setData(data)

    let values        = this.state.values;
    values.vorname    = this.db.getVorname();
    values.nachname   = this.db.getNachname();

    values.ipAddress  = this.db.getIpAddress();
    values.port       = this.db.getPort();
    this.newTupel     = this.db.checkIfDataNull();
    this.setState({
        values: values,
        dataIsLoadedFromSQLiteDB: true,
    });
  }

  onChangeText(elem, value) {
    var values = this.state.values;
    values[elem] = value;
    this.setState({values: values});
  }

  saveData() {
    if(!this.validData()) {
      ToastAndroid.show('Ungültige Eingaben!', ToastAndroid.SHORT);
      return;
    }

    if(this.newTupel) {
      this.db.insert(this.state.values.vorname, this.state.values.nachname, "mqtt", this.state.values.ipAddress, this.state.values.port);
    } else {
      this.db.update(this.state.values.vorname, this.state.values.nachname, "mqtt", this.state.values.ipAddress, this.state.values.port);
    }

    if(this.db.getIpAddress() == this.state.values.ipAddress
      && this.db.getPort() == this.state.values.port) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate("Home");
    }
  }

  validData() {
    if(this.state.values.vorname.length < 3
      || this.state.values.nachname.length < 3
      || this.state.values.ipAddress.length < 6
      || this.state.values.ipAddress.length > 15
      || this.state.values.port < 2) {
      return false;
    }
    return true;
  }

  render() {
    var content;

    if(!this.state.dataIsLoadedFromSQLiteDB) {
      content = (<LoadData text="Daten werden geladen" navigation={this.props.navigation}/>);
    } else {
      content = (
        <View style={STYLE.SCREEN.centerPanel}>

          <View style={style.topicTop}>
            <Text>User</Text>
          </View>

          <View style={style.inputPanel}>
            <View style={style.label}>
              <Text>Vorname</Text>
            </View>
            <View style={style.inputContent}>
              <TextInput
                style={style.input}
                autoFocus={true}
                placeholder="Vorname"
                onChangeText={(value) => {this.onChangeText("vorname", value)}}
                value={this.state.values.vorname}
              />
            </View>
          </View>
          <View style={style.inputPanel}>
            <View style={style.label}>
              <Text>Nachname</Text>
            </View>
            <View style={style.inputContent}>
              <TextInput
                style={style.input}
                placeholder="Nachname"
                onChangeText={(value) => {this.onChangeText("nachname", value)}}
                value={this.state.values.nachname}
              />
            </View>
          </View>

          <View style={style.topic}>
            <Text>MQTT-Brocker</Text>
          </View>

          <View style={style.inputPanel}>
            <View style={style.label}>
              <Text>IP-Adresse</Text>
            </View>
            <View style={style.inputContent}>
              <TextInput
                style={style.input}
                keyboardType="number-pad"
                placeholder="192.168.178.1"
                onChangeText={(value) => {this.onChangeText("ipAddress", value)}}
                value={this.state.values.ipAddress}
              />
            </View>
          </View>
          <View style={style.inputPanel}>
            <View style={style.label}>
              <Text>Port</Text>
            </View>
            <View style={style.inputContent}>
              <TextInput
                style={style.input}
                keyboardType="number-pad"
                placeholder="1883"
                onChangeText={(value) => {this.onChangeText("port", value)}}
                value={this.state.values.port}
              />
            </View>
          </View>
          <View style={STYLE.SCREEN.btn}>
            <Button
              title="Speichern"
              color="#000000"
              onPress={() => this.saveData()}
            />
          </View>
        </View>
      );
    }

    return (
      <ScrollView style={STYLE.SCREEN.main}>
        {content}
      </ScrollView>
    );
  }
};

const style = StyleSheet.create({
  topic: {
    marginTop: 40,
    marginBottom: 20
  },
  topicTop: {
    marginBottom: 20
  },
  inputPanel: {
    flexDirection: 'row',
  },
  label: {
    justifyContent: 'center',
    width: "20%",
    marginLeft: "10%",
  },
  inputContent: {
    justifyContent: 'center',
    width: "60%",
    marginRight: "10%",
    padding: 5,
  },
  input: {
    height: 25,
    padding: 0,
    paddingLeft: 5,

    borderColor: '#000000',
    borderBottomWidth: 1,
  },
});
