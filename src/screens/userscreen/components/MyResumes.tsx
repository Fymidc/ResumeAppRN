import { View, Text, Alert } from 'react-native'
import React from 'react'
import EmptyResume from "../../../images/resume.svg"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../types';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useAppDispatch } from '../../../store/store';
import { DeleteResume } from '../../../store/reducer/slices/ResumeSlice';

type UserScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Profile'
>

type Props = {
  id: string
}

const MyResumes = (props: Props) => {
  const navigation = useNavigation<UserScreenNavigationProp>();
  const dispatch = useAppDispatch()

  const handleDelete = () => {
  
    Alert.alert('You are deleting your resume!', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Delete', onPress: () => dispatch(DeleteResume(props.id)) },
    ]);
    console.log("deleted")
  }
  console.log("myresumesden gelen id", props.id)
  return (
    <View style={{overflow: "hidden",borderRadius: 25, aspectRatio: 1, width: "30%", height: "40%", marginHorizontal: 5, marginVertical: 5 }} >
      <AntDesign style={{
        position: "absolute",
        right: 10,
        fontSize: 24,
        zIndex: 22
      }} onPress={() => handleDelete()} name='closecircle' size={24} color={"red"} />
      <EmptyResume
        width="100%"
        height="100%"


        onPress={() => navigation.navigate("ResumeCreate", { id: props.id })}
      />
    </View>
  )
}

export default MyResumes
