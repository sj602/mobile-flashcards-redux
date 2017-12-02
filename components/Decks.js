import React, { Component } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import { actionGetDecks } from '../actions/';

class Decks extends Component {
  componentDidMount(){
    const { dispatch } = this.props

    getDecks()
      .then((decks) => { dispatch(actionGetDecks(decks)) } )

    console.log(this.props.state)

  }
  render(){
    return (
      <View>
        <Text>1</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Decks)
