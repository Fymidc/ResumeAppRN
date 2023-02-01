/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/userscreen/UserScreen';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <HomeScreen/> */}
      <UserScreen/>
    </SafeAreaView>
  );
}



export default App;

//navigation setup
//tab navigation
//complete homescreen design
// complete user screen design
//create login screen and signup with formi and yup
//redux setup 
//create types for resume
//
//create templatescreens for input section and try fragments slide animation
