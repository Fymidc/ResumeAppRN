import { View, Text } from 'react-native'
import React from 'react'
import { StackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '../store/store'

type Props = NativeStackScreenProps<StackParamList, 'ResumeDownload'>


const ResumeDownloadScreen = (props: Props) => {

  const resumes = useAppSelector(state => state.reducer);

  return (
    <View>
      <Text>ResumeDownloadScreen</Text>
      <Text>{props.route.params.firstname}</Text>
      {resumes.map((resume,index) => (

        <View key={index} >

          <Text>{resume.mainInfo.name}</Text>
          <Text>{resume.mainInfo.city}</Text>
        </View>
      ))}
    </View>
  )
}

export default ResumeDownloadScreen