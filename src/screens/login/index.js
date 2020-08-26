import * as React from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Common from './common';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    }
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
    return (
      <Container>
        <Common />
      </Container>
    )
  }
}

export default Counter