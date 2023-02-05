export type TabStackParamList = {
    HomeTab: undefined
    ProfileTab:undefined
    Settings : undefined
   
  };
export type HomeStackParamList = {
  
    HomeS:undefined
    ResumeCreate:{sort:string}
   
  };
export type ProfileStackParamList = {
    ProfileS:undefined
    Resumes:undefined
  };
export type ResumeStackParamList = {
    FirstFragment:undefined
    SecondFragment:undefined
    ThirdFragment:undefined
    Profile:undefined
  };
export type StackParamList = {
    Home:undefined
    Profile:undefined
    Resume:undefined
  };