import { View, Text, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResumeStackParamList } from '../../../types';

//for the get navigation and route props
//type Props = NativeStackScreenProps<ResumeStackParamList, 'FirstFragment'>;


type Prop = {
    setpage:Dispatch<SetStateAction<number>>
    page:number
}
const SecondFragment = (props:Prop) => {


    return (
        <View style={{ flex: 1, backgroundColor: "green" }} >
            <Text>SecondFragment</Text>

            <View style={{flex:1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 20 }} >
              

                <View>

                    <TouchableOpacity style={{ backgroundColor: "black" }}onPress={() => props.setpage(props.page +1)} >
                        <Text style={{ color: "white" }} >NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SecondFragment