import React, {Component} from 'react';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// SplashScreen
import SplashScreen from 'react-native-splash-screen'

// Tab-Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Home_tab from "./tabs/Home_tab.js"
import Nas_control_tab from "../nas_control/Nas_control_tab.js"
import Setting_control_tab from "../settings/Setting_control_tab.js"

// Allgemein
import STYLE from '../../data/config/style.js'
import DB from '../../madmax_modules/sqlite/DB.js'

export default class Control_screen extends Component  {
  constructor(props) {
    super(props);

    SplashScreen.show();

    this.db = new DB(this);

    this.tab_navigation = {
      options: null,
      static_tabs: {
        home: null,
        setting: null
      },
      dynamic_tabs: {
        smart_home_control: null,
        nas_control: null,
      }
    }

    this.set_tab_navigation()
  }

  set_data_from_sqlite(category, data) {
    this.db.set_data(category, data)
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: { marginBottom: 5, fontSize: 12},
      activeTintColor : {backgroundColor: "black"},
      style: {height: 60},
    }

    this.tab_navigation.static_tabs.home = (
      <Tab.Screen
        name="Home_tab"
        children={({navigation})=>
          <Home_tab
            db={this.db}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={() => ({
          tabBarLabel: "Home",
          tabBarIcon: props => (<Ionicons name="home" size={30} color={props.color}/>)
        })}
      />
    );

    this.tab_navigation.dynamic_tabs.smart_home_control = (
      <Tab.Screen
        name="Smart_home_connect_tab"
        children={({navigation}) => null}
        options={() => ({
          tabBarLabel: "Smart Home",
          tabBarIcon: props => (<MaterialIcons name="settings-remote" size={30} color={props.color}/>)
        })}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            this.props.navigation.navigate("Smart_home_connect_screen", {db: this.db})
          }
        }}
      />
    )

    this.tab_navigation.dynamic_tabs.nas_control = (
      <Tab.Screen
        name="Nas_control_tab"
        children={({navigation}) =>
          <Nas_control_tab
            db={this.db}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "NAS",
          tabBarIcon: props => (<MaterialCommunityIcons name="nas" size={30} color={props.color}/>)
        }}
      />
    )

    this.tab_navigation.static_tabs.setting = (
      <Tab.Screen
        name="Setting__tab"
        children={({navigation}) =>
          <Setting_control_tab
            db={this.db}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        }
        options={{
          tabBarLabel: "Einstellungen",
          tabBarIcon: props => (<Ionicons name="settings" size={30} color={props.color}/>)
        }}
      />
    )
  }

  render() {
    let smart_home_control_tab  = this.db.get_is_smart_home_control_active() ? this.tab_navigation.dynamic_tabs.smart_home_control : null
    let nas_control_tab         = this.db.get_is_nas_control_active() ? this.tab_navigation.dynamic_tabs.nas_control : null;

    return (
      <Tab.Navigator initialRouteName={"Home_tab"} tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.home}
        {smart_home_control_tab}
        {nas_control_tab}
        {this.tab_navigation.static_tabs.setting}
      </Tab.Navigator>
    );
  }

  async UNSAFE_componentWillMount() {
    while(this.db.is_data_load() == false) {
      await new Promise((resolve) => setTimeout(() => { resolve('result') }, 500));
    }

    this.forceUpdate();
    SplashScreen.hide();
  }
};
