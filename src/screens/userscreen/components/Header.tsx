import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import auth from "@react-native-firebase/auth"

const Header = () => {

    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }} >

            <View style={{ alignItems: "center", padding: 10, left: "90%" }}  >

                <View style={{
                    justifyContent: "center",
                    backgroundColor: "orange",
                    borderRadius: 100,
                    width: 30, height: 30,

                }} >
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }} >F</Text>
                </View>
                <Text style={{ fontSize: 20, color: "black", fontWeight: "700" }} >User name</Text>
                <Text style={{ fontSize: 16, color: "black" }} >UI-Ux Designer</Text>
            </View>
            <View style={{ left: 30 }} >
                <AntDesign
                    onPress={() => handleLogout()}
                    name='logout'
                    size={24} />

            </View>
        </View>
    )
}

export default Header