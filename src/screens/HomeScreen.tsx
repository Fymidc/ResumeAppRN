import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MainScreen from "../images/mainscreen.svg"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, initialValue, Resume } from '../types';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../store/store';
import { createResume, GetResume } from '../store/reducer/slices/ResumeSlice';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeS'
>;

const HomeScreen = () => {
  const [resumeCreted, setresumeCreted] = useState(false)
  const dispatch = useAppDispatch();
  
  const resumes = useAppSelector(state => state.reducer);
//state kırmızı düzelt

  const navigation = useNavigation<HomeScreenNavigationProp>()

  //console.log("resume",resumes)
  let lastCreatedResume: Resume | undefined;

  const createScreen = () => {
   
    setresumeCreted(true)
    console.log("create called")
    dispatch(createResume(initialValue))
  }

 // const isfocused = useIsFocused()

  useEffect(() => {
    dispatch(GetResume())
    lastCreatedResume = resumes?.resumes.slice(-1)[0];
    console.log("lastcreated", lastCreatedResume)
    if (resumeCreted) {
      setTimeout(() => {
        navigation.navigate("ResumeCreate", { id: lastCreatedResume?.id })
      }, 500);
    }
  }, [resumeCreted])
  //last created kısmıında id hemen create screene geçmiyor
//hatayı düzelt resumes den gelen get isteğini düzenle
console.log("home resumes", resumes)
  return (
    <View style={{ flex: 1, backgroundColor: "white" }} >
      <Header />

      <View style={{ flex: 1, marginVertical: 10, alignItems: "center" }} >
        <Text style={{ fontSize: 30, paddingHorizontal: 20, fontWeight: "700", color: "black", textAlign: "center" }} >Build your cv for new adventures</Text>
        <View style={{

          marginTop: 15,
          height: 350,
          width: "95%",

        }}>
          <MainScreen width="100%" height="100%" />

        </View>



        <View style={styles.inputContainer} >
          <Text style={{ marginVertical: 15, fontSize: 20, fontWeight: "700", color: "black" }} >
            Let's create a new CV
          </Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}

            onPress={() => createScreen()}  >

            <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }} >Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "50%",
    marginVertical: 20,
    alignItems: "center"
  },
  button: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#FF3F00",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
})

export default HomeScreen