// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card,
 // and will add the card to the list of questions for the deck with the associated title.

import { AsyncStorage } from 'react-native';

const KEY = 'KEY';

export const getDecks = () => {
  return AsyncStorage.getItem(KEY).then(result => JSON.parse(result)) // function인데 return을 안해주면 undefined에러남
};

export const getDeck = (title) => {
  return AsyncStorage.getItem(KEY).then(result => JSON.parse(result))
    .then(data => data[title]);
}

export const saveDeckTitle = (title) => {
  let obj = {};
  obj[title] = {
    title: title,
    questions: [],
  };
  return AsyncStorage.mergeItem(KEY, JSON.stringify(obj));
}

export const addCardToDeck = (title, card) => {
  let obj = {}
  obj = {
    question: card['question'],
    answer: card['answer'],
  }

  return AsyncStorage.getItem(KEY).then(res => JSON.parse(res))
    .then(data => {
      data[title]['questions'].push(obj)
      return AsyncStorage.mergeItem(KEY, JSON.stringify(data))
    })
}

export const deleteAllDecks = () => {
  return AsyncStorage.removeItem(KEY);
}
