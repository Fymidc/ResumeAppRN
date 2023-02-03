import { View, Text } from 'react-native'
import React from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../../types';

//route. paramdaki veri  paramlist te verildiği için bu şekilde ulaştık
  type Props = NativeStackScreenProps<HomeStackParamList, 'ResumeCreate'>
  
const ResumeCreateScreen = ({route}:Props) => {
    console.log(route.params.sort)
      
  return (
    <View>
      <Text>ResumeCreateScreen</Text>
    </View>
  )
}

export default ResumeCreateScreen