/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
 
  useColorScheme,
 
} from 'react-native';

import {
  Colors,

} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation/Navigation';
import SplashScreen from 'react-native-splash-screen';
import { MobileAds } from 'react-native-google-mobile-ads';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  
    useEffect(() => {
      SplashScreen.hide()
      MobileAds()
        .initialize()
        .then(adapterStatuses =>{
          
        })
    }, [])

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
