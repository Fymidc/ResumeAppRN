import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProgressBar from "./components/ProgressBar";
import { StackParamList } from '../../types';

import { Formik } from 'formik';
import * as Yup from 'yup'


//route. paramdaki veri  paramlist te verildiği için bu şekilde ulaştık
type Props = NativeStackScreenProps<StackParamList, 'ResumeCreate'>

const ResumeCreateScreen = ({ route }: Props) => {
  //console.log(route.params.sort)
  const [page, setpage] = useState(1)

  const submitResume = () => {

  }

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
              initialValues={{
                name: "",
                jobtitle: "",
                email: "",
                city: "",
                phone: "",

              }}
              onSubmit={submitResume}
              validationSchema={
                Yup.object().shape({
                  name: Yup.string().required("Please enter your name"),
                  jobtitle: Yup.string(),
                  email: Yup.string().required("Please enter your email"),
                  city: Yup.string().required("Please enter your city"),
                  phone: Yup.string().required("Please enter your phone")
                })
              }
            >
              {({ values, handleSubmit, errors, handleChange, isValid, isSubmitting }) => (
                <View style={{flex:1}} >
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
                        placeholder='Name'
                        autoCapitalize='none'
                        value={values.name}
                        onChangeText={handleChange("name")}

                      />
                      {(errors.email) && <Text style={styles.error} >{errors.name}</Text>}
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >School Country</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Job Title'

                        value={values.jobtitle}
                        onChangeText={handleChange("jobtitle")}

                      />
                      {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Start Date</Text>
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
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >End date</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='City'

                        value={values.city}
                        onChangeText={handleChange("city")}

                      />
                      {(errors.city) && <Text style={styles.error} >{errors.city}</Text>}
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
                        placeholder='Name'
                        autoCapitalize='none'
                        value={values.name}
                        onChangeText={handleChange("name")}

                      />
                      {(errors.email) && <Text style={styles.error} >{errors.name}</Text>}
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Position</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Job Title'

                        value={values.jobtitle}
                        onChangeText={handleChange("jobtitle")}

                      />
                      {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Start Date</Text>
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
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >End date</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='City'

                        value={values.city}
                        onChangeText={handleChange("city")}

                      />
                      {(errors.city) && <Text style={styles.error} >{errors.city}</Text>}
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Job Description</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='City'

                        value={values.city}
                        onChangeText={handleChange("city")}

                      />
                      {(errors.city) && <Text style={styles.error} >{errors.city}</Text>}
                    </View>
                    
                    </ScrollView>
                }
                {/* Social Media section */}
                {/* Social kısmına add another Social ekle */}

                  {selectedTab == "Social Media" && 
                
                  <ScrollView showsVerticalScrollIndicator={false} bounces>

                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Link Name</Text>
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
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Link Url</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Job Title'

                        value={values.jobtitle}
                        onChangeText={handleChange("jobtitle")}

                      />
                      {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}
                    </View>
                    
                    </ScrollView>
                }
                  {/*  Skill & Languages */}
                  {/* skill kısmına add another skill ve level kısmına fropdown ekle */}

                  {selectedTab == "Skills&Languages" && 
                
                  <ScrollView showsVerticalScrollIndicator={false} bounces>
                      <Text style={{fontSize:23,fontWeight:"700",color:"black"}} >Skills</Text>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Skill Name</Text>
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
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Skill Level</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Job Title'

                        value={values.jobtitle}
                        onChangeText={handleChange("jobtitle")}

                      />
                      {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}

                      
                    </View>
                    <Text style={{fontSize:23,fontWeight:"700",color:"black"}} >Languages</Text>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Language Name</Text>
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
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Language Level</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Job Title'

                        value={values.jobtitle}
                        onChangeText={handleChange("jobtitle")}

                      />
                      {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}

                      
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
                        placeholder='Name'
                        autoCapitalize='none'
                        value={values.name}
                        onChangeText={handleChange("name")}

                      />
                      {(errors.email) && <Text style={styles.error} >{errors.name}</Text>}
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Project Link</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Job Title'

                        value={values.jobtitle}
                        onChangeText={handleChange("jobtitle")}

                      />
                      {(errors.jobtitle) && <Text style={styles.error} >{errors.jobtitle}</Text>}

                      
                    </View>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >Project Description</Text>
                      <TextInput
                        style={styles.input}
                        placeholder='Name'
                        autoCapitalize='none'
                        value={values.name}
                        onChangeText={handleChange("name")}

                      />
                      {(errors.email) && <Text style={styles.error} >{errors.name}</Text>}
                    </View>
                    
                    
                    </ScrollView>
                }
                  
                  {selectedTab == "Download" && 
                
                  <ScrollView showsVerticalScrollIndicator={false} bounces>
                    <View style={styles.inputContainer}  >
                      <Text style={{ fontSize: 19, fontWeight: "700" }} >create download section</Text>
                      
                    </View>
                   
                    </ScrollView>
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
                          onPress={handleSubmit} >
      
                          <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }} >Download</Text>
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