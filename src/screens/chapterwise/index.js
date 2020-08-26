
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Icon } from 'native-base';
import Colors from '../../../constants/Colors';
import Common from './common';
import ActionBarImage from '../../components/ActionBarImage';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
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
    return (
      <Container>
        <Content>
          <Common navigation={this.props.navigation} />
        </Content>
      </Container>
    )
  }
}

Counter.navigationOptions = navData => {
  return {
    headerTitle: 'Chapterwise',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerRight: <ActionBarImage />,
    headerLeft: (
      <TouchableOpacity style={{ padding: 12 }} onPress={() => navData.navigation.toggleDrawer()}>
        <Icon name="md-menu" style={{ color: 'white' }} />
      </TouchableOpacity>
    )
  };
};

export default Counter