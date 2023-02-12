import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { ResumeStackParamList } from '../../../types';

//for the get navigation and route props
//type Props = NativeStackScreenProps<ResumeStackParamList, 'FirstFragment'>;

type Prop = {
    setpage:Dispatch<SetStateAction<number>>
    page:number
}

const FirstFragment = (props:Prop) => {
    //console.log(props.page)

    return (
        <View style={{ flex: 1, backgroundColor: "orange" }} >
            <Text>FirstFragment</Text>

            <View style={{height:30,width:50 ,alignSelf:"flex-end" ,marginHorizontal:20} } >

                <TouchableOpacity style={{ backgroundColor: "black" }} onPress={() => props.setpage(props.page +1)} >
                    <Text style={{color:"white"}} >NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FirstFragment