import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { View } from 'native-base';

class Common extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() { }

  render() {
    return (
      <View>
        <Image source={require('../../images/cartoon-dashboard.png')} style={{ margin: 10, padding: 20, height: 500, width: null }} />
      </View>

    )
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const styles = StyleSheet.create({
  instruction: {
    flexDirection: 'row',
    alignContent: 'space-between',
    height: 200,
    margin: 10,
    padding: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fccb00'
  },
  gridItem: {
    height: 50,
    backgroundColor: '#dcdcdc',
    margin: 10,
    padding: 7,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  CircleShapeView1: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    justifyContent: 'space-around',
    margin: 10,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#00BCD4',
    justifyContent: 'center'
  },
  CircleShapeView2: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    justifyContent: 'space-around',
    margin: 10,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffa500',
    justifyContent: 'center'
  },
  FlatList: {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Common)
