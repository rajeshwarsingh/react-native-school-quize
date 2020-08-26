import React from 'react';
import { Image } from 'react-native';
import { Text, Container, List, ListItem, Content } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions, StackActions } from 'react-navigation';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  navigate(route) {
    this.props.navigation.navigate(route)
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    const routes = [
      {
        title: 'Dashboard',
        route: 'DashboardScreen'
      },
      {
        title: 'ChapterWise',
        route: 'chapterWiseScreen'
      },
      {
        title: 'Logout',
        route: 'logoutScreen'
      }
    ]

    return (
      <Container>
        <Content>
          <Image
            source={require('../../../src/images/drawer1.png')}
            style={{
              height: 250,
              width: '100%',
              alignSelf: 'stretch',
              position: 'absolute'
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 250 }}
            renderRow={(data, i) => {

              return (
                <ListItem button onPress={() => {
                  console.warn("sidebase :", data)
                  const resetAction = StackActions.reset({
                    index: 0,
                    key: data.route,
                    actions: [NavigationActions.navigate({ routeName: data.route })],
                  });
                  this.props.navigation.dispatch(resetAction);
                }
                }>
                  <Text>{data.title}</Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}
