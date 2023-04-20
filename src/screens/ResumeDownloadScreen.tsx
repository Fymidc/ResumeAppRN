import { View, Text, StyleSheet, TouchableOpacity ,Alert, Platform, PermissionsAndroid} from 'react-native'
import React, { useRef ,RefObject, useEffect, useState} from 'react'
import { Resume, StackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '../store/store'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ViewShot,{captureRef} from "react-native-view-shot";
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import AsyncStorage from '@react-native-async-storage/async-storage';

//import CameraRoll from '@react-native-community/cameraroll';

//type Props = NativeStackScreenProps<StackParamList, 'ResumeDownload'>
type Props = NativeStackScreenProps<StackParamList, 'ResumeDownload'>


const ResumeDownloadScreen = (props:Props) => {
  const [userid, setuserid] = useState("")
  const {resumeId} = props.route.params
 
  const viewRef= useRef<View>(null)

  async function hasAndroidPermission() {
    const permission = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  
  const captureViewShot = async () => {
   // console.log((await hasAndroidPermission()))
     if (Platform.OS === "android" && !(await hasAndroidPermission())) {
        return;
      }
    try {
     
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
        fileName:"file-name"
      });
      console.log(uri)
      CameraRoll.save(uri,{type:"photo",album:"QR codes"})
      Alert.alert('Success', 'Resume downloaded to your gallery.');
     
    } catch (error) {
      Alert.alert('Error', 'Failed to Download');
    }
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

  useEffect(() => {
    getData()
  }, [])
  
  
 

  const resumes = useAppSelector(state => state.reducer);

  return (

    <View style={{ flex: 1 }} >

      {resumes.resumes?.map((resume: Resume , index:number) => (
        (resume.id === resumeId ?<View style={{ flex: 1,backgroundColor:"white" }} ref={viewRef} 
         key={index} >
          <View style={{ padding: 10 ,backgroundColor:"#2D2727",margin:5}} >

            <Text style={{ fontSize: 20, fontWeight: "700", color: "white", textAlign: "center" }} >{resume.mainInfo?.name}</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "white", textAlign: "center", padding: 2 }} >{resume.mainInfo?.jobTitle}</Text>

            <View style={{ flexDirection: "row" }} >
              <Text style={{ fontSize: 11, fontWeight: "800", color: "white" }}  >E-mail:</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: "white", paddingHorizontal: 4 }} >{resume.mainInfo?.email}</Text>
            </View>

            <View style={{ flexDirection: "row" }} >
              <Text style={{ fontSize: 11, fontWeight: "800", color: "white" }}  >Phone:</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: "white", paddingHorizontal: 4 }} >{resume.mainInfo?.phone}</Text>
            </View>

            <View style={{ flexDirection: "row" }} >
              <Text style={{ fontSize: 11, fontWeight: "800", color: "white" }}  >City</Text>
              <Text style={{ fontSize: 10, fontWeight: "500", color: "white", paddingHorizontal: 4 }} >{resume.mainInfo?.city}</Text>
            </View>

            {resume.mainInfo?.links.map((val:any, index:number) => (
              <View style={{ flexDirection: "row" }} key={index} >

                <Text style={{ fontSize: 11, fontWeight: "800", color: "white" }} >* {val.name + ": "}</Text>
                <Text style={{ fontSize: 10, fontWeight: "500", color: "white" }} > {val.url}</Text>
              </View>
            ))}

          </View>
          <View style={{ padding: 10 }} >

            <Text style={styles.titles} >Profile Summary</Text>
            <Text style={{ fontSize: 12, color: "black",paddingHorizontal:5 }} >{resume.profileInfo?.profileDescription}</Text>

          </View>
          <View style={{ padding: 10 }} >
            <Text style={styles.titles} >Skills & Languages</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }} >

              <View  >

                {resume.Skills.skills.map((val:any, index:number) => (
                  <View style={{ paddingVertical: 3 }} key={index} >

                    <Text style={{ color: "black", fontSize: 11, fontWeight: "600" }} >- {val.skillName}</Text>
                    {/* <Text style={{ color: "black", fontSize: 11 }} >{val.skillLevel}</Text> */}
                  </View>
                ))}
              </View>

              <View>

                {resume.Languages.languages.map((val:any, index:number) => (
                  <View style={{ paddingVertical: 3, flexDirection: "row" }} key={index} >

                    <Text style={{ color: "black", fontSize: 11, fontWeight: "600" }} >{val.languageName}</Text>
                    <Text style={{ paddingHorizontal: 3, color: "black", fontSize: 11 }} >- {val.languageLevel}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>

          
          <View style={{ padding: 10 }} >
            <Text style={styles.titles} >Experiences</Text>
            {resume.ExperienceInfo?.experiences?.map((val:any, index:number) => (
              
              <View style={{ paddingVertical: 3,paddingHorizontal:5 }} key={index} >
                <View style={{ flexDirection: "row" }} >
                  <Text style={{ color: "#1F8A70", fontSize: 11, fontWeight: "600" }}  >Company name:</Text>
                  <Text style={{ color: "black", fontSize: 12, paddingHorizontal: 6 }} >{val.companyName}</Text>
                </View>

                <Text style={{ color: "black", fontSize: 11 }} >{val.position}</Text>
                <View style={{ flexDirection: "row" }} >

                  <Text style={{ color: "black", fontSize: 11 }} >From  {val.startDate}</Text>
                  {val.endDate?.length === 0 ? <Text style={{ fontSize: 11 }} >  Currently Working Here</Text>
                    : <Text style={{ paddingHorizontal: 5, color: "black", fontSize: 11 }} >To  {val.endDate}</Text>}
                </View>

                <Text style={{ color: "black", fontSize: 11 }} >{val.jobDescription}</Text>

              </View>
            ))}


          </View>

          <View style={{ padding: 10 }} >

            <Text style={styles.titles} >Education</Text>

            {resume.educationInfo?.educations?.map((val:any, index:number) => (
              <View style={{ paddingVertical: 3,paddingHorizontal:5 }} key={index} >

                <View style={{ flexDirection: "row" }} >
                  <Text style={{ color: "#1F8A70", fontWeight: "600", fontSize: 11 }} >School Name:</Text>
                  <Text style={{ color: "black", fontSize: 12, paddingHorizontal: 6 }} >{val.schoolName}</Text>
                </View>

                <Text style={{ color: "black", fontSize: 11 }} >{val.fieldOfStudy}</Text>
                <Text style={{ color: "black", fontSize: 11 }} >{val.schoolCountry}</Text>

                <View style={{ flexDirection: "row" }} >

                  <Text style={{ color: "black", fontSize: 11 }} >From  {val.startDate}</Text>
                  {val.endDate?.length === 0 ? <Text style={{ fontSize: 11 }} >  Currently studying Here</Text>
                    : <Text style={{ paddingHorizontal: 5, color: "black", fontSize: 11 }} >To  {val.endDate}</Text>}
                </View>

              </View>
            ))}




          </View>


        </View> : "" )
        
      ))}

      <View style={{ position: "absolute", bottom: 50, right: 50 }} >
        <TouchableOpacity activeOpacity={0.6} onPress={captureViewShot} >
          <MaterialIcons style={{borderWidth:0.6,borderColor:"#E6D2AA",borderRadius:10}} name='file-download' size={50} color={"#42032C"} />
        </TouchableOpacity>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  titles: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F2921D",
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: "#F2921D"
  }
})

export default ResumeDownloadScreen

