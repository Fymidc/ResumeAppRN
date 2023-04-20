/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  Platform,
  SafeAreaView,

  useColorScheme,

} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import { MobileAds } from 'react-native-google-mobile-ads';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance, PushNotificationOptions } from "react-native-push-notification";
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { PermissionsAndroid } from 'react-native';

interface NotificationOptions extends PushNotificationOptions {
  channelId?: string;
}



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    SplashScreen.hide()
    MobileAds()
      .initialize()
      .then(adapterStatuses => {

      })
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  useEffect(() => {
    messaging().onMessage(response => {
      console.log(JSON.stringify(response));
      if (Platform.OS !== 'ios') {
        showNotification(response.notification!);
        return;
      }
      PushNotificationIOS.requestPermissions().then(() =>
        showNotification(response.notification!),
      );
    });


  }, []);

  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );

  const showNotification = (
    notification: FirebaseMessagingTypes.Notification,
  ) => {
    PushNotification.localNotification({
      title: notification.title,
      message: notification.body!,
      channelId: "channel-id"
    });
  };

  //notifiact,on cannot be settled

  PushNotification.configure({
    // Called when a remote or local notification is opened or received
    onNotification: (notification) => {
      console.log('Push notification received:', notification);
    },
    // Called when the user taps on the notification to open the app
    onRegister: (token) => {
      console.log('Push notification token:', token);
    },

    // You can customize the channel name and importance level as needed


  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <HomeScreen/> */}
      <Navigation />
    </SafeAreaView>
  );
}



export default App;
