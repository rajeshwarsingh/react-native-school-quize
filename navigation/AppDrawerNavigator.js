import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from '../src/screens/dashboard';
import Sidebar from '../src/screens/sidebar/index';
import chapterWise from '../src/screens/chapterwise';
import Logout from '../src/screens/logout';

const DashboardScreen = createStackNavigator({
  DashboardScreen: {
    screen: Dashboard
  }
});

const chapterWiseScreen = createStackNavigator({
  chapterWiseScreen: {
    screen: chapterWise
  }
});

const logoutScreen = createStackNavigator({
  logoutScreen: {
    screen: Logout
  }
});

let AppStack = createDrawerNavigator(
  {
    DashboardScreen: { screen: DashboardScreen },
    chapterWiseScreen: { screen: chapterWiseScreen },
    logoutScreen: { screen: logoutScreen }
  },
  {
    contentComponent: ({ navigation }) => <Sidebar navigation={navigation} />
  }
)

export default AppStack