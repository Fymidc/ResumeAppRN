
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { Formik } from 'formik';
import * as Yup from "yup"
import Women from "../../images/womenphone.svg"
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Auth, AuthStackParamList } from '../../types';
import auth from "@react-native-firebase/auth"

type AuthScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "Login"
>

const LoginScreen = () => {

  const navigation = useNavigation<AuthScreenNavigationProp>()
  const [loading, setloading] = useState(false)

  const login = (values: Auth, { setsubmitting, resetForm }: any) => {
    setloading(true)
    try {
      auth().signInWithEmailAndPassword(values.email, values.password).then(() => {
        resetForm({})
        setloading(false)

      })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert("That email address is already in use!")
            setloading(false)
            return
          }
          if (error.code === 'auth/internal-error') {
            Alert.alert("Unexpected error happend!")
            setloading(false)
            return
          }
          if (error.code === 'auth/weak-password') {
            Alert.alert("password is too short.")
            setloading(false)
            return
          }
          if (error.code === 'auth/user-not-found') {
            Alert.alert("user not found.")
            setloading(false)
            setsubmitting(false)
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert("That email address is invalid!")
            setloading(false)
            setsubmitting(false)
          }

        })
    } catch (error) {

      setsubmitting(false)
    }

  }
  return (
    <View style={style.container} >
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: -60
      }} >

        <Women width="70%" height="60%" />
      </View>
      <View style={style.header} >

        <Text style={{ top: -70, fontSize: 32, color: "black", fontFamily: "arial_narrow_7" }} >Login</Text>
      </View>
      <Formik

        initialValues={{
          email: "",
          password: ""
        }}
        onSubmit={login}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email("Not a valid email").required("You must enter an email"),
            password: Yup.string().required("You must enter a Password")
          })
        }
      >
        {({ values, handleSubmit, errors, handleChange, isValid, isSubmitting }) => (
          <View style={{ width: "100%", paddingHorizontal: 30, justifyContent: "center" }} >
            <View style={style.inputContainer}  >

              <View style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                backgroundColor: "white"
              }} >

                <Feather name='at-sign' size={18} />
                <TextInput
                  style={style.input}
                  placeholder='Email'
                  autoCapitalize='none'
                  value={values.email}
                  onChangeText={handleChange("email")}

                />
              </View>
              {(errors.email) && <Text style={style.error} >{errors.email}</Text>}
            </View>
            <View style={style.inputContainer}  >
              <View style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                backgroundColor: "white"
              }} >
                <AntDesign name='lock' size={18} />
                <TextInput
                  style={style.input}
                  placeholder='Password'
                  secureTextEntry={true}
                  autoCapitalize='none'
                  value={values.password}
                  onChangeText={handleChange("password")}

                />
              </View>
              {(errors.password) && <Text style={style.error} >{errors.password}</Text>}
            </View>
            <View style={style.inputContainer} >
              <TouchableOpacity
                style={style.button}
                activeOpacity={0.7}
                disabled={!isValid}
                onPress={handleSubmit} >
                {loading 
                ? <ActivityIndicator color={"white"} size={24}/>
                : <Text style={{ fontSize: 18, fontWeight: "700", color: "white" }} >Login</Text>
                }
              </TouchableOpacity>
              <View style={{ flexDirection: "row", top: 20, justifyContent: "center" }} >

                <Text style={{ textAlign: "center" }} >New to Resume? </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Register")} >

                  <Text style={{ textAlign: "center", color: "#2F58CD" }} >Register here..</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        )}
      </Formik>
    </View>
  )
}

export default LoginScreen

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    marginBottom: 20,
    top: -80,

  },
  input: {
    padding: 15,
    flex: 1,


  },
  header: {
    marginBottom: 30,
    width: "100%",
    paddingHorizontal: 30,

  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#2F58CD",
    borderRadius: 15,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  error: {
    color: "red"
  }
})
