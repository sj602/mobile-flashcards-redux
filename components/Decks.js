import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Alert, ScrollView }
from 'react-native';
import { connect } from 'react-redux';
import { getDecks, deleteAllDecks } from '../utils/api';
import { dummyDecks } from '../utils/dummyDecks';
import {
  actionGetDecks, actionDeleteAllDecks
} from '../actions/';

class Decks extends Component {
  componentDidMount(){
    const { dispatch } = this.props

    getDecks()
      .then((decks) => {
          dispatch(actionGetDecks(decks))
        }
      )
  }

  render() {
    const { decks, dispatch, navigation } = this.props;

    if(!decks) {
      return (
        <View style={styles.noneDecks}>
         <Text style={{textAlign: 'center'}}>
          You have no decks yet. Go create One!
         </Text>
        </View>
      )
    }

    return (
      <View style={{backgroundColor: 'white'}}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(actionDeleteAllDecks())
              deleteAllDecks()
            }}>
            <View style={styles.deleteDecks}>
              <Text style={{textAlign: 'center'}}>
                Delete All Decks
              </Text>
            </View>
          </TouchableOpacity>

          { decks && Object.keys(decks).map(deck => {
            const title = decks[deck]['title'];
            const questions = decks[deck]['questions'];
            const card = questions.length <= 1 ? 'card' : 'cards';

              return (
                <TouchableOpacity key={title} onPress={() => navigation.navigate('DeckDetail', { title, questions })}>
                  <View style={styles.deck}>
                    <Text style={styles.title}>
                      { title }
                    </Text>
                    <Text style={styles.cards}>
                      { questions.length } {card}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
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


// Styles
const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  deleteDecks: {
    backgroundColor: 'deepskyblue',
    width: 200,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  noneDecks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  deck: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  cards: {
    fontSize: 15,
    color: 'grey',
    textAlign: 'center'
  },
});
