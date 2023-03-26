import { View, Text, ActivityIndicator } from 'react-native'
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

  console.log(route.name)
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
  //state kırmızı düzelt

  //console.log("profile ekranıundan gelen resumeler",resumes.map((val:any)=>console.log(val)))
  // const consol = resumes?.map((val:Resume)=>console.log(val.data.data.id))

  console.log("consol2", resumes)

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
    getData()
  }, [resumes.resumes.length])

  const userName = resumes?.resumes[0]?.mainInfo.name
  //resumes.map undefined hatası var yeni resume create ederken
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <Header navigation={navigation} userName={userName} />

      <View style={{flex:1, marginTop: 20 }} >
        <Text style={{ paddingHorizontal: 20, fontSize: 20, color: "black", fontWeight: "700" }} >My CV's</Text>
        <View style={{ padding: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }} >
          {resumes.loading === true ? <ActivityIndicator size={25} color={"green"} /> : resumes.resumes?.map((value: Resume, index: number) => (
            (value.userid === userid ? <MyResumes key={index} id={value.id} /> : "")

          ))}




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