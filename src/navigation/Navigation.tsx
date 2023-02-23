import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import ResumeScreen from '../screens/userscreen/ResumeScreen'
import UserScreen from '../screens/userscreen/UserScreen'
import ResumeCreateScreen from '../screens/resumeTemplateScreens/ResumeCreateScreen'
import { HomeStackParamList, ProfileStackParamList, ResumeStackParamList, StackParamList, TabStackParamList } from '../types'
import ResumeDownloadScreen from '../screens/ResumeDownloadScreen'



const Tab = createBottomTabNavigator<TabStackParamList>()
const HomeScreenStack = createNativeStackNavigator<HomeStackParamList>()
const ProfileScreenStack = createNativeStackNavigator<ProfileStackParamList>()
const ResumeScreenStack = createNativeStackNavigator<ResumeStackParamList>()
const Stack = createNativeStackNavigator<StackParamList>()


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
        name="Resumes"
        component={ResumeScreen}
        options={() => {
          return {
            headerShown: false
          }
        }}
      />
    </ProfileScreenStack.Navigator>
  )
}
// //deleted after fix
// function ResumeStack() {

//   return (
//     <ResumeScreenStack.Navigator
//         screenOptions={{ headerShown: false }}
//         initialRouteName="FirstFragment"

//       // tabBar={props => <StackBar {...props} />}
//       >
//         <ResumeScreenStack.Screen name="FirstFragment" component={FirstFragment} />
//         <ResumeScreenStack.Screen 
//         options={() => {
//           return {

//             animation: "slide_from_right",
//             headerShown: false
//           }
//         }}
//          name="SecondFragment" component={SecondFragment}  />
//         <ResumeScreenStack.Screen 
//         options={() => {
//           return {

//             animation: "slide_from_right",
//             headerShown: false
//           }
//         }}
//          name="ThirdFragment" component={ThirdFragment}  />


//       </ResumeScreenStack.Navigator>
//   )
// }

function TabStack() {

  const Placeholder = () => { return (<View />) }

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeTab"

    // tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen  name="ProfileTab" component={ProfileStack} />


      <Tab.Screen name="Settings" component={Placeholder} />


    </Tab.Navigator>
  )
}



const Navigation = () => {




  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"

      // tabBar={props => <StackBar {...props} />}
      >
        <Stack.Screen name="Home" component={TabStack} />
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