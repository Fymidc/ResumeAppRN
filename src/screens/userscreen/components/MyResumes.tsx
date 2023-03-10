import { View, Text } from 'react-native'
import React from 'react'
import EmptyResume from "../../../images/resume.svg"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {StackParamList } from '../../../types';


type UserScreenNavigationProp = NativeStackNavigationProp<
StackParamList ,
  'Profile'
>

type Props ={
  id:string
}

const MyResumes = (props:Props) => {
  const navigation = useNavigation<UserScreenNavigationProp>();

  return (
    <View style={{overflow:"hidden",borderRadius:25, aspectRatio: 1,width:"45%",height:"52%", marginHorizontal: 5, marginVertical: 15 }} >
      <EmptyResume
       width="100%"
       height="100%"
     

      onPress={()=>navigation.navigate("ResumeCreate",{id:props.id})}
        />
    </View>
  )
}

export default MyResumes
//image can be better 