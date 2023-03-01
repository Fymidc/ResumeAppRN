import { View, Text } from 'react-native'
import React from 'react'
import { StackParamList } from '../types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '../store/store'

type Props = NativeStackScreenProps<StackParamList, 'ResumeDownload'>


const ResumeDownloadScreen = (props: Props) => {

  const resumes = useAppSelector(state => state.reducer);

  //icon ekle

  return (
    <View style={{flex:1,backgroundColor:"red"}} >

      {resumes.map((resume, index) => (

        <View key={index} >
          <View style={{ backgroundColor: "orange", padding: 10 }} >

            <Text style={{ fontSize: 20, fontWeight: "700", color: "black", textAlign: "center" }} >{resume.mainInfo.name}</Text>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "black", textAlign: "center" }} >{resume.mainInfo.jobTitle}</Text>
            <Text style={{ fontSize: 11, fontWeight: "600", color: "black" }} >{resume.mainInfo.email}</Text>
            <Text style={{ fontSize: 11, fontWeight: "600", color: "black" }} >{resume.mainInfo.phone}</Text>
            <Text style={{ fontSize: 11, fontWeight: "600", color: "black" }} >{resume.mainInfo.city}</Text>
            {resume.mainInfo.links.map((val, index) => (
              <View style={{ flexDirection: "row" }} key={index} >

                <Text style={{ fontSize: 11, fontWeight: "600", color: "black" }} >{val.name + ": "}</Text>
                <Text style={{ fontSize: 11, fontWeight: "600", color: "black" }} >{val.url}</Text>
              </View>
            ))}

          </View>
          <View style={{ padding: 10 }} >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }} >Profile Summary</Text>
            <Text style={{ fontSize: 11,color: "black" }} >{resume.profileInfo?.profileDescription}</Text>

          </View>
          <View style={{ padding: 10 }} >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }} >Skills & Languages</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }} >

              <View  >

                {resume.Skills.skills.map((val, index) => (
                  <View style={{ paddingVertical: 5 }} key={index} >

                    <Text style={{color:"black",fontSize:11}} >{val.skillName}</Text>
                    <Text style={{color:"black",fontSize:11}} >{val.skillLevel}</Text>
                  </View>
                ))}
              </View>

              <View>

                {resume.Languages.languages.map((val, index) => (
                  <View style={{ paddingVertical: 5 }} key={index} >

                    <Text style={{color:"black",fontSize:11}} >{val.languageName}</Text>
                    <Text style={{color:"black",fontSize:11}} >{val.languageLevel}</Text>
                  </View>
                ))}
              </View>
            </View>

          </View>

          {/* açıklamalara başlık ekle company name gibi  */}
          <View style={{ padding: 10 }} >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }} >Experiences</Text>
            <Text style={{ color: "black", fontSize:11 }} >{resume.ExperienceInfo?.companyName}</Text>
            <Text style={{ color: "black", fontSize:11 }} >{resume.ExperienceInfo?.position}</Text>
            <Text style={{ color: "black", fontSize:11 }} >{resume.ExperienceInfo?.startDate}</Text>
            {resume.ExperienceInfo?.endDate?.length === 0 ? <Text style={{fontSize:11}} >Currently Working Here</Text>
            : <Text style={{ color: "black" ,fontSize:11}} >{resume.ExperienceInfo?.endDate}</Text> }
            
            {/* experienceyi sil, educationa study field ekle */}
            {/* experience ve educationu yan yana al  */}
            <Text style={{ color: "black",fontSize:11 }} >{resume.ExperienceInfo?.jobDescription}</Text>

          </View>

          <View style={{ padding: 10 }} >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }} >Education</Text>
            <Text style={{ color: "black",fontSize:11 }} >{resume.educationInfo?.schoolName}</Text>
            {/* <Text style={{ color: "black" }} >{resume.educationInfo?.studyfield}</Text> */}
            <Text style={{ color: "black" ,fontSize:11}} >resume.educationInfo?.fieldOfStudy</Text>
            <Text style={{ color: "black" ,fontSize:11}} >{resume.educationInfo?.schoolCountry}</Text>
            <Text style={{ color: "black" ,fontSize:11}} >{resume.educationInfo?.startDate}</Text>
            {resume.educationInfo?.endDate?.length === 0 ? <Text style={{fontSize:11}} >Currently studying Here</Text>
            : <Text style={{ color: "black",fontSize:11 }} >{resume.educationInfo?.endDate}</Text> }
            
            

          </View>

           <View style={{ padding: 10 }} >
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }} >Projects</Text>
                  
            {resume.Projects.projects.map((val, index) => (
            <View key={index} >

              <Text style={{color:"black", fontSize:11}} >{val.projectName}</Text>
              <Text style={{color:"black", fontSize:11}} >{val.projectLink}</Text>
              <Text style={{color:"black", fontSize:11}} >{val.projectDescription}</Text>
            </View>

          ))}
        

          </View>
        
          
         
        </View>
      ))}
    </View>
  )
}

export default ResumeDownloadScreen