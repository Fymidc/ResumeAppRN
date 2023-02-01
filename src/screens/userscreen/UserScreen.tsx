import { View, Text } from 'react-native'
import React from 'react'
import Header from './Header'

const UserScreen = () => {
    return (
        <View style={{flex:1}}>

            <Header/>

            <View style={{marginTop:20}} >
                <Text style={{paddingHorizontal:20}} >My CV's</Text>
                <View>
                    
                </View>
            </View>
        </View>
    )
}

export default UserScreen