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

import HomeTab from "./tabs/HomeTab.js"
import SettingsTab from "../settings/SettingsTab.js"

// Allgemein
import STYLE from '../../res/style.js'
import DB from '../../res/DB.js'

export default class Home_control_screen extends Component  {
  constructor(props) {
    super(props);

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

    this.state = {
      tab_visibility: {
        is_smart_home_control_active: false,
        is_nas_control_active: false,
      }
    }

    this.set_tab_navigation()
  }

  set_data_from_sqlite(category, data) {
    this.db.set_data(category, data);
  }

  set_tab_visibility(is_smart_home_control_active, is_nas_control_active) {
    let {tab_visibility} = this.state
    tab_visibility.is_smart_home_control_active = is_smart_home_control_active
    tab_visibility.is_nas_control_active        = is_nas_control_active

    this.setState({
      tab_visibility: tab_visibility,
    });
  }

  get_tab_visibility() {
    return this.state.tab_visibility;
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
        name="HomeTab"
        children={({navigation})=>
          <HomeTab
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
        children={({navigation}) => null}
        options={{
          tabBarLabel: "NAS",
          tabBarIcon: props => (<MaterialCommunityIcons name="nas" size={30} color={props.color}/>)
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            this.props.navigation.navigate("Nas_control_screen", {db: this.db})
          }
        }}
      />
    )

    this.tab_navigation.static_tabs.setting = (
      <Tab.Screen
        name="Setting__tab"
        children={({navigation}) =>
          <SettingsTab
            db={this.db}
            navigation={this.props.navigation}
            navigation_tab={navigation}
            set_tab_visibility={(is_smart_home_control_active, is_nas_control_active) => this.set_tab_visibility(is_smart_home_control_active, is_nas_control_active)}
            get_tab_visibility={() => this.get_tab_visibility()}
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
    var {tab_visibility} = this.state

    return (
      <Tab.Navigator initialRouteName={"HomeTab"} tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.home}
        {tab_visibility.is_smart_home_control_active ? this.tab_navigation.dynamic_tabs.smart_home_control : null}
        {tab_visibility.is_nas_control_active ? this.tab_navigation.dynamic_tabs.nas_control : null}
        {this.tab_navigation.static_tabs.setting}
      </Tab.Navigator>
    );
  }

  async UNSAFE_componentWillMount() {
    const wait = 1000
    while(this.db.is_data_load() == false) {
      await new Promise((resolve) => setTimeout(() => { resolve('result') }, wait));
    }

    this.set_tab_visibility(this.db.get_is_smart_home_control_active(), this.db.get_is_nas_control_active())

    SplashScreen.hide();
  }
};
