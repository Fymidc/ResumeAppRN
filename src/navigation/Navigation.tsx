import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type {NativeStackScreenProps} from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen'
import ResumeScreen from '../screens/resumeTemplateScreens/ResumeScreen'
import UserScreen from '../screens/userscreen/UserScreen'
import ResumeCreateScreen from '../screens/resumeTemplateScreens/ResumeCreateScreen'
import { HomeStackParamList, ProfileStackParamList, TabStackParamList } from '../types'



const Tab = createBottomTabNavigator<TabStackParamList>()
const HomeScreenStack = createNativeStackNavigator<HomeStackParamList>()
const ProfileScreenStack = createNativeStackNavigator<ProfileStackParamList>()



function HomeStack() {

  return (
    <HomeScreenStack.Navigator>
      <HomeScreenStack.Screen
        name="HomeS"
        component={HomeScreen}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />
      <HomeScreenStack.Screen
        name="ResumeTemplate"
        component={ResumeCreateScreen}
        options={() => {
          return {
            
            animation: "slide_from_right",
            headerShown: false
          }
        }}
      />
    </HomeScreenStack.Navigator>
  )
}

function ProfileStack() {

  return (
    <ProfileScreenStack.Navigator>
      <ProfileScreenStack.Screen
        name="ProfileS"
        component={UserScreen}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />
      <ProfileScreenStack.Screen
        name="Resumes"
        component={ResumeScreen}
        options={() => {
          return {
            
            animation: "slide_from_right",
            headerShown: false
          }
        }}
      />
    </ProfileScreenStack.Navigator>
  )
}

const Navigation = () => {


  const Placeholder = () => { return (<View />) }

  return (
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
       
      // tabBar={props => <TabBar {...props} />}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen  name="Profile" component={ProfileStack}  />

       
        <Tab.Screen name="Settings" component={Placeholder} />
        

      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Navigation