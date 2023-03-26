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
import Navigation from './src/navigation/Navigation';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <HomeScreen/> */}
      <Navigation/>
    </SafeAreaView>
  );
}



export default App;

//navigation setup **
//tab navigation **

//complete homescreen design **
// complete user screen design **
//redux setup **
//create types for resume**
//
//create templatescreens for input section **
//try fragments slide animation **
//complete resumecreatescreen and design**

//fix the date start date and end date if there is no end date put there**
  // currently working here button or something**
  //develop dowload screen**
  //create login screen and signup with formi and yup**
  // add firebase email auth**
  
  //add view shot library to the app and try it **
  // add real time data base and save resumes to database with user id **
  // the get the data from firabase and show them in profile screen**
  //add bottomslidebar for setting and add - contact us,rate us- logout- **
  //fix the ui of the tab bar **
  //add animation to the proggress bar and the tab bar**
  //add firebase ad mob
  //add some fonts and fix some colors of the app 
  //add splash screen and create icon and add them 
  //deploy it


