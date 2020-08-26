import * as React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import Toaster, { ToastStyles } from 'react-native-toaster';
import { logout } from '../../actions/index';

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { animating: false, toastMsg: false }
  }

  componentDidMount() {
    this.setState({ animating: true, toastMsg: false })
    this.props.logout({ uid: this.props.uid }, (err, data) => {
      this.setState({ animating: true, toastMsg: true })
      AsyncStorage.removeItem("userData")
        .then(() => {
          this.setState({ animating: true });
          this.props.navigation.navigate('Auth')
        })
    })
  }

  render() {
    return (
      <View>
        <View style={{ margin: 30, padding: 20, height: 100 }}>
          {this.state.toastMsg && <Toaster message={{ text: 'Logout successully!', styles: ToastStyles.success }} />}
        </View>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator animating={this.state.animating} size="large" color="#0000ff" />
        </View>
      </View>)
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid
})

const mapDispatchToProps = dispatch => ({
  logout: (body, cb) => {
    dispatch(logout(body, cb))
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout)