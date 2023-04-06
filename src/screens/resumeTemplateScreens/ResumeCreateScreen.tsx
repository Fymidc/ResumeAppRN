import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import ProgressBar from "./components/ProgressBar";
import { FormikValueProps, Resume, StackParamList } from '../../types';
import EmptyResume from "../../images/resume.svg"

import { FieldArray, Formik, FormikProps } from 'formik';
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {  UpdateResume } from '../../store/reducer/slices/ResumeSlice';


//route. paramdaki veri  paramlist te verildiği için bu şekilde ulaştık
type Props = NativeStackScreenProps<StackParamList, 'ResumeCreate'>

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'ResumeCreate'
>


const ResumeCreateScreen = (props: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();


  const dispatch = useAppDispatch();
  const resumes = useAppSelector(state => state.reducer);

  const selectedResumeArr = resumes.resumes?.filter(
    (resume: Resume) => resume.id === props?.route.params?.id
  );



  const submitResume = (data: Resume) => {
    dispatch(UpdateResume(data))
    navigation.navigate("ResumeDownload", { firstname: data.mainInfo.name })


  }



  const allTabs = [
    "Basic Info",
    "Education Info",
    "Experience Info",
    "Social Media",
    "Skills&Languages",
    
    "Download",
  ];
  const tabPercentRate = 100 / allTabs.length;
  const [currTab, setCurrTab] = useState(0);
  const [progress, setProgress] = useState(tabPercentRate);
  const [selectedTab, setSelectedTab] = useState<any>(allTabs);
  const [choosed, setchoosed] = useState("Basic")

  const incrementTab = () => {
    if (currTab < allTabs.length - 1) {
      setCurrTab((prev) => prev + 1);
    }
  };

  const decrementTab = () => {
    if (currTab > 0) {
      setCurrTab((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setSelectedTab(allTabs[currTab]);
  
    setProgress((prev) => (currTab + 1) * tabPercentRate);
  }, [currTab]);




  return (
    <SafeAreaView style={{ flex: 1 }} >
      {props.route.params.id === undefined ? <ActivityIndicator size={25} color={"green"} /> :

        <View style={styles.container}>
          <ProgressBar progress={progress} />
          {/*Text From Parent Screen*/}
          <Text style={styles.paragraphStyle}>
            Tell us a little about yourself
          </Text>




          {/*View to hold the child screens 
        which can be changed on the click of a button*/}
          <View style={{ flex: 1, padding: 15, borderColor: "#AAA492", elevation: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {allTabs.map((e, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.buttonStyle, { borderBottomColor: selectedTab === e ? "#FF3F00" : " white", borderBottomWidth: selectedTab === e ? 2 : 0 }]}
                    onPress={() => {
                      setSelectedTab(e);
                      setCurrTab(index);
                    }}>
                    <Text style={{ color: selectedTab === e ? "#FF3F00" : '#AAA492', fontWeight: "600", fontSize: 15 }}>{e}</Text>
                  </TouchableOpacity>
                ))}


              </ScrollView>

            </View>
            <View style={{ flex: 1, marginTop: 5 }} >

              <Formik

                initialValues={selectedResumeArr[0]}
                onSubmit={submitResume}
                // validationSchema={
                //   Yup.object().shape({
                //     mainInfo: Yup.object().shape({

                //       name: Yup.string().required("Please enter your name"),
                //       jobtitle: Yup.string(),
                //       email: Yup.string(),
                //       city: Yup.string(),
                //       phone: Yup.string()
                //     })
                //   })
                // }
              >
                {({ values, handleSubmit, errors, handleChange, isValid, isSubmitting }: any) => (
                  <View style={{ flex: 1 }} >
                    {/* basic info section */}
                    {selectedTab == "Basic Info" &&

                      <ScrollView showsVerticalScrollIndicator={false} bounces>

                        <View style={styles.inputContainer}  >
                          <Text style={{ fontSize: 19, fontWeight: "700" }} >Full Name</Text>
                          <TextInput
                            style={styles.input}
                            placeholder='Name'
                            autoCapitalize='words'
                            value={values.mainInfo.name}
                            onChangeText={handleChange("mainInfo.name")}

                          />
                          {(errors.email) && <Text style={styles.error} >{errors.name}</Text>}
                        </View>
                        <View style={styles.inputContainer}  >
                          <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Title</Text>
                          <TextInput
                            style={styles.input}
                            placeholder='Job Title'

                            value={values.mainInfo.jobTitle}
                            onChangeText={handleChange("mainInfo.jobTitle")}

                          />
                          {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}
                        </View>
                        <View style={styles.inputContainer}  >
                          <Text style={{ fontSize: 19, fontWeight: "700" }} >Email</Text>
                          <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            value={values.mainInfo.email}
                            onChangeText={handleChange("mainInfo.email")}

                          />
                          {(errors.email) && <Text style={styles.error} >{errors.email}</Text>}
                        </View>
                        <View style={styles.inputContainer}  >
                          <Text style={{ fontSize: 19, fontWeight: "700" }} >City</Text>
                          <TextInput
                            style={styles.input}
                            placeholder='City'

                            value={values.mainInfo.city}
                            onChangeText={handleChange("mainInfo.city")}

                          />
                          {(errors.city) && <Text style={styles.error} >{errors.city}</Text>}
                        </View>
                        <View style={styles.inputContainer}  >
                          <Text style={{ fontSize: 19, fontWeight: "700" }} >Phone Number</Text>
                          <TextInput
                            style={styles.input}
                            placeholder='Phone Number'
                            keyboardType='numeric'
                            value={values.mainInfo.phone}
                            onChangeText={handleChange("mainInfo.phone")}

                          />
                          {(errors.phone) && <Text style={styles.error} >{errors.phone}</Text>}
                        </View>
                        <View style={styles.inputContainer}  >
                          <Text style={{ fontSize: 19, fontWeight: "700" }} >About me</Text>
                          <TextInput
                            style={styles.input}
                            placeholder='Tell us about yourself in a short sentences.'
                            multiline
                            maxLength={180}
                            value={values.profileInfo.profileDescription}
                            onChangeText={handleChange("profileInfo.profileDescription")}

                          />
                          {(errors.aboutme) && <Text style={styles.error} >{errors.aboutme}</Text>}
                        </View>
                      </ScrollView>
                    }

                    {/* Education info section */}
                    {selectedTab == "Education Info" &&

                      <ScrollView showsVerticalScrollIndicator={false} bounces>
                        <FieldArray
                          name='educationInfo.educations'
                          render={(arrayAdder) => (
                            <View>
                              {values.educationInfo.educations.map((educ: any, index: number) => (
                                <View key={index} >
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >School Name</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='School Name'

                                      value={values.educationInfo.educations[`${index}`].schoolName}
                                      onChangeText={handleChange(`educationInfo.educations[${index}].schoolName`)}

                                    />
                                    {(errors.schoolName) && <Text style={styles.error} >{errors.schoolName}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Study Field</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Study Field'

                                      value={values.educationInfo.educations[`${index}`].fieldOfStudy}
                                      onChangeText={handleChange(`educationInfo.educations[${index}].fieldOfStudy`)}

                                    />
                                    {(errors.fieldOfStudy) && <Text style={styles.error} >{errors.fieldOfStudy}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >School Country</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='School Country'

                                      value={values.educationInfo.educations[`${index}`].schoolCountry}
                                      onChangeText={handleChange(`educationInfo.educations[${index}].schoolCountry`)}

                                    />
                                    {(errors.schoolCountry) && <Text style={styles.error} >{errors.schoolCountry}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Start Date</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='00/00/0000'
                                      keyboardType='number-pad'
                                      maxLength={10}
                                      autoCapitalize='none'
                                      value={values.educationInfo.educations[`${index}`].startDate}
                                      onChangeText={handleChange(`educationInfo.educations[${index}].startDate`)}

                                    />
                                    {(errors.startDate) && <Text style={styles.error} >{errors.startDate}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >End date</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='00/00/0000'
                                      keyboardType='number-pad'
                                      maxLength={10}
                                      value={values.educationInfo.educations[`${index}`].endDate}
                                      onChangeText={handleChange(`educationInfo.educations[${index}].endDate`)}

                                    />
                                    {(errors.endDate) && <Text style={styles.error} >{errors.endDate}</Text>}
                                  </View>

                                  <View style={{ flex: 1, justifyContent: "center" }} >

                                    {values.educationInfo.educations.length > 1 ? (<TouchableOpacity
                                      onPress={() => arrayAdder.remove(index)}
                                      style={{
                                        backgroundColor: "red",
                                        flex: 1,
                                        padding: 12,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Remove</Text>

                                    </TouchableOpacity>) : ""}


                                    <TouchableOpacity
                                      onPress={() => arrayAdder.push({
                                        schoolName: "",
                                        degree: "",
                                        fieldOfStudy: "",
                                        startDate: "",
                                        endDate: "",
                                        schoolCity: "",
                                        schoolCountry: ""
                                      })}
                                      style={{
                                        backgroundColor: "green",
                                        flex: 1,
                                        padding: 12,
                                        marginVertical: 5,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Add</Text>
                                    </TouchableOpacity>
                                  </View>

                                </View>
                              ))}

                            </View>
                          )}

                        />



                      </ScrollView>
                    }

                    {/* Experience İnfo section */}
                    {selectedTab == "Experience Info" &&

                      <ScrollView showsVerticalScrollIndicator={false} bounces>

                        <FieldArray
                          name='ExperienceInfo.experiences'
                          render={(arrayAdder) => (
                            <View>
                              {values.ExperienceInfo.experiences.map((experience: any, index: number) => (
                                <View key={index} >
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Company Name</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Company Name'
                                      autoCapitalize='none'
                                      value={values.ExperienceInfo.experiences[`${index}`].companyName}
                                      onChangeText={handleChange(`ExperienceInfo.experiences[${index}].companyName`)}

                                    />
                                    {(errors.companyName) && <Text style={styles.error} >{errors.companyName}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Position</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Job Position'

                                      value={values.ExperienceInfo.experiences[`${index}`].position}
                                      onChangeText={handleChange(`ExperienceInfo.experiences[${index}].position`)}

                                    />
                                    {(errors.position) && <Text style={styles.error} >{errors.position}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Start Date</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='00/00/0000'
                                      keyboardType='number-pad'
                                      maxLength={10}
                                      autoCapitalize='none'
                                      value={values.ExperienceInfo.experiences[`${index}`].startDate}
                                      onChangeText={handleChange(`ExperienceInfo.experiences[${index}].startDate`)}

                                    />
                                    {(errors.startDate) && <Text style={styles.error} >{errors.startDate}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >End date</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='00/00/0000'
                                      keyboardType='number-pad'
                                      maxLength={10}
                                      value={values.ExperienceInfo.experiences[`${index}`].endDate}
                                      onChangeText={handleChange(`ExperienceInfo.experiences[${index}].endDate`)}

                                    />
                                    {(errors.endDate) && <Text style={styles.error} >{errors.endDate}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Description</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Job Description'

                                      value={values.ExperienceInfo.experiences[`${index}`].jobDescription}
                                      onChangeText={handleChange(`ExperienceInfo.experiences[${index}].jobDescription`)}

                                    />
                                    {(errors.jobDescription) && <Text style={styles.error} >{errors.jobDescription}</Text>}
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center" }} >

                                    {values.ExperienceInfo.experiences.length > 1 ? (<TouchableOpacity
                                      onPress={() => arrayAdder.remove(index)}
                                      style={{
                                        backgroundColor: "red",
                                        flex: 1,
                                        padding: 12,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Remove</Text>

                                    </TouchableOpacity>) : ""}


                                    <TouchableOpacity
                                      onPress={() => arrayAdder.push({
                                        companyName: "",
                                        position: "",
                                        jobTitle: "",
                                        startDate: "",
                                        endDate: "",
                                        jobDescription: ""
                                      })}
                                      style={{
                                        backgroundColor: "green",
                                        flex: 1,
                                        padding: 12,
                                        marginVertical: 5,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Add</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ))}
                            </View>
                          )}
                        />



                      </ScrollView>
                    }
                    {/* Social Media section */}
                    {/* Social kısmına add another Social ekle */}

                    {selectedTab == "Social Media" &&

                      <ScrollView showsVerticalScrollIndicator={false} bounces>
                        <FieldArray
                          name="mainInfo.links"
                          render={(arrayAdder) => (
                            <View>
                              {values.mainInfo.links.map((link: any, index: number) => (
                                <View key={index} >

                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Link Name</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Link Name'
                                      autoCapitalize='none'
                                      value={values.mainInfo.links[`${index}`].name}
                                      onChangeText={handleChange(`mainInfo.links[${index}].name`)}

                                    />
                                    {(errors.linkname) && <Text style={styles.error} >{errors.linkname}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Link Url</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Link Url'
                                      keyboardType='url'
                                      value={values.mainInfo.links[`${index}`].url}
                                      onChangeText={handleChange(`mainInfo.links[${index}].url`)}

                                    />
                                    {(errors.linkurl) && <Text style={styles.error} >{errors.linkurl}</Text>}
                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center" }} >
                                    {values.mainInfo.links.length > 1 ? (<TouchableOpacity
                                      onPress={() => arrayAdder.remove(index)}
                                      style={{
                                        backgroundColor: "red",
                                        flex: 1,
                                        padding: 12,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Remove</Text>

                                    </TouchableOpacity>) : ""}

                                    <TouchableOpacity
                                      onPress={() => arrayAdder.push({ name: "", url: "" })}
                                      style={{
                                        backgroundColor: "green",
                                        flex: 1,
                                        padding: 12,
                                        marginVertical: 5,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Add</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ))}

                            </View>

                          )}
                        />
                      </ScrollView>
                    }
                    {/*  Skill & Languages */}
                    {/* skill kısmına add another skill ve level kısmına fropdown ekle */}

                    {selectedTab == "Skills&Languages" &&

                      <ScrollView showsVerticalScrollIndicator={false} bounces>

                        <FieldArray
                          name="Skills.skills"
                          render={(arrayAdder) => (
                            <View>
                              {values.Skills.skills.map((skill: any, index: number) => (

                                <View key={index} >

                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 23, fontWeight: "700", color: "black" }} >Skills</Text>
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Skill Name</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Skill Name'
                                      autoCapitalize='none'
                                      value={values.Skills.skills[`${index}`].skillName}
                                      onChangeText={handleChange(`Skills.skills[${index}].skillName`)}

                                    />
                                    {(errors.skillname) && <Text style={styles.error} >{errors.skillname}</Text>}
                                  </View>
                                  {/* <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Skill Level</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Skill Level'

                                      value={values.Skills.skills[`${index}`].skillLevel}
                                      onChangeText={handleChange(`Skills.skills[${index}].skillLevel`)}

                                    />
                                    {(errors.skilllevel) && <Text style={styles.error} >{errors.skilllevel}</Text>}


                                  </View> */}
                                  <View style={{ flex: 1, justifyContent: "center" }} >

                                    {values.Skills.skills.length > 1 ? (<TouchableOpacity
                                      onPress={() => arrayAdder.remove(index)}
                                      style={{
                                        backgroundColor: "red",
                                        flex: 1,
                                        padding: 12,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Remove</Text>

                                    </TouchableOpacity>) : ""}


                                    <TouchableOpacity
                                      onPress={() => arrayAdder.push({
                                        skillName: "",
                                       
                                      })}
                                      style={{
                                        backgroundColor: "green",
                                        flex: 1,
                                        padding: 12,
                                        marginVertical: 5,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Add</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ))}
                            </View>

                          )}
                        />
                        <FieldArray
                          name="Languages.languages"
                          render={(arrayAdder) => (
                            <View>


                              {values.Languages.languages.map((language: any, index: number) => (

                                <View key={index} >

                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 23, fontWeight: "700", color: "black" }} >Languages</Text>
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Language Name</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Language Name'
                                      autoCapitalize='none'
                                      value={values.Languages.languages[`${index}`].languageName}
                                      onChangeText={handleChange(`Languages.languages[${index}].languageName`)}

                                    />
                                    {(errors.languagename) && <Text style={styles.error} >{errors.languagename}</Text>}
                                  </View>
                                  <View style={styles.inputContainer}  >
                                    <Text style={{ fontSize: 19, fontWeight: "700" }} >Language Level</Text>
                                    <TextInput
                                      style={styles.input}
                                      placeholder='Language Level'

                                      value={values.Languages.languages[`${index}`].languageLevel}
                                      onChangeText={handleChange(`Languages.languages[${index}].languageLevel`)}

                                    />
                                    {(errors.languagelevel) && <Text style={styles.error} >{errors.languagelevel}</Text>}


                                  </View>
                                  <View style={{ flex: 1, justifyContent: "center" }} >

                                    {values.Languages.languages.length > 1 ? (<TouchableOpacity
                                      onPress={() => arrayAdder.remove(index)}
                                      style={{
                                        backgroundColor: "red",
                                        flex: 1,
                                        padding: 12,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Remove</Text>

                                    </TouchableOpacity>) : ""}

                                    <TouchableOpacity
                                      onPress={() => arrayAdder.push({
                                        languageName: "",
                                        languageLevel: "",
                                      })}
                                      style={{
                                        backgroundColor: "green",
                                        flex: 1,
                                        padding: 12,
                                        marginVertical: 5,
                                        alignItems: "center"
                                      }} >
                                      <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }} >Add</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ))}

                            </View>
                          )}
                        />



                      </ScrollView>
                    }
                   

                    {selectedTab == "Download" &&

                      <View style={{ flex: 1 }}>


                        <EmptyResume
                          width="100%"
                          height="100%"

                        />


                      </View>
                    }

                    {selectedTab !== "Download" ?

                      <View style={styles.inputContainer} >
                        <TouchableOpacity
                          style={styles.button}
                          activeOpacity={0.7}

                          onPress={incrementTab} >

                          <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }} >Next</Text>
                        </TouchableOpacity>
                      </View>

                      :
                      <View style={styles.inputContainer} >
                        <TouchableOpacity
                          style={styles.button}
                          activeOpacity={0.7}
                          //disabled={ isSubmitting}
                          onPress={handleSubmit} >

                          <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }} >Preview</Text>
                        </TouchableOpacity>
                      </View>


                    }
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      }

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  paragraphStyle: {
    margin: 24,
    fontSize: 32,
    color: "black",
    
    textAlign: 'center',
    fontFamily:"arial_narrow_7"
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',


    padding: 10,
    margin: 2,
  },
  inputContainer: {
    marginVertical: 20
  },
  error: {
    color: "red"
  },
  input: {
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#F0EEED",
    borderWidth: 1,
    borderColor: "#D8D9CF"
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#FF3F00",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default ResumeCreateScreen