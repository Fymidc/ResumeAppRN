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

                <Text style={{ fontSize: 25,color:"black",fontWeight:"700" }} >CV Builder</Text>
                
            </View>
            <View style={{ justifyContent: "center" ,
            backgroundColor:"orange",
            borderRadius:100,
            width:30,height:30,
            
            }} >
                <Text style={{textAlign:"center",fontSize:20,fontWeight:"600"}} >F</Text>
            </View>
        </View>
    )
}

export default Header