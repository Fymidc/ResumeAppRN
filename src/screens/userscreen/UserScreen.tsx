import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Header from './components/Header'
import { useNavigation } from '@react-navigation/native'
import MyResumes from './components/MyResumes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ProfileStackParamList, Resume } from '../../types'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { GetResume } from '../../store/reducer/slices/ResumeSlice'

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileS'>;



const UserScreen = ({ route }: Props) => {

    console.log(route.name)
    const navigation = useNavigation()
    const dispatch = useAppDispatch();


    const resumes = useAppSelector(state => state.reducer);
    //state kırmızı düzelt

    //console.log("profile ekranıundan gelen resumeler",resumes.map((val:any)=>console.log(val)))
    // const consol = resumes?.map((val:Resume)=>console.log(val.data.data.id))

    console.log("consol2",resumes)

    React.useEffect(
        () =>

            navigation.addListener('beforeRemove', (e) => {

                // Prevent default behavior of leaving the screen
                e.preventDefault();


                // Prompt the user before leaving the screen

                [navigation]
            }));

    useEffect(() => {
        dispatch(GetResume())
    }, [resumes.resumes.length])

    //resumes.map undefined hatası var yeni resume create ederken
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>

            <Header />

            <View style={{ marginTop: 20 }} >
                <Text style={{ paddingHorizontal: 20, fontSize: 20, color: "black", fontWeight: "700" }} >My CV's</Text>
                <View style={{ padding: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }} >
                    {resumes.loading === true ? <Text>Loading..</Text> : resumes.resumes?.map((value: Resume, index: number) => (
                        <MyResumes key={index} id={value.id} />
                    ))}




                </View>
            </View>
        </View>
    )
}

export default UserScreen