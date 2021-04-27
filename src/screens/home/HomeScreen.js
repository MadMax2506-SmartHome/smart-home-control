import React, {Component} from 'react';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Tab-Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import HomeTab from './tabs/HomeTab.js';
import SettingsTab from '../settings/SettingsTab.js';

// Header
import NavHeader from '../../navigation//Header.js';

//I18n
import I18n from '../../i18n/i18n.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    const {params} = this.props.route;
    this.data = params.data;

    this.tab_navigation = {
      options: null,
      static_tabs: {
        home: null,
        setting: null,
      },
      dynamic_tabs: {
        smart_home_control: null,
      },
    };

    this.set_tab_navigation();
  }

  componentDidMount() {
    this.setHeader();
  }

  setHeader() {
    var {navigation} = this.props;

    navigation.setOptions({
      header: props => (
        <NavHeader
          navigation={navigation}
          screenName={props.scene.route.name}
          refresh={() => {
            this.props.navigation.reset({
              index: 0,
              routes: [{name: 'FetchDataScreen', params: {data: this.data}}],
            });
          }}
        />
      ),
    });
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: {marginBottom: 5, fontSize: 12},
      activeTintColor: {backgroundColor: 'black'},
      style: {height: 60},
    };

    this.tab_navigation.static_tabs.home = (
      <Tab.Screen
        name="HomeTab"
        children={({navigation}) => (
          <HomeTab
            data={this.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        )}
        options={() => ({
          tabBarLabel: I18n.t('home.menu.home'),
          tabBarIcon: props => (
            <Ionicons name="home" size={30} color={props.color} />
          ),
        })}
      />
    );

    this.tab_navigation.dynamic_tabs.smart_home_control = (
      <Tab.Screen
        name="SmartDevicesTab"
        children={({navigation}) => null}
        options={() => ({
          tabBarLabel: I18n.t('home.menu.smart_devices'),
          tabBarIcon: props => (
            <MaterialCommunityIcons
              name="devices"
              size={30}
              color={props.color}
            />
          ),
        })}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            this.props.navigation.navigate('SmartDeviceScreen', {
              data: this.data,
            });
          },
        }}
      />
    );

    this.tab_navigation.static_tabs.setting = (
      <Tab.Screen
        name="SettingsTab"
        children={({navigation}) => (
          <SettingsTab
            data={this.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
            update_root={() => this.setState({})}
          />
        )}
        options={{
          tabBarLabel: I18n.t('home.menu.settings'),
          tabBarIcon: props => (
            <Ionicons name="settings" size={30} color={props.color} />
          ),
        }}
      />
    );
  }

  render() {
    var {feature, mqtt} = this.data;

    var is_smart_home_tab_visible =
      mqtt.get_if_mqtt_is_available() &&
      feature.get_data().is_smart_home_control_active;

    return (
      <Tab.Navigator
        initialRouteName={'HomeTab'}
        tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.home}
        {is_smart_home_tab_visible
          ? this.tab_navigation.dynamic_tabs.smart_home_control
          : null}
        {this.tab_navigation.static_tabs.setting}
      </Tab.Navigator>
    );
  }
}
