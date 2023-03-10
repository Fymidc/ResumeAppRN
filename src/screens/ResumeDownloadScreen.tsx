import { View, Text, StyleSheet, TouchableOpacity, Share ,Alert} from 'react-native'
import React, { useRef ,RefObject} from 'react'
import { StackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '../store/store'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import ViewShot,{captureRef} from "react-native-view-shot";
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
//import CameraRoll from '@react-native-community/cameraroll';

//type Props = NativeStackScreenProps<StackParamList, 'ResumeDownload'>


const ResumeDownloadScreen = () => {
 
  const viewRef= useRef<View>(null)

  
  const captureViewShot = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 0.8,
        fileName:"file-name"
      });
      console.log(uri)
      CameraRoll.save(uri,{type:"photo",album:"QR codes"})
      await Share.share({ title: "image", url: uri })
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
    }
  }

  //its done you can remove share
  
 

  const resumes = useAppSelector(state => state.reducer);

  return (

    <View style={{ flex: 1 }} >

      {resumes.map((resume, index) => (

        <View style={{ flex: 1,backgroundColor:"white" }} ref={viewRef} 
         key={index} >
          <View style={{ padding: 10 }} >

            <Text style={{ fontSize: 20, fontWeight: "700", color: "black", textAlign: "center" }} >{resume.mainInfo.name}</Text>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "black", textAlign: "center", padding: 8 }} >{resume.mainInfo.jobTitle}</Text>

            <View style={{ flexDirection: "row" }} >
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#1F8A70" }}  >E-mail:</Text>
              <Text style={{ fontSize: 11, fontWeight: "600", color: "black", paddingHorizontal: 4 }} >{resume.mainInfo.email}</Text>
            </View>

            <View style={{ flexDirection: "row" }} >
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#1F8A70" }}  >Phone:</Text>
              <Text style={{ fontSize: 11, fontWeight: "600", color: "black", paddingHorizontal: 4 }} >{resume.mainInfo.phone}</Text>
            </View>

            <View style={{ flexDirection: "row" }} >
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#1F8A70" }}  >City</Text>
              <Text style={{ fontSize: 11, fontWeight: "600", color: "black", paddingHorizontal: 4 }} >{resume.mainInfo.city}</Text>
            </View>

            {resume.mainInfo.links.map((val, index) => (
              <View style={{ flexDirection: "row" }} key={index} >

                <Text style={{ fontSize: 11, fontWeight: "700", color: "#1F8A70" }} >* {val.name + ": "}</Text>
                <Text style={{ fontSize: 11, fontWeight: "600", color: "black" }} > {val.url}</Text>
              </View>
            ))}

          </View>
          <View style={{ padding: 10 }} >

            <Text style={styles.titles} >Profile Summary</Text>
            <Text style={{ fontSize: 12, color: "black" }} >{resume.profileInfo?.profileDescription}</Text>

          </View>
          <View style={{ padding: 10 }} >
            <Text style={styles.titles} >Skills & Languages</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }} >

              <View  >

                {resume.Skills.skills.map((val, index) => (
                  <View style={{ paddingVertical: 3 }} key={index} >

                    <Text style={{ color: "black", fontSize: 11, fontWeight: "600" }} >- {val.skillName}</Text>
                    {/* <Text style={{ color: "black", fontSize: 11 }} >{val.skillLevel}</Text> */}
                  </View>
                ))}
              </View>

              <View>

                {resume.Languages.languages.map((val, index) => (
                  <View style={{ paddingVertical: 3, flexDirection: "row" }} key={index} >

                    <Text style={{ color: "black", fontSize: 11, fontWeight: "600" }} >{val.languageName}</Text>
                    <Text style={{ paddingHorizontal: 3, color: "black", fontSize: 11 }} >- {val.languageLevel}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>

          {/* açıklamalara başlık ekle company name gibi  */}
          <View style={{ padding: 10 }} >
            <Text style={styles.titles} >Experiences</Text>
            {resume.ExperienceInfo?.experiences?.map((val, index) => (
              // design kayması var düzenle
              <View style={{ paddingVertical: 3 }} key={index} >
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

            {resume.educationInfo?.educations?.map((val, index) => (
              <View style={{ paddingVertical: 3 }} key={index} >

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

          {/* <View style={{ padding: 10 }} >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }} >Projects</Text>

            {resume.Projects.projects.map((val, index) => (
              <View key={index} >

                <Text style={{ color: "black", fontSize: 11 }} >{val.projectName}</Text>
                <Text style={{ color: "black", fontSize: 11 }} >{val.projectLink}</Text>
                <Text style={{ color: "black", fontSize: 11 }} >{val.projectDescription}</Text>
              </View>

            ))}


          </View> */}



        </View>
      ))}

      <View style={{ position: "absolute", bottom: 50, right: 50 }} >
        <TouchableOpacity activeOpacity={0.6} onPress={captureViewShot} >
          <MaterialIcons name='file-download' size={50} color={"#54B435"} />
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

