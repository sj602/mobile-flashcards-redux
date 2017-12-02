import React from 'react';
import { View, StatusBar, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { Constants } from 'expo';

// * AppStatusBar * //
export function AppStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar barStyle='light-content' />
    </View>
  )
}

// * Notifications * //
const NOTIFICATION_KEY = 'NOTIFICATION_KEY';

export function getDailyReminderValue () {
  return {
    today: "Don't forget to take a quiz today!"
  }
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: 'Mobile-flashcards',
    body: "It's time to do quiz! ",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      vibrate: true,
    }
  }
}

export function setLocalNotification() {

  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((res) => {
      if (res === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() +1)
              tomorrow.setHours(16)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day'
                  }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
