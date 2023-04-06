import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { RouteProp, useNavigation } from '@react-navigation/native'
import MyResumes from './components/MyResumes'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList, ProfileStackParamList, Resume } from '../../types'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { GetResume } from '../../store/reducer/slices/ResumeSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, AdEventType, BannerAdSize } from 'react-native-google-mobile-ads';



AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

RewardedAd.createForAdRequest(TestIds.REWARDED);

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2976719493824952/6075967883';



//type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileS'>;

type UserScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileS'>;
type UserScreenRouteProp = RouteProp<ProfileStackParamList, 'ProfileS'>;

type Props = {
  navigation: UserScreenNavigationProp;
  route: UserScreenRouteProp;
};

const UserScreen = ({ route, navigation }: Props) => {

  //console.log(route.name)
  const [userid, setuserid] = useState("")
  // const navigation = useNavigation()
  const dispatch = useAppDispatch();

  const getData = async () => {
    try {
      const key = await AsyncStorage.getItem('key')
      if (key !== null) {
        setuserid(key)
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }

  const resumes = useAppSelector(state => state.reducer);
  

  React.useEffect(
    () =>

      navigation.addListener('beforeRemove', (e) => {

        // Prevent default behavior of leaving the screen
        e.preventDefault();


        // Prompt the user before leaving the screen

        [navigation]
      }));

  useEffect(() => {
    dispatch(GetResume(userid))
    getData()
  }, [resumes.resumes.length])

//resume siliniyor ancak sayfada state refresh etmiyor. 

  const userName = resumes?.resumes[0]?.mainInfo.name
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <Header navigation={navigation} userName={userName} />

      <View style={{flex:10, marginTop: 20 }} >
        <Text style={{ paddingHorizontal: 20, fontSize: 20, color: "black",fontFamily:"Anton-Regular", }} >My CV's</Text>
        <View style={{ flex:1,padding: 15 ,flexWrap:"wrap"}} >
         <View style={{flex:1,flexDirection:"row",justifyContent:"space-around"}} >

          <ScrollView  contentContainerStyle={{flex:1,flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}} >
            {resumes.loading === true ? <ActivityIndicator size={25} color={"green"} /> : resumes.resumes?.map((value: Resume, index: number) => (
            (value.userid === userid ? 
              

                <MyResumes key={index} id={value.id} /> 
             
            
            : "")

          ))}
          </ScrollView>
         </View>
          




        </View>
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  )
}

export default UserScreen