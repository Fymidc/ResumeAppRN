import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../../types';
import FirstFragment from './fragments/FirstFragment';
import SecondFragment from './fragments/SecondFragment';
import ThirdFragment from './fragments/ThirdFragment';

//route. paramdaki veri  paramlist te verildiği için bu şekilde ulaştık
  type Props = NativeStackScreenProps<HomeStackParamList, 'ResumeCreate'>
  
const ResumeCreateScreen = ({route}:Props) => {
//console.log(route.params.sort)
  const [page, setpage] = useState(1)


  const RenderElement = () => {
    //You can add N number of Views here in if-else condition
    if (page === 1) {
      //Return the FirstScreen as a child to set in Parent View
      return <FirstFragment />;
    } else if (page === 2) {
      //Return the SecondScreen as a child to set in Parent View
      return <SecondFragment />;
    } else {
      //Return the ThirdScreen as a child to set in Parent View
      return <ThirdFragment />;
    }
  };
    
      
  return (
    <SafeAreaView style={{flex:1}} >
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {/*To set the FirstScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setpage(1)}>
            <Text style={{color: 'black'}}>1st View</Text>
          </TouchableOpacity>
          {/*To set the SecondScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setpage(2)}>
            <Text style={{color: '#ffffff'}}>2nd View</Text>
          </TouchableOpacity>
          {/*To set the ThirdScreen*/}
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => setpage(3)}>
            <Text style={{color: '#ffffff'}}>3rd View</Text>
          </TouchableOpacity>
        </View>

        {/*Text From Parent Screen*/}
        <Text style={styles.paragraphStyle}>
          Example of view like fragment in React Native
        </Text>

        {/*View to hold the child screens 
        which can be changed on the click of a button*/}
        <View style={{flex:1}}>
          <RenderElement />
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraphStyle: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#808080',
    padding: 10,
    margin: 2,
  },
});

export default ResumeCreateScreen