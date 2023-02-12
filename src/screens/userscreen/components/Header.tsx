import { View, Text } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View>
            <View style={{ alignItems: "center", padding: 10 }}  >
                <View style={{
                    justifyContent: "center",
                    backgroundColor: "orange",
                    borderRadius: 100,
                    width: 30, height: 30,

                }} >
                    <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }} >F</Text>
                </View>
                <Text style={{fontSize:20,color:"black",fontWeight:"700"}} >User name</Text>
                <Text style={{fontSize:16,color:"black"}} >UI-Ux Designer</Text>
            </View>
        </View>
    )
}

export default Header