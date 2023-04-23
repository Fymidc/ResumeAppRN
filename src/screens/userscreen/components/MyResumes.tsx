import { View, Text, Alert ,TouchableOpacity} from 'react-native'
import React from 'react'
import EmptyResume from "../../../images/previewResume.svg"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../../types';
import { useAppDispatch } from '../../../store/store';
import { DeleteResume } from '../../../store/reducer/slices/ResumeSlice';

type UserScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Profile'
>

type Props = {
  id: string
  date:string
}

const MyResumes = (props: Props) => {
  const navigation = useNavigation<UserScreenNavigationProp>();
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    console.log("delete basıldı")
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
    <View style={{ flexDirection: "row", paddingLeft: 30 }} >

      <View style={{ borderRadius: 25, width: "30%", height: "100%", maxHeight: 200 }} >
        
        <EmptyResume
          width="100%"
          height="100%"


          onPress={() => navigation.navigate("ResumeCreate", { id: props.id })}
        />
      </View>

      <View style={{ paddingHorizontal: 50,flex:1,justifyContent:"space-evenly",zIndex:22 }} >
        <Text style={{color:"black",fontWeight:"700"}} >Created at: {props.date.slice(0,10)}</Text>
        <TouchableOpacity
        style={{backgroundColor:"red",padding:10,borderRadius:10,width:"100%"}}
        onPress={()=>handleDelete()} activeOpacity={0.7}>
          <Text style={{textAlign:"center",color:"white",fontSize:15,fontWeight:"700"}} >Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyResumes
