import {
  ACTION_GET_DECKS,
  ACTION_GET_DECK,
  ACTION_ADD_DECK,
  ACTION_ADD_CARD,
  ACTION_DELETE_ALL_DECKS
} from './types';

export function actionGetDecks(decks) {
  return {
    type: ACTION_GET_DECKS,
    decks
  }
}

export function actionGetDeck(title, deck) {
  return {
    type: ACTION_GET_DECK,
    title,
    deck
  }
}

export function actionDeleteAllDecks() {
  return {
    type: ACTION_DELETE_ALL_DECKS,
    decks: {},
  }
}

export function actionAddDeck(title) {
  return {
    type: ACTION_ADD_DECK,
    title,
  }
}

export function actionAddCard(title, card) {
  return {
    type: ACTION_ADD_CARD,
    title,
    card,
  }
}
