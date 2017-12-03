import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class Quiz extends Component {
  state = {
    questions: [],
    correctQuestions: [],
    cloneQuestions: [],
    flipped: false,
  }

  componentWillMount() {
    const { title } = this.props.navigation.state.params;
    const { questions } = this.props.decks[title];

    this.setState({
      questions: questions,
      cloneQuestions: questions.slice(0)
    });

  }

  handleFlipped = () => {
    this.setState((state) => ({ flipped: !state.flipped }))
  }

  checkAnswer = (txt) => {
    const { title } = this.props.navigation.state.params;
    const { questions } = this.props.decks[title];
    const { cloneQuestions } = this.state;
    let { correctQuestions } = this.state

    let arr = []
    arr.push(cloneQuestions.shift())

    if( questions[0]['answer'] === txt ) {
      correctQuestions = correctQuestions.concat(arr)
    }

    this.setState({ correctQuestions })

  }

  render() { // no this.setState() in render method
    const { title } = this.props.navigation.state.params;
    const originalQuestions = this.props.decks[title]['questions'];
    const { questions } = this.state;
    let { cloneQuestions } = this.state

    if(cloneQuestions.length === 0){
      const { navigate } = this.props.navigation
      const rate = Math.round(this.state.correctQuestions.length / questions.length * 100) || 0

      return (
        <View style={styles.container}>
            <View style={styles.textView}>
              <Text style={styles.text1}>Your Correct Rate : {rate}%</Text>
            </View>
          <TouchableOpacity style={styles.buttonGreen} onPress={() => navigate('Home')}>
            <Text style={{color: 'white'}}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={() =>
            this.setState({
                questions: originalQuestions,
                correctQuestions: originalQuestions.slice(0),
                flipped: false,
              })
            }>
            <Text style={{color: 'white'}}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      )
    }

    const text1 = this.state.flipped === false ? cloneQuestions[0]["question"] : cloneQuestions[0]["answer"]
    const text2 = this.state.flipped === false ?  'Answer' : 'Question'

      return (

          <View style={styles.container}>
            <TouchableOpacity onPress={() => this.handleFlipped()}>
              <View style={styles.textView}>
                <Text style={styles.text1}>{text1}</Text>
                <Text style={styles.text2}>{text2}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGreen} onPress={() => this.checkAnswer('Correct')}>
              <Text style={{color: 'white'}}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRed} onPress={() => this.checkAnswer('Incorrect')}>
              <Text style={{color: 'white'}}>Incorrect</Text>
            </TouchableOpacity>

          </View>
        )
    }
  }

const mapStateToProps = (state) => {
  return {
    decks: state.decks
  }
};

export default connect(mapStateToProps)(Quiz);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  percentage: {
    paddingBottom: 50,
  },

  textView: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  text1: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  text2: {
    fontSize: 15,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  buttonGreen: {
    width: 150,
    height: 30,
    backgroundColor: 'green',
    marginTop: 40,
    width: 200,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonRed: {
    width: 150,
    height: 30,
    backgroundColor: 'red',
    marginTop: 20,
    width: 200,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
  }
})
