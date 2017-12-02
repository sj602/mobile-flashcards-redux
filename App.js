import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStatusBar, setLocalNotification } from './utils/helpers';
import { Stacks } from './utils/navigation';
import { Provider } from 'react-redux';
import reducer from './reducers/';
import { createStore } from 'redux';

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppStatusBar />
          <Stacks />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
