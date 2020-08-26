import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default class StopWatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
      startDisable: false
    }
    this.onButtonStart = this.onButtonStart.bind(this)
    this.onButtonStop = this.onButtonStop.bind(this)
    this.onButtonStart()
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  onButtonStart = () => {
    let timer = setInterval(() => {
      var num = (Number(this.state.seconds_Counter) + 1).toString()
      count = this.state.minutes_Counter
      if (Number(this.state.seconds_Counter) == 59) {
        count = (Number(this.state.minutes_Counter) + 1).toString()
        num = '00'
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      })
    }, 1000)

    setTimeout(() => {
      this.setState({ timer })
      this.onButtonStop()
    }, this.props.setTime * 1000)

    this.setState({ timer })

    this.setState({ startDisable: true })
  }

  onButtonStop = () => {
    clearInterval(this.state.timer)
    this.setState({ startDisable: false })
    this.props.disableTestStartProps()
  }

  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00'
    })
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Text style={styles.counterText}>
            {this.state.minutes_Counter} : {this.state.seconds_Counter}
          </Text><Text style={styles.counterText} >/</Text>
          <Text style={styles.counterText}>
            {this.props.setTime / 60} : {'00'}
          </Text>
        </View>
        {(this.props.disableSubmitBtn === true) && <TouchableOpacity onPress={this.onButtonStop} activeOpacity={0.6} style={[styles.button, { backgroundColor: '#FF6F00' }]}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    width: '80%',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  counterText: {
    fontSize: 28,
    color: '#000'
  }
})
