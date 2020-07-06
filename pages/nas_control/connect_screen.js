import React, {Component} from 'react';
import { View, ToastAndroid } from 'react-native';

import LoadData from "../../madmax_modules/loadData/LoadData.js"

import DB from '../../madmax_modules/sqlite/DB.js'
import STYLE from '../../data/config/style.js'

export default class ConnectScreen extends Component  {
  constructor(props) {
    super(props);

		this.db = null;
		this.nas = {}

    this.state = {
      pufferTime: 1000000,
    }
		this.initData();
  }

	initData() {
    this.db = new DB(this);
  }

  async setDataFromSQLite(data) {
    this.db.setData(data);

    if(this.db.checkIfDataNull()) {
      await new Promise((resolve) => setTimeout(() => { resolve('result') }, this.state.pufferTime));
      this.props.navigation.navigate('Home');
      ToastAndroid.show('Einstellungen sind nicht gültig!', ToastAndroid.LONG);
    } else {
      this.nas = this.db.get_nas_data();
    }

    this.props.navigation.navigate("NasControl", {nas: this.nas})
  }

  render() {
    return (
      <View style={STYLE.SCREEN.main}>
        <LoadData text="Daten werden geladen" navigation={this.props.navigation}/>
      </View>
    );
  }
};
