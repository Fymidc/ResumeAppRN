import { View, Text } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View>
            <View style={{alignItems:"center",padding:10}}  >
                <Text>(X)</Text>
                <Text>User name</Text>
                <Text>UI-Ux Designer</Text>
            </View>
        </View>
    )
}

export default Header