import {
  ACTION_GET_DECKS,
  ACTION_GET_DECK,
  ACTION_ADD_DECK,
  ACTION_ADD_CARD,
  ACTION_DELETE_ALL_DECKS,
} from '../actions/types';

// const initialState = {
//   decks: {
//     React: {
//       title: 'React',
//       questions: [
//         {
//           question: 'What is React?',
//           answer: 'A library for managing user interfaces'
//         },
//         {
//           question: 'Where do you make Ajax requests in React?',
//           answer: 'The componentDidMount lifecycle event'
//         }
//       ]
//     },
//     JavaScript: {
//       title: 'JavaScript',
//       questions: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         }
//       ]
//     }
//   },
//   isReady: false,
//   hasDecks: false,
//   deck: {
//     title: '',
//     questions: [],
//   },
// }

export default function decks(state = {}, action) {
  switch(action.type) {
    case ACTION_GET_DECKS:
      return {
        ...state,
        decks: action.decks
      }

    case ACTION_GET_DECK:
      return {
        ...state,
        deck: action.deck
      }

    case ACTION_ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            title: action.title,
            questions: [],
          }
        }
      }

    case ACTION_ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.title]: {
            title: action.title,
            questions: state.decks[action.title].questions.concat(action.card)
          }
        }
      }

    case ACTION_DELETE_ALL_DECKS:
      return {
        ...state,
        decks: {},
      }

    default:
      return state;
  }
}
