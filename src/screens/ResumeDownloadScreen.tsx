import { View, Text } from 'react-native'
import React from 'react'
import { FormikValueProps, StackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<StackParamList, 'ResumeDownload'>


const ResumeDownloadScreen = (props:Props) => {
  return (
    <View>
      <Text>ResumeDownloadScreen</Text>
      <Text>{props.route.params.firstname}</Text>
    </View>
  )
}

export default ResumeDownloadScreen