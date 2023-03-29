import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import auth from "@react-native-firebase/auth"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList, ProfileStackParamList } from '../../../types'

type UserScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileS'>;

type Props = {
    navigation: UserScreenNavigationProp;
    userName:string
};
const Header = (props: Props) => {

    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => props.navigation.navigate("Logins"));
    }

    return (
        <View style={{ flexDirection: "row",
         justifyContent: "center",
          alignItems: "center" ,
          paddingVertical:15,
          borderBottomWidth:0.5,
          elevation:0.1}} >

            <View style={{ alignItems: "center", padding: 10}}  >

                
                <Text style={{ fontSize: 21,letterSpacing:1, color: "black",fontFamily:"Anton-Regular" }} >PROFILE</Text>

               
            </View>
            <View style={{ position:"absolute",right: 30 }} >
                    <AntDesign
                        onPress={() => handleLogout()}
                        name='logout'
                        size={24} />

                </View>

        </View>
    )
}

export default Header