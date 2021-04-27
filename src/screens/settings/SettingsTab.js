import React, {Component} from 'react';
import {Text} from 'react-native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Tab - Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

// Tabs
import FeatureTab from './tabs/FeatureTab.js';
import UserTab from './tabs/UserTab.js';
import MqttTab from './tabs/MqttTab.js';
import DoorOpenerTab from './tabs/DoorOpenerTab.js';

// Weiteres
import TOAST from '../../components/Toast.js';

//STyle
import {StyleText, Color} from '../../res/style/style.js';

//I18n
import I18n from '../../i18n/i18n.js';

export default class SettingsTab extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.data;

    this.tab_navigation = {
      options: null,
      static_tabs: {
        feature: null,
        user: null,
        save: null,
      },
      dynamic_tabs: {
        mqtt: null,
        door_opener: null,
      },
    };

    var {feature, user, mqtt, door_opener} = this.data;
    this.state = {
      values: {
        feature: feature.get_data(),
        user: user.get_data(),
        mqtt: mqtt.get_data(),
        door_opener: door_opener.get_data(),
      },
    };
  }

  set_data_from_tab(category, elem, value) {
    let values = this.state.values;
    values[category][elem] = value;

    this.setState({
      values: values,
    });
  }

  async save_data() {
    var {feature, user, mqtt, door_opener} = this.data;

    this.setState({});
    this.props.update_root();

    TOAST.notification(I18n.t('settings.actions.will_save'), 50);

    let is_valid = this.is_data_valid();

    // features
    var feature_values = this.state.values.feature;
    await feature.set_data(
      feature_values.is_smart_home_control_active,
      feature_values.is_door_opener_active,
    );

    // user
    if (is_valid.user) {
      var user_values = this.state.values.user;
      await user.set_data(user_values.first_name, user_values.surname);
    }

    // mqtt
    if (is_valid.mqtt && feature_values.is_smart_home_control_active) {
      var new_mqtt_values = this.state.values.mqtt;
      var old_mqtt_values = mqtt.get_data();

      if (
        new_mqtt_values.ipaddress !== old_mqtt_values.ipaddress ||
        new_mqtt_values.port !== old_mqtt_values.port
      ) {
        await mqtt.set_data(new_mqtt_values.ipaddress, new_mqtt_values.port);

        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'FetchDataScreen', params: {data: this.data}}],
        });
      }
    } else if (feature_values.is_smart_home_control_active) {
      // hide mqtt feature
      this.set_data_from_tab('feature', 'is_smart_home_control_active', false);
      await feature.set_data(false, feature_values.is_door_opener_active);
    }

    if (is_valid.door_opener && feature_values.is_door_opener_active) {
      var door_opener_values = this.state.values.door_opener;
      await door_opener.set_data(
        door_opener_values.phone_number,
        door_opener_values.phone_key,
      );
    } else if (feature_values.is_door_opener_active) {
      // hide door opener feature
      this.set_data_from_tab('feature', 'is_door_opener_active', false);
      await feature.set_data(feature.is_smart_home_control_active, false);
    }

    TOAST.notification(I18n.t('settings.actions.has_save'), 50);
  }

  is_data_valid() {
    var {user, mqtt, door_opener} = this.state.values;

    var is_valid = {
      user: true,
      mqtt: true,
      door_opener: true,
    };

    // user
    if (user && (user.first_name == null || user.surname == null)) {
      is_valid.user = false;
    }

    // mqtt
    if (
      mqtt &&
      (mqtt.port == null ||
        mqtt.port.length < 1 ||
        mqtt.port.length > 4 ||
        mqtt.ipaddress == null ||
        mqtt.ipaddress.length < 7 ||
        mqtt.ipaddress.length > 15)
    ) {
      is_valid.mqtt = false;
    }

    // door opener
    if (
      door_opener &&
      (door_opener.phone_number == null || door_opener.phone_number.length < 1)
    ) {
      is_valid.door_opener = false;
    }

    return is_valid;
  }

  set_tab_navigation() {
    this.tab_navigation.options = {
      showLabel: true,
      labelStyle: {fontSize: 12},
      indicatorStyle: {backgroundColor: 'black'},
    };

    this.tab_navigation.static_tabs.feature = (
      <Tab.Screen
        name="FeatureTab"
        children={({navigation}) => (
          <FeatureTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.feature}
            onValueChange={(category, elem, value) =>
              this.set_data_from_tab(category, elem, value)
            }
          />
        )}
        options={{
          tabBarLabel: props => (
            <Text style={StyleText(props.color, 0, 'center')}>
              {I18n.t('settings.menu.feature')}
            </Text>
          ),
        }}
      />
    );

    this.tab_navigation.static_tabs.user = (
      <Tab.Screen
        name="UserTab"
        children={({navigation}) => (
          <UserTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.user}
            onChangeText={(category, elem, value) =>
              this.set_data_from_tab(category, elem, value)
            }
          />
        )}
        options={{
          tabBarLabel: props => (
            <Text style={StyleText(props.color, 0, 'center')}>
              {I18n.t('settings.menu.user')}
            </Text>
          ),
        }}
      />
    );

    this.tab_navigation.dynamic_tabs.mqtt = (
      <Tab.Screen
        name="MqttTab"
        children={({navigation}) => (
          <MqttTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.mqtt}
            onChangeText={(category, elem, value) =>
              this.set_data_from_tab(category, elem, value)
            }
          />
        )}
        options={{
          tabBarLabel: props => (
            <Text style={StyleText(props.color, 0, 'center')}>
              {I18n.t('settings.menu.mqtt')}
            </Text>
          ),
        }}
      />
    );

    this.tab_navigation.dynamic_tabs.door_opener = (
      <Tab.Screen
        name="DoorOpenerTab"
        children={({navigation}) => (
          <DoorOpenerTab
            navigation={this.props.navigation}
            navigation_tab={navigation}
            values={this.state.values.door_opener}
            onChangeText={(category, elem, value) =>
              this.set_data_from_tab(category, elem, value)
            }
          />
        )}
        options={{
          tabBarLabel: props => (
            <Text style={StyleText(props.color, 0, 'center')}>
              {I18n.t('settings.menu.door_opener')}
            </Text>
          ),
        }}
      />
    );

    this.tab_navigation.static_tabs.save = (
      <Tab.Screen
        name="Save_tab"
        children={({navigation}) => null}
        options={{
          tabBarLabel: props => (
            <Ionicons color={Color.black} name="save" size={25} />
          ),
        }}
        listeners={({navigation, route}) => ({
          focus: () => {
            navigation.goBack();
            this.save_data();
          },
        })}
      />
    );
  }

  render() {
    var {feature} = this.state.values;

    if (this.props.navigation_tab.isFocused()) {
      this.set_tab_navigation();
    }

    return (
      <Tab.Navigator
        initialRouteName="FeatureTab"
        tabBarOptions={this.tab_navigation.options}>
        {this.tab_navigation.static_tabs.feature}
        {this.tab_navigation.static_tabs.user}
        {feature.is_smart_home_control_active
          ? this.tab_navigation.dynamic_tabs.mqtt
          : null}
        {feature.is_door_opener_active
          ? this.tab_navigation.dynamic_tabs.door_opener
          : null}
        {this.tab_navigation.static_tabs.save}
      </Tab.Navigator>
    );
  }
}
