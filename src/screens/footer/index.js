import * as React from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

class FooterComponent extends React.Component {
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
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Footer >
        <FooterTab style={{ backgroundColor: Colors.primaryColor }}>
          <Button full>
            <Text>© 2016 Test N Score | All Right Reserved V1.0.0</Text>
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

export default FooterComponent