import { View, Text } from 'react-native'
import React from 'react'
import Header from './components/Header'
import { useNavigation } from '@react-navigation/native'

const UserScreen = () => {

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