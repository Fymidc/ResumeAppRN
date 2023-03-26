import { View, Text } from 'react-native'
import React from 'react'
import Animated,{useAnimatedStyle,withTiming} from 'react-native-reanimated';

interface ProgressProps {
    progress: number;
  }

const ProgressBar = ({progress}:ProgressProps) => {
    const animatedStyle = useAnimatedStyle(()=>({
        width:withTiming(progress + '%' , {duration:1000} )
    }))

    return (
        <View style={{backgroundColor:"#AAA492",height:15,borderRadius:25}} >
            <Animated.View style={[{ flex:1 ,backgroundColor:"#FF3F00" },animatedStyle]} />

        </View>
    )
}

export default ProgressBar