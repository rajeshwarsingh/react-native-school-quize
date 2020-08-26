import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../src/screens/login';
import MainDrawerNavigator from'./AppDrawerNavigator';

export default createAppContainer(
  createSwitchNavigator({
    Auth: Login,
    Draw: MainDrawerNavigator
  },{initialRouteName:'Auth'})
);
