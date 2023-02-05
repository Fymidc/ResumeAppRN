import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResumeStackParamList } from '../../../types';

type ResumeScreenNavigationProp = NativeStackNavigationProp<
    ResumeStackParamList,
    'SecondFragment'
>;

const SecondFragment = () => {
    const navigation = useNavigation<ResumeScreenNavigationProp>()

    return (
        <View style={{ flex: 1, backgroundColor: "green" }} >
            <Text>SecondFragment</Text>

            <View style={{flex:1, justifyContent: "space-between", flexDirection: "row", marginHorizontal: 20 }} >
                <View>

                    <TouchableOpacity style={{ backgroundColor: "black" }} onPress={() => navigation.navigate("FirstFragment")} >
                        <Text style={{ color: "white" }} >PREVIOUS</Text>
                    </TouchableOpacity>
                </View>

                <View>

                    <TouchableOpacity style={{ backgroundColor: "black" }} onPress={() => navigation.navigate("ThirdFragment")} >
                        <Text style={{ color: "white" }} >NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SecondFragment