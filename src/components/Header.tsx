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

                <Text style={{ fontSize: 38,color:"black",fontFamily:"One two thirty-four" }} >CV Builder</Text>
                
            </View>
           
        </View>
    )
}

export default Header