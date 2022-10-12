import React, {Component} from 'react';
// Icons
import FoundationIcons from 'react-native-vector-icons/Foundation';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

// Tab Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// Tabs
import RoomlightTab from './roomlight/RoomlightTab.js';
import RoomThermometerTab from './RoomThermometerTab.js';

// Header
import NavHeader from '../../navigation//Header.js';

// Other
import TOAST from '../../components/Toast.js';

//I18n
import I18n from '../../i18n/i18n.js';

export default class SmartHomeScreen extends Component {
  constructor(props) {
    super(props);

    const {params} = this.props.route;
    this.data = params.data;

    this.tab_navigation = {
      options: null,
      dynamic_tabs: {
        room_thermometer: null,
        roomlight: null,
      },
    };

    this.set_tab_navigation(params);
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
          back={() => this.props.navigation.navigate('HomeScreen')}
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

  set_tab_navigation(params) {
    this.tab_navigation.options = {
      showLabel: true,
      labelPosition: 'below-icon',
      labelStyle: {marginBottom: 5, fontSize: 12},
      activeTintColor: {backgroundColor: 'black'},
      style: {height: 60},
    };

    this.tab_navigation.dynamic_tabs.room_thermometer = (
      <Tab.Screen
        name="RoomThermometerTab"
        children={({navigation}) => (
          <RoomThermometerTab
            data={this.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        )}
        options={() => ({
          tabBarLabel: I18n.t('smart_home.menu.thermometer'),
          tabBarIcon: props => (
            <FontAwesome5Icons
              name="temperature-high"
              size={30}
              color={props.color}
            />
          ),
        })}
      />
    );

    this.tab_navigation.dynamic_tabs.roomlight = (
      <Tab.Screen
        name="RoomlightTab"
        children={({navigation}) => (
          <RoomlightTab
            data={this.data}
            navigation={this.props.navigation}
            navigation_tab={navigation}
          />
        )}
        options={() => ({
          tabBarLabel: I18n.t('smart_home.menu.light'),
          tabBarIcon: props => (
            <FoundationIcons name="lightbulb" size={30} color={props.color} />
          ),
        })}
      />
    );
  }

  render() {
    var {mqtt} = this.data;

    if (
      mqtt.get_room_thermometer_device() == null &&
      mqtt.get_roomlight_device() == null
    ) {
      TOAST.notification(I18n.t('smart_home.actions.error'));
      this.props.navigation.navigate('HomeScreen');

      return <></>;
    } else {
      return (
        <Tab.Navigator tabBarOptions={this.tab_navigation.options}>
          {mqtt.get_room_thermometer_device() == null
            ? null
            : this.tab_navigation.dynamic_tabs.room_thermometer}
          {mqtt.get_roomlight_device() == null
            ? null
            : this.tab_navigation.dynamic_tabs.roomlight}
        </Tab.Navigator>
      );
    }
  }
}