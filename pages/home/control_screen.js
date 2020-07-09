import React, {Component} from 'react';
import { StyleSheet, View, Button, Text, ToastAndroid, Image } from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// SplashScreen
import SplashScreen from 'react-native-splash-screen'

// Menu
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Home_tab from "./tabs/home_tab.js"
import Nas_tab from "../nas_control/control_screen.js"
import Smart_home_tab from "../smarthome_control/connect_screen.js"
import Setting_tab from "../settings/control_screen.js"

// Globales
import STYLE from '../../data/config/style.js'
import DB from '../../madmax_modules/sqlite/DB.js'

export default class HomeScreen extends Component  {
  constructor(props) {
    super(props);

    SplashScreen.show();

    this.db = new DB(this);
    this.state = {
      showScreenTime: 1500,
    }
  }

  set_data_from_sqlite(category, data) {
    this.db.set_data(category, data)

    if(data == null) {
      return ;
    } else if(category == "user") {
      let { user } = this.state
      user = this.db.get_name()

      this.setState({user: user});
    } else if(category == "mqtt") {
      let { mqtt } = this.state
      mqtt.uri = this.db.get_mqtt_uri()

      this.setState({mqtt: mqtt});
    } else if(category == "nas") {
      let { nas } = this.state
      nas = this.db.get_nas_data()

      this.setState({nas: nas});
    }
  }

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (null),
    });
    return (
      <Tab.Navigator
        initialRouteName = {"Home"}
        tabBarOptions={{
          showLabel: true,
          labelPosition: 'below-icon',
          labelStyle: { marginBottom: 5, fontSize: 12},
          activeTintColor : {backgroundColor: "black"},
          style: {height: 60},
        }}
      >

        <Tab.Screen
          name="Home_tab"
          children={({navigation})=>
            <Home_tab
              db={this.db}
              navigation={this.props.navigation}
              tab_navigation={navigation}
            />
          }
          options={() => ({
            tabBarLabel: "Home",
            tabBarIcon: props => (<Ionicons name="home" size={30} color={props.color}/>)
          })}
        />

        <Tab.Screen
          name="Smart_home_control_tab"
          children={({navigation}) =>
            <Smart_home_tab
              db={this.db}
              navigation={this.props.navigation}
              tab_navigation={navigation}
            />
          }
          options={() => ({
            tabBarLabel: "Smart Home",
            tabBarIcon: props => (<MaterialIcons name="settings-remote" size={30} color={props.color}/>)
          })}
        />

        <Tab.Screen
          name="nas_control_tab"
          children={({navigation}) =>
             <Nas_tab
              db={this.db}
              navigation={this.props.navigation}
              tab_navigation={navigation}
            />
          }
          options={{
            tabBarLabel: "NAS",
            tabBarIcon: props => (<MaterialCommunityIcons name="nas" size={30} color={props.color}/>)
          }}
        />

        <Tab.Screen
          name="Setting__tab"
          children={({navigation}) =>
             <Setting_tab
              db={this.db}
              navigation={this.props.navigation}
              tab_navigation={navigation}
            />
          }
          options={{
            tabBarLabel: "Einstellungen",
            tabBarIcon: props => (<Ionicons name="settings" size={30} color={props.color}/>)
          }}
        />
      </Tab.Navigator>
    );
  }

  async UNSAFE_componentWillMount() {
    await new Promise((resolve) => setTimeout(() => { resolve('result') }, this.state.showScreenTime));
    SplashScreen.hide();
  }
};
