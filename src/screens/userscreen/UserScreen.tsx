import { View, Text } from 'react-native'
import React from 'react'
import Header from './components/Header'
import { useNavigation } from '@react-navigation/native'
import MyResumes from './components/MyResumes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList } from '../../types'
import EmptyResume from "../../images/emptyimage.svg"

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileS'>;


const UserScreen = ({ route }: Props) => {

    console.log(route.name)
    const navigation = useNavigation()


    React.useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {

                // Prevent default behavior of leaving the screen
                e.preventDefault();


                // Prompt the user before leaving the screen

                [navigation]
            }));


    return (
        <View style={{ flex: 1 }}>

            <Header />

            <View style={{ marginTop: 20 }} >
                <Text style={{ paddingHorizontal: 20 ,fontSize:20,color:"black",fontWeight:"700"}} >My CV's</Text>
                <View style={{ padding: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }} >
                 <MyResumes/>
                 <MyResumes/>
                 <MyResumes/>
                 <MyResumes/>
                 

                </View>
            </View>
        </View>
    )
}

export default UserScreen