import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ResumeTemplate from '../components/ResumeTemplate'

const HomeScreen = () => {
  return (
    <View style={{ flex: 1 }} >
      <Header />
      
      <View style={{backgroundColor:"yellow",marginVertical:15}} >
      <Text style={{fontSize:16,paddingHorizontal:20}} >Choose a Template</Text>
        <ScrollView horizontal contentContainerStyle={{marginTop:15}} showsHorizontalScrollIndicator={false} 
        alwaysBounceHorizontal={true}
        >
          <ResumeTemplate />
          <ResumeTemplate />
          <ResumeTemplate />
          <ResumeTemplate />
          <ResumeTemplate />
          <ResumeTemplate />
        </ScrollView>
      </View>
    </View>
  )
}

export default HomeScreen