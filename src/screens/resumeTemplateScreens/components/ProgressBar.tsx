import { View, Text } from 'react-native'
import React from 'react'

interface ProgressProps {
    progress: number;
  }

const ProgressBar = ({progress}:ProgressProps) => {
    return (
        <View style={{backgroundColor:"#AAA492",height:15,borderRadius:25}} >
            <View style={{ flex:1,width: `${progress}%` ,backgroundColor:"#FF3F00" }} />

        </View>
    )
}

export default ProgressBar