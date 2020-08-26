import React from 'react';
import { Image, StyleSheet, View, TextInput, Button, Alert, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { isAuthenticated, alreadyAuthenticated } from '../../actions';

class Common extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isUserLogin: true, username: '', password: '', isLoading: false }
  }

  checkLogin() {
    this.setState({ isLoading: true })
    const { username, password } = this.state
    const body = { platform: 'android', cmd: 'LOGIN', uid: username, pwd: password }
    this.props.isAuthenticated(body, payload => {
      console.log("check authenticated data : ",payload)
      if (payload && payload.payload.uid) {
        let saveUserData = payload.payload
        AsyncStorage.setItem("userData", JSON.stringify(saveUserData)).then(() => {
          this.setState({ isLoading: false })
          this.props.navigation.navigate('DashboardScreen')
        })
      } else {
        AsyncStorage.removeItem("userData").then(() => {
          this.setState({ isLoading: false })
          Alert.alert('Error', 'Username/Password Missmatched', [
            {
              text: 'Okey'
            }
          ])
        })
      }
    })
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    AsyncStorage.getItem("userData").then(userData => {
      let parsedUserData = userData && JSON.parse(userData)
      if (parsedUserData && parsedUserData.uid) {
        this.props.alreadyAuthenticated(parsedUserData, payload => {
          this.setState({ isLoading: false })
          this.props.navigation.navigate('DashboardScreen')
        })
      } else {
        AsyncStorage.removeItem("userData").then(() => {
          this.setState({ isLoading: false })
        })
      }
    })
      .catch((err) => {
        console.log("error in componentDidMount Login :", err)
        AsyncStorage.removeItem("userData").then(() => {
          this.setState({ isLoading: false })
        })
      })
  }

  render() {

    return (
      <View style={styles.container}>
        <Image source={require('../../../src/images/Dart.png')} style={styles.logo} />
        <View style={styles.form}>
          <TextInput
            selectionColor={'#1e90ff'}
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            placeholder='Username'
            style={{
              height: 40,
              borderColor: '#C0C0C0',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 20
            }}
          />

          <TextInput
            selectionColor={'#1e90ff'}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder='Password'
            secureTextEntry={true}
            style={{
              height: 40,
              borderColor: '#C0C0C0',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 20
            }}
          />

          <Button
            title="Login"
            onPress={() => this.checkLogin()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%'
  },
  textInput: {
    height: 40,
    borderColor: '#C0C0C0',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  }
})

const mapDispatchToProps = dispatch => ({
  isAuthenticated: (message, cb) => {
    dispatch(isAuthenticated(message, cb))
  },
  alreadyAuthenticated: (message, cb) => {
    dispatch(alreadyAuthenticated(message, cb))
  }
})

export default connect(
  null,
  mapDispatchToProps
)(withNavigation(Common))