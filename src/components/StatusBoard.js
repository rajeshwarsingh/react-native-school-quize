
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, PermissionsAndroid, Platform } from 'react-native';
import { Button } from 'native-base';

export default class StatusDashboard extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() { }

  render() {
    const statusBoard = this.props.cards.map((item, i) => {
      let color = Object.keys(this.props.answer).find(item => item == i) ? 'green' : 'white'
      return (<Button
        onPress={() => { this.props.onStatusClick(i) }}
        key={i}
        style={{
          width: 23,
          height: 23,
          borderRadius: 50,
          backgroundColor: color,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 1,
          borderWidth: 1
        }}>

        <Text key={i} style={{ color: '#ffffff', color: 'black' }}>{i + 1}</Text>
      </Button>)
    })

    return (
      <View style={{ padding: 10, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>{statusBoard}</View>
    )
  }
}