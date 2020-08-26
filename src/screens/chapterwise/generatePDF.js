import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Icon, Button } from 'native-base'
import reportHtml from './html';
import * as Print from 'expo-print'

export default class Example extends Component {
  state = {
    filePath: ''
  }
  constructor(props) {
    super(props)
    this.state = { animating: false }
  }

  askPermission() {
    this.setState({ animating: true });
    var that = this
    Print.printAsync({ html: reportHtml(that.props.answer, that.props.boardPaperCw, that.props.user) })
      .then((res) => {
        this.setState({ animating: false });
      })
  }

  render() {
    return (
      <View style={{}}>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator animating={this.
            state.animating} size="large" color="#0000ff" />
        </View>
        <TouchableOpacity onPress={this.askPermission.bind(this)}>
          <View style={{ alignSelf: 'center' }}>
            <Image
              source={require('../../../assets/images/pdfDownload.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.text}>Create PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text}>{this.
          state.filePath}</Text>
        <View ><Button rounded style={{ alignSelf: 'center', margin: 10, padding: 5, width: '34%', backgroundColor: 'white' }} onPress={() => { this.props.navigation.replace('chapterWiseScreen') }}><Icon name="md-arrow-back" style={{ fontSize: 20, color: 'black' }} /><Text style={{ alignContent: 'center' }}>Go Back</Text></Button></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 25,
    marginTop: 16
  },
  ImageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'stretch'
  },
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