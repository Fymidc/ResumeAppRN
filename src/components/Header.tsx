import { View, Text } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,

            paddingVertical: 20,
            elevation: 3
        }} >
            <View style={{ justifyContent: "center" }} >

                <Text style={{ fontSize: 22, }} >CV Builder</Text>
                <Text>Choose Cv's and build your own</Text>
            </View>
            <View style={{ justifyContent: "center" }} >
                <Text>(X)</Text>
            </View>
        </View>
    )
}

export default Header