import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MainScreen from "../images/mainscreen.svg"
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList, Resume } from '../types';
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../store/store';
import { createResume, GetResume } from '../store/reducer/slices/ResumeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from "@reduxjs/toolkit"
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, AdEventType, BannerAdSize } from 'react-native-google-mobile-ads';




AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

RewardedAd.createForAdRequest(TestIds.REWARDED);

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2976719493824952/6075967883';


type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeS'
>;





const HomeScreen = () => {
  const [userid, setuserid] = useState("")

//initial values 
 const initialValue = {
  id: nanoid(),
  userid:userid,
  resumeName: "resume1",
 
  createInfo: {
    date: new Date().toISOString(),
    isUpdated: false,
  },
  mainInfo: {
    sectionName: "mainInfo",
    name: "",
    phone: "",
    city: "",
    jobTitle: "",
    email: "",
    links: [
      {
        name: "",
        url: "",
      },
    ],
  },
  profileInfo: {
    sectionName: "",
    profileDescription: "",
  },
  educationInfo: {
    sectionName: "profileInfo",
    educations: [
      {
        schoolName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        schoolCity: "",
        schoolCountry: ""
      }
    ]

  },
  ExperienceInfo: {
    sectionName: "experienceInfo",
    experiences: [

      {
        companyName: "",
        position: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        jobDescription: ""
      }
    ],
  },
  Skills: {
    sectionName: "Skills",
    skills: [
      {
        skillName: "",
        skillLevel: "",
      },
    ],
  },
  Languages: {
    sectionName: "languages",
    languages: [
      {
        languageName: "",
        languageLevel: "",
      },
    ],
  },
  Projects: {
    sectionName: "projects",
    projects: [
      {
        projectName: "",
        projectDescription: "",
        projectLink: "",
      },
    ],
  }

};



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
  const getData = async () => {
    try {
      const key = await AsyncStorage.getItem('key')
      if(key !== null) {
        setuserid(key)
        console.log("home dan gelen user id",key)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }
  


  // const isfocused = useIsFocused()

  useEffect(() => {
    dispatch(GetResume())
    getData()
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

      <View style={{ flex: 1, alignItems: "center" }} >
        <Text style={{ fontSize: 30, paddingHorizontal: 20, fontFamily:"arial_narrow_7",color: "black", textAlign: "center" }} >Build your cv for new adventures</Text>
        <View style={{

          marginTop: 15,
          height: 350,
          width: "95%",

        }}>
          <MainScreen width="90%" height="90%" />

        </View>



        <View style={styles.inputContainer} >
          <Text style={{ marginVertical: 15, fontSize: 20, fontFamily:"arial_narrow_7", color: "black" }} >
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
      <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "50%",
    
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