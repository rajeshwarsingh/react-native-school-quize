import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native'
import { Picker, Radio, ListItem, Input, Content, View, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon, Button } from 'native-base';
import Toaster, { ToastStyles } from 'react-native-toaster';
import { tnsUrl } from '../../config/index';
import { checkAllowedCapCountCwApi, updateCapCountCwApi } from '../../api';
import Timer from '../../components/timer';
import Example from './generatePDF';
import { getSubjectsCw, getChaptersCw, generatePaperCw } from '../../actions';
import StatusBoard from '../../components/StatusBoard';

class GeneratePaper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pickSubjectItem: [],
      pickChapterItem: [],
      selectedSubject: '',
      selectedChapter: '',
      showCard: false,
    }
  }

  onGeneratePaperBtnPress() {
    this.props.generatePaperCw(this.state.selectedSubject, this.state.selectedChapter)
    this.setState({
      showCard: true
    })
  }

  onSubjectValueChange(value) {
    console.warn('**********check sub value:',value)
    this.setState({
      selectedSubject: value
    })
    console.warn("subject :", value)
    this.props.getChaptersCw(value, (err, resData) => {
      if (resData) {
        if (resData.length <= 0) {
          this.setState({ pickChapterItem: ['Not Found'], selectedChapter: 'Not Found' })
          return
        }
        const papers = resData
        this.setState({ pickChapterItem: papers, selectedChapter: papers[0] })
      }
    })
  }

  onChapterValueChange(value) {
    this.setState({
      selectedChapter: value
    })
  }

  componentDidMount() {
    this.props.getSubjectsCw(this.props.user.std, (err, resData) => {
      if (resData && resData.length >= 0) {
        this.onSubjectValueChange(resData[0])
      } else {
        // write code here
      }
    })
  }

  render() {
    console.warn('props : ', this.state.selectedSubject, this.state.selectedChapter)
    let pickSubjectItem = this.props.boardPaperCw.subjects.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    })

    let pickChapterData = this.props.boardPaperCw.chapters.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />
    })

    return (
      <View style={{ flexDirection: 'column' }}>

        <View style={{ flexDirection: 'column', padding: 20, margin: 20 }}>

          <View style={{ flexDirection: 'row', padding: 5, margin: 5, alignContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ padding: 5, margin: 5, alignContent: 'flex-start' }}>Select Subject</Text>
            <Picker note mode="dropdown"
              style={{ margin: 5 }}
              selectedValue={this.state.selectedSubject}
              onValueChange={this.onSubjectValueChange.bind(this)}>
              {pickSubjectItem}
            </Picker>
          </View>

          <View style={{ flexDirection: 'row', padding: 5, margin: 5, alignContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ padding: 5, margin: 5, alignContent: 'flex-start' }}>Select Chapter</Text>
            <Picker mode="dropdown"
              style={{ margin: 5 }}
              itemTextStyle={{ color: '#788ad2' }}
              selectedValue={this.state.selectedChapter}
              onValueChange={this.onChapterValueChange.bind(this)}>
              {pickChapterData}
            </Picker>
          </View>

          <Button
            rounded
            onPress={() => this.onGeneratePaperBtnPress()}
            style={{
              margin: 20,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text>Submit</Text>
          </Button>

        </View>

        <View style={{
          padding: 5,
          margin: 10,
          alignContent: 'center'
        }}>
          {this.state.showCard && (
            <Card >
              <CardItem>
                <Left>
                  <Thumbnail source={{ uri: 'Image URL' }} />
                  <Body>
                    <Text>Your paper successfully generated,Click start to proceed!</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image source={require('../.././../assets/images/down.png')} style={{ height: 200, width: null, flex: 1 }} />
              </CardItem>
              <CardItem>
                <Button
                  rounded
                  onPress={this.props.checkBtnPress()}
                  style={{
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    margin: 10
                  }}
                >
                  <Text>Start</Text>
                </Button>
              </CardItem>
            </Card>
          )}
        </View>
      </View>
    )
  }
}

class TestStart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      showReport: false,
      ContainerTestStart: true,
      cards: this.props.boardPaperCw.papers,
      answer: { startTime: new Date() },
      radio: { one: false, two: false, three: false, four: false },
      count: 0,
      disableSubmitBtn: false
    }
  }

  disableTestStart(prams) {
    this.state.answer.endTime = new Date()
    this.props.onTestFinish(this.state.answer)
  }

  onStatusClicked(countValue) {
    if (countValue === this.state.cards.length - 1) {
      this.setState({ disableSubmitBtn: true })
    } else {
      if (this.state.disableSubmitBtn === true) this.setState({ disableSubmitBtn: false })
    }
    this.setState({ count: countValue });
  }

  componentDidUpdate() { }

  componentDidMount() {
    if (this.props.boardPaperCw.papers.length <= 0) {
      this.props.paperNotFoundFuc()
    }
  }

  render() {
    let item = (this.state.cards.length > 0 ? this.state.cards[this.state.count] : [])
    return (
      <View >
        <View style={{ alignContent: 'space-between' }}>
          <StatusBoard cards={this.state.cards} onStatusClick={this.onStatusClicked.bind(this)} answer={this.state.answer} />
          <View><Timer disableTestStartProps={this.disableTestStart.bind(this)} disableSubmitBtn={this.state.disableSubmitBtn} setTime={this.props.boardPaperCw.papers.length * 60} /></View>
          <View style={{ margin: 20, height: 500 }} >
            <Content>
              <View>
                <Left>
                  <Body>
                  <Content >
                        <ListItem>
                          <Text>
                            {'Q'}
                            {this.state.cards.indexOf(item) + 1}
                            {': '}
                            {item.q_details}
                          </Text>
                        </ListItem>
                        
                        <ListItem>
                          <Left>
                            <Text>
                              {'A. '}
                              {item.q_ans_1}
                            </Text>
                          </Left>
                          <Right>
                            <Radio
                              onPress={() => {
                                this.setState({ answer: { ...this.state.answer, [this.state.cards.indexOf(item)]: item.q_ans_1 } })
                              }}
                              selected={this.state.answer[this.state.cards.indexOf(item)] === item.q_ans_1}
                            />
                          </Right>
                        </ListItem>
                        <ListItem>
                          <Left>
                            <Text>
                              {'B. '}
                              {item.q_ans_2}
                            </Text>
                          </Left>
                          <Right>
                            <Radio
                              onPress={() => {
                                this.setState({ answer: { ...this.state.answer, [this.state.cards.indexOf(item)]: item.q_ans_2 } })
                              }}
                              selected={this.state.answer[this.state.cards.indexOf(item)] === item.q_ans_2}
                            />
                          </Right>
                        </ListItem>
                        <ListItem>
                          <Left>
                            <Text>
                              {'C. '}
                              {item.q_ans_3}
                            </Text>
                          </Left>
                          <Right>
                            <Radio
                              onPress={(e) => {
                                this.setState({ answer: { ...this.state.answer, [this.state.cards.indexOf(item)]: item.q_ans_3 } })
                              }}
                              selected={this.state.answer[this.state.cards.indexOf(item)] === item.q_ans_3}
                            />
                          </Right>
                        </ListItem>
                        <ListItem>
                          <Left>
                            <Text>
                              {'D. '}
                              {item.q_ans_4}
                            </Text>
                          </Left>
                          <Right>
                            <Radio
                              onPress={() => {
                                this.setState({ answer: { ...this.state.answer, [this.state.cards.indexOf(item)]: item.q_ans_4 } })
                              }}
                              selected={this.state.answer[this.state.cards.indexOf(item)] === item.q_ans_4}
                            />
                          </Right>
                        </ListItem>
                      </Content>
                    
                  </Body>
                </Left>
                <CardItem>
                  <Text>{item.name}</Text>
                </CardItem>
              </View>
            </Content>
          </View>
          <View style={{ margin: 20, padding: 10, flexDirection: 'row', flex: 1, position: 'relative', bottom: 50, left: 0, right: 0, justifyContent: 'space-between', padding: 15 }}>
            <Button iconLeft onPress={() => {
              this.setState({ count: (this.state.count > 0 ? this.state.count - 1 : 0) });

              if (this.state.disableSubmitBtn === true) this.setState({ disableSubmitBtn: false })

            }}>
              <Icon name="arrow-back" />
              <Text>Swipe Left</Text>
            </Button>
            <Button iconRight onPress={() => {
              // console.warn("prev butn click:",this.state.count , this.state.cards.length-1)
              this.setState({ count: (this.state.count < this.state.cards.length - 1 ? this.state.count + 1 : this.state.cards.length - 1) })
              if (this.state.count === this.state.cards.length - 2 || this.state.count === this.state.cards.length - 1) {
                this.setState({ disableSubmitBtn: true })
              } else {
                if (this.state.disableSubmitBtn === true) this.setState({ disableSubmitBtn: false })
              }
            }}>
              <Text>Swipe Right</Text>
              <Icon name="arrow-forward" />
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

class Report extends React.Component {

  constructor(props) {
    super(props)
  }

  state = { generatePdf: false }

  componentDidMount() {
    this.setState({ generatePdf: true })
  }

  render() {
    return (
      <View>
        <View style={{ height: 100 }}>
          <Toaster message={{ text: 'successfully completed, Get Your Report!', styles: ToastStyles.success }} />
        </View>
        <View style={{ width: '80%', alignSelf: 'center' }}>
          {this.state.generatePdf && <Example navigation={this.props.navigation} user={this.props.user} answer={this.props.answer} boardPaperCw={this.props.boardPaperCw} />}
        </View>
      </View>
    )
  }
}

class Common extends React.Component {
  constructor(props) {
    super(props)
    this.state = { GeneratePaper: true, TestStart: false, showReport: false, MaxLimitMsg: false, PaperNotFoundMsg: false, answer: {} }
    this.btnPressed = this.btnPressed.bind(this)
  }

  btnPressed() {
    this.setState({ GeneratePaper: false, TestStart: true, showReport: false, MaxLimitMsg: false, PaperNotFoundMsg: false })
  }

  componentDidMount() {
    this.setState({ GeneratePaper: true, TestStart: false, showReport: false, MaxLimitMsg: false, PaperNotFoundMsg: false, answer: {} })
  }

  onTestFinish(answer) {
    this.setState({ GeneratePaper: false, TestStart: false, showReport: true, MaxLimitMsg: false, PaperNotFoundMsg: false, answer: answer })
    return ''
  }

  paperNotFoundFuc = () => {
    this.setState({ GeneratePaper: false, TestStart: false, showReport: false, MaxLimitMsg: false, PaperNotFoundMsg: true })
  }

  render() {
    return (
      <View>
        <View>
          {this.state.GeneratePaper && (
            <GeneratePaper
              user={this.props.user}
              checkBtnPress={() => this.btnPressed}
              getSubjectsCw={this.props.getSubjectsCw}
              getChaptersCw={this.props.getChaptersCw}
              boardPaperCw={this.props.boardPaperCw}
              generatePaperCw={this.props.generatePaperCw}
            />
          )}
        </View>
        <View>{this.state.TestStart && <TestStart paperNotFoundFuc={this.paperNotFoundFuc} boardPaperCw={this.props.boardPaperCw} onTestFinish={this.onTestFinish.bind(this)} />}</View>
        <View>{this.state.showReport && <Report navigation={this.props.navigation} user={this.props.user} answer={this.state.answer} boardPaperCw={this.props.boardPaperCw} />}</View>
        <View>
          {this.state.MaxLimitMsg && (
            <View>
              <Text>maximum Limit exceeded</Text>
            </View>
          )}
        </View>
        <View>
          {this.state.PaperNotFoundMsg && (
            <View>
              <Text>Paper Not found this Chapter, Try other chapter!</Text>
            </View>
          )}
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getSubjectsCw: (std, cb) => {
    dispatch(getSubjectsCw(std, cb))
  },
  getChaptersCw: (subject, cb) => {
    dispatch(getChaptersCw(subject, cb))
  },
  generatePaperCw: (subject, chapter) => {
    dispatch(generatePaperCw(subject, chapter))
  },
})

const mapStateToProps = state => {
  console.warn("state :", state)
  return {
    user: state.user,
    boardPaperCw: state.boardPaperCw
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Common)
