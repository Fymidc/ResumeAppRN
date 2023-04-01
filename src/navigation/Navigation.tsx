import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/userscreen/UserScreen'
import ResumeCreateScreen from '../screens/resumeTemplateScreens/ResumeCreateScreen'
import { AuthStackParamList, HomeStackParamList, ProfileStackParamList, ResumeStackParamList, StackParamList, TabStackParamList } from '../types'
import ResumeDownloadScreen from '../screens/ResumeDownloadScreen'
import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "react-native-vector-icons/AntDesign"

import auth from "@react-native-firebase/auth"
import RBSheet from 'react-native-raw-bottom-sheet'
import CustomtabBar from './CustomTabBar'

const Tab = createBottomTabNavigator<TabStackParamList>()
const HomeScreenStack = createNativeStackNavigator<HomeStackParamList>()
const ProfileScreenStack = createNativeStackNavigator<ProfileStackParamList>()
const ResumeScreenStack = createNativeStackNavigator<ResumeStackParamList>()
const Stack = createNativeStackNavigator<StackParamList>()
const Auth = createNativeStackNavigator<AuthStackParamList>()


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
            animation: "slide_from_right",
            headerShown: false
          }
        }}
      />
      <ProfileScreenStack.Screen
        name="Logins"
        component={LoginScreen}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />

    </ProfileScreenStack.Navigator>
  )
}


function TabStack() {

  const Placeholder = () => {return(<View/>)}

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false ,tabBarHideOnKeyboard:true}}
      initialRouteName="HomeTab"
      tabBar={props => <CustomtabBar {...props} /> }
     
    // tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />


      <Tab.Screen name="Settings" component={Placeholder}
       
      />


    </Tab.Navigator>
  )
}

function AuthStack() {

  return (
    <Auth.Navigator>
      <Auth.Screen
        name="Login"
        component={LoginScreen}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />
      <Auth.Screen
        name="Register"
        component={SignupScreen}
        options={() => {
          return {
            animation: "slide_from_bottom",
            headerShown: false
          }
        }}
      />

    </Auth.Navigator>
  )
}


const Navigation = () => {

  const [signedin, setsignedin] = useState(false)
  
  useEffect(() => {
   
    auth().onAuthStateChanged(user => {
      if (user) {
        AsyncStorage.setItem('key', user.uid)
        
        setsignedin(true)
      } else {
        setsignedin(false)
      }
    })
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Auth"

      // tabBar={props => <StackBar {...props} />}
      >
        { signedin ? <Stack.Screen name="Home" component={TabStack} />
          :
          <Stack.Screen name="Auth" component={AuthStack} />
        }


        <Stack.Screen name="Profile" component={TabStack} />
        <Stack.Screen name="ResumeCreate"
          component={ResumeCreateScreen}
          options={() => {
            return {

              animation: "slide_from_right",
              headerShown: false
            }
          }}
        />
        <Stack.Screen name="ResumeDownload"
          component={ResumeDownloadScreen}
          options={() => {
            return {

              animation: "slide_from_bottom",
              headerShown: false
            }
          }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation