import React, { Component } from 'react';
import { View, Text, TouchableOpacity,
KeyboardAvoidingView, TextInput, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { saveDeckTitle } from '../utils/api';
import { actionAddDeck } from '../actions';

class NewDeck extends Component {
  state = {
    title: ''
  }

  submitDeck() {
    const { dispatch } = this.props;
    const { title } = this.state;

    saveDeckTitle(title)
      .then(() => {
          const deck = {
            title: title,
            questions: [],
          }
          dispatch(actionAddDeck(title, deck))
        }
      )
  }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.textTitle}>What is the title of your new deck?</Text>
        <TextInput style={{width: 250}} placeholder="Deck Title" ref={ref => this.textInput = ref} textAlign="center" onChangeText={(title) => this.setState({ title })} />
        <TouchableOpacity style={styles.submit} onPress={() => this.submitDeck()}>
            <Text style={styles.textSubmit}>Create New Deck!</Text>
        </TouchableOpacity>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(NewDeck)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  textTitle: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 100
  },

  textSubmit: {
    fontSize: 15,
    color: 'white',
  },

  submit: {
    marginTop: 30,
    width: 200,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
  },

});
