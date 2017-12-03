import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

class DeckDetail extends Component {
  // static navigationOptions = ({ navigation }) => ({
  //   headerLeft: <TouchableOpacity>
  //           <Ionicons onPress={() => navigation.navigate('Decks', { reload: true })}
  //             name={'md-arrow-back'}
  //             size={25}
  //             style={{marginLeft: 20}}
  //           />
  //         </TouchableOpacity>
  // })

  // componentWillMount() {
  //   Keyboard.dismiss();
  // }

  render() {
    const { title } = this.props.navigation.state.params;
    const { navigate } = this.props.navigation;
    const { decks } = this.props;
    const card = decks[title]['questions'].length === 0 ? 'card' : 'cards';

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.cards}>{decks[title]['questions'].length} {card}</Text>
        <TouchableOpacity style={styles.buttonWhite} onPress={() => navigate('NewQuestion',
          { title })}>
          <Text style={{color:'black'}}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlack} onPress={() => navigate('Quiz',
          { title })}>
          <Text style={{color:'white'}}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(DeckDetail);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },

  deckTitle: {
    fontSize: 30,
  },

  cards: {
    color: 'gray',
    marginBottom: 100,
    marginTop: 20,
  },

  buttonBlack: {
    width: 150,
    height: 30,
    backgroundColor: 'black',
    // flexDirection: 'column',
    marginTop: 10,
    width: 200,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonWhite: {
    width: 150,
    height: 30,
    backgroundColor: 'white',
    marginTop: 100,
    width: 200,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black'
  }
});
