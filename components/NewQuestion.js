import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, TextInput, Alert,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addCardToDeck } from '../utils/api';
import { actionAddCard } from '../actions';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
  }

  submitQuestion() {
    const { title } = this.props.navigation.state.params;
    let { question, answer } = this.state;

    // form check
    if(answer === 'Correct' || answer === 'Incorrect') {
    } else if(question === '' || answer === '') {
      return Alert.alert('Warning', 'Please type proper text');
    } else {
      return Alert.alert('Warning', "Please type 'Correct' or 'Incorrect' in an answer form.");
    }

    let obj = {};
    obj = {
      question: question,
      answer: answer,
    }

    addCardToDeck(title, obj);
    this.props.actionAddCard(title, obj);

    this.setState({ question: '', answer: ''});
    this.QuizInput.clear();
    this.AnswerInput.clear();

    Keyboard.dismiss();

    return this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{width: 300}} placeholder="Quiz" ref={ref => this.QuizInput = ref} onChangeText={question => this.setState({ question })} />
        <TextInput style={{width: 300}} placeholder="Type only either 'Correct' or 'Incorrect'" ref={ref => this.AnswerInput = ref} onChangeText={answer => this.setState({ answer })} />
        <TouchableOpacity style={styles.submit} onPress={() => this.submitQuestion()}>
            <Text style={styles.textSubmit}>Submit</Text>
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

export default connect(mapStateToProps, { actionAddCard })(NewQuestion);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: 'white'
  },

  textSubmit: {
    fontSize: 15,
    color: 'white',
  },

  submit: {
    marginTop: 30,
    width: 200,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
  },

});
