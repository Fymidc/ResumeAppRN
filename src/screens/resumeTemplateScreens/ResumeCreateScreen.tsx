import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import ProgressBar from "./components/ProgressBar";
import { FormikValueProps, Resume, StackParamList } from '../../types';
import EmptyResume from "../../images/emptyimage.svg"

import { FieldArray, Formik, FormikProps } from 'formik';
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addResume, selectAllResumes } from '../../store/reducer/slices/ResumeSlice';


//route. paramdaki veri  paramlist te verildiği için bu şekilde ulaştık
type Props = NativeStackScreenProps<StackParamList, 'ResumeCreate'>
type values=Resume
type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'ResumeCreate'
>


const ResumeCreateScreen = (props: Props) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  
  const dispatch = useAppDispatch();
  const resumes = useAppSelector(selectAllResumes);
  
  const selectedResumeArr = resumes.filter(
    (resume: Resume) => resume.id === router.query.id
  );
  //fix this issue


  const submitResume = (data:values) => {
    dispatch(addResume(data))
    navigation.navigate("ResumeDownload", { firstname: data.mainInfo.name })

    console.log("submitten gelen", data.mainInfo.name)

  }


  //values.name undefined dönüyor 


  const allTabs = [
    "Basic Info",
    "Education Info",
    "Experience Info",
    "Social Media",
    "Skills&Languages",
    "Projects",
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
    //progress bara animation ekle 
    setProgress((prev) => (currTab + 1) * tabPercentRate);
  }, [currTab]);


  return (
    <SafeAreaView style={{ flex: 1 }} >
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
              validationSchema={
                Yup.object().shape({
                  name: Yup.string().required("Please enter your name"),
                  jobtitle: Yup.string(),
                  email: Yup.string(),
                  city: Yup.string(),
                  phone: Yup.string()
                })
              }
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
                          autoCapitalize='none'
                          value={values.name}
                          onChangeText={handleChange("name")}

                        />
                        {(errors.email) && <Text style={styles.error} >{errors.name}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Title</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Job Title'

                          value={values.jobtitle}
                          onChangeText={handleChange("jobtitle")}

                        />
                        {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Email</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Email'
                          autoCapitalize='none'
                          value={values.email}
                          onChangeText={handleChange("email")}

                        />
                        {(errors.email) && <Text style={styles.error} >{errors.email}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >City</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='City'

                          value={values.city}
                          onChangeText={handleChange("city")}

                        />
                        {(errors.city) && <Text style={styles.error} >{errors.city}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Phone Number</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Phone Number'
                          keyboardType='numeric'
                          value={values.phone}
                          onChangeText={handleChange("phone")}

                        />
                        {(errors.phone) && <Text style={styles.error} >{errors.phone}</Text>}
                      </View>
                    </ScrollView>
                  }

                  {/* Education info section */}
                  {selectedTab == "Education Info" &&

                    <ScrollView showsVerticalScrollIndicator={false} bounces>

                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >School Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='School Name'

                          value={values.schoolname}
                          onChangeText={handleChange("schoolname")}

                        />
                        {(errors.schoolname) && <Text style={styles.error} >{errors.schoolname}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >School Country</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='School Country'

                          value={values.schoolcountry}
                          onChangeText={handleChange("schoolcountry")}

                        />
                        {(errors.schoolcountry) && <Text style={styles.error} >{errors.schoolcountry}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Start Date</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Start Date'
                          autoCapitalize='none'
                          value={values.startdate}
                          onChangeText={handleChange("schoolstartdate")}

                        />
                        {(errors.startdate) && <Text style={styles.error} >{errors.startdate}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >End date</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='End date'

                          value={values.enddate}
                          onChangeText={handleChange("schoolenddate")}

                        />
                        {(errors.enddate) && <Text style={styles.error} >{errors.enddate}</Text>}
                      </View>

                    </ScrollView>
                  }

                  {/* Experience İnfo section */}
                  {selectedTab == "Experience Info" &&

                    <ScrollView showsVerticalScrollIndicator={false} bounces>

                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Company Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Company Name'
                          autoCapitalize='none'
                          value={values.companyname}
                          onChangeText={handleChange("companyname")}

                        />
                        {(errors.companyname) && <Text style={styles.error} >{errors.companyname}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Position</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Job Position'

                          value={values.jobposition}
                          onChangeText={handleChange("jobposition")}

                        />
                        {(errors.jobposition) && <Text style={styles.error} >{errors.jobposition}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Start Date</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Start Date'
                          autoCapitalize='none'
                          value={values.startdate}
                          onChangeText={handleChange("jobstartdate")}

                        />
                        {(errors.startdate) && <Text style={styles.error} >{errors.startdate}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >End date</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='End date'

                          value={values.enddate}
                          onChangeText={handleChange("jobenddate")}

                        />
                        {(errors.enddate) && <Text style={styles.error} >{errors.enddate}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Description</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Job Description'

                          value={values.jobdescription}
                          onChangeText={handleChange("jobdescription")}

                        />
                        {(errors.jobdescription) && <Text style={styles.error} >{errors.jobdescription}</Text>}
                      </View>

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
                            {/* { values.mai } */}
                            <View style={styles.inputContainer}  >
                              <Text style={{ fontSize: 19, fontWeight: "700" }} >Link Name</Text>
                              <TextInput
                                style={styles.input}
                                placeholder='Link Name'
                                autoCapitalize='none'
                                value={values.linkname}
                                onChangeText={handleChange("linkname")}

                              />
                              {(errors.linkname) && <Text style={styles.error} >{errors.linkname}</Text>}
                            </View>
                            <View style={styles.inputContainer}  >
                              <Text style={{ fontSize: 19, fontWeight: "700" }} >Link Url</Text>
                              <TextInput
                                style={styles.input}
                                placeholder='Link Url'

                                value={values.linkurl}
                                onChangeText={handleChange("linkurl")}

                              />
                              {(errors.linkurl) && <Text style={styles.error} >{errors.linkurl}</Text>}
                            </View>
                            <View style={{flex:1 ,justifyContent:"center" }} >

                              <TouchableOpacity 
                              //onPress={()=>arrayAdder.remove(index)}
                              style={{ backgroundColor: "red",
                               flex:1,
                               padding:12,
                               alignItems:"center"
                                }} >
                                <Text style={{color:"white",fontSize:17,fontWeight:"700"}} >Remove</Text>
                              
                              </TouchableOpacity>
                              <TouchableOpacity 
                              onPress={()=>arrayAdder.push({linkname:"",linkurl:""})}
                              style={{ backgroundColor: "green",
                               flex:1,
                               padding:12,
                               marginVertical:5,
                               alignItems:"center"
                                }} >
                                <Text style={{color:"white",fontSize:17,fontWeight:"700"}} >Add</Text>
                              </TouchableOpacity>
                            </View>

                          </View>

                        )}


                      />




                    </ScrollView>
                  }
                  {/*  Skill & Languages */}
                  {/* skill kısmına add another skill ve level kısmına fropdown ekle */}

                  {selectedTab == "Skills&Languages" &&

                    <ScrollView showsVerticalScrollIndicator={false} bounces>
                      <Text style={{ fontSize: 23, fontWeight: "700", color: "black" }} >Skills</Text>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Skill Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Skill Name'
                          autoCapitalize='none'
                          value={values.skillname}
                          onChangeText={handleChange("skillname")}

                        />
                        {(errors.skillname) && <Text style={styles.error} >{errors.skillname}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Skill Level</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Skill Level'

                          value={values.skilllevel}
                          onChangeText={handleChange("skilllevel")}

                        />
                        {(errors.skilllevel) && <Text style={styles.error} >{errors.skilllevel}</Text>}


                      </View>
                      <Text style={{ fontSize: 23, fontWeight: "700", color: "black" }} >Languages</Text>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Language Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Language Name'
                          autoCapitalize='none'
                          value={values.languagename}
                          onChangeText={handleChange("languagename")}

                        />
                        {(errors.languagename) && <Text style={styles.error} >{errors.languagename}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Language Level</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Language Level'

                          value={values.languagelevel}
                          onChangeText={handleChange("languagelevel")}

                        />
                        {(errors.languagelevel) && <Text style={styles.error} >{errors.languagelevel}</Text>}


                      </View>


                    </ScrollView>
                  }

                  {/* Project kısmına add another project ekle */}
                  {selectedTab == "Projects" &&

                    <ScrollView showsVerticalScrollIndicator={false} bounces>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Project Name</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Project Name'
                          autoCapitalize='none'
                          value={values.projectname}
                          onChangeText={handleChange("projectname")}

                        />
                        {(errors.projectname) && <Text style={styles.error} >{errors.projectname}</Text>}
                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Project Link</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Project Link'

                          value={values.projectlink}
                          onChangeText={handleChange("projectlink")}

                        />
                        {(errors.projectlink) && <Text style={styles.error} >{errors.projectlink}</Text>}


                      </View>
                      <View style={styles.inputContainer}  >
                        <Text style={{ fontSize: 19, fontWeight: "700" }} >Project Description</Text>
                        <TextInput
                          style={styles.input}
                          placeholder='Project Description'
                          autoCapitalize='none'
                          value={values.projectdescription}
                          onChangeText={handleChange("projectdescription")}

                        />
                        {(errors.projectdescription) && <Text style={styles.error} >{errors.projectdescription}</Text>}
                      </View>


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
                        disabled={!isValid || isSubmitting}
                        onPress={incrementTab} >

                        <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }} >Next</Text>
                      </TouchableOpacity>
                    </View>

                    :
                    <View style={styles.inputContainer} >
                      <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.7}
                        disabled={!isValid || isSubmitting}
                        onPress={handleSubmit(values)} >

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
    fontSize: 30,
    color: "black",
    fontWeight: '800',
    textAlign: 'center',
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