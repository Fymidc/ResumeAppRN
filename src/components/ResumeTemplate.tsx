import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

import {useNavigation,RouteProp}  from "@react-navigation/native"

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';


type ProfileScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeS'
>;

const ResumeTemplate = () => {

  const navigation = useNavigation<ProfileScreenNavigationProp>()

  const openup=()=>{
    navigation.navigate("ResumeCreate", { sort: 'latest' })
  }

  return (
    <TouchableOpacity onPress={()=>openup()} activeOpacity={0.9} style={{flex:1,backgroundColor:"green",marginHorizontal:5,height:400,width:250}} >
      <Text>ResumeTemplate</Text>
    </TouchableOpacity>
  )
}

export default ResumeTemplate