import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResumeStackParamList } from '../../../types';


type ResumeScreenNavigationProp = NativeStackNavigationProp<
    ResumeStackParamList,
    'FirstFragment'
>;

const FirstFragment = () => {

    const navigation = useNavigation<ResumeScreenNavigationProp>()

    return (
        <View style={{ flex: 1, backgroundColor: "orange" }} >
            <Text>FirstFragment</Text>

            <View style={{height:30,width:50 ,alignSelf:"flex-end" ,marginHorizontal:20} } >

                <TouchableOpacity style={{ backgroundColor: "black" }} onPress={() => navigation.navigate("SecondFragment")} >
                    <Text style={{color:"white"}} >NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FirstFragment