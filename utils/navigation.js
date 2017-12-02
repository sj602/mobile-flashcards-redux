import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Decks from '../components/Decks';
import NewDeck from '../components/NewDeck';
import DeckDetail from '../components/DeckDetail';
import Quiz from '../components/Quiz';
import NewQuestion from '../components/NewQuestion';

export const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    }
  }
}, {
  navigationOptions: {
    header: null // header null해서 메인화면의 stack navigation header부분이 없어졌음
  }
}
);

export const Stacks = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: 'Deck Detail'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      title: 'New Question'
    }
  }
})
