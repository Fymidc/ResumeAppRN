import { View, Text } from 'react-native'
import React from 'react'
import EmptyResume from "../../../images/emptyimage.svg"

const MyResumes = () => {
  return (
    <View style={{overflow:"hidden",borderRadius:25, aspectRatio: 1,width:"45%",height:"52%", marginHorizontal: 5, marginVertical: 15 }} >
      <EmptyResume
       width="100%"
       height="100%"

        />
    </View>
  )
}

export default MyResumes
//image can be better 