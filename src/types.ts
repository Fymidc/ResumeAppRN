//formik types
export interface FormikValueProps{
  name: string
  jobtitle: string
  email: string
  city: string
  phone: string
  schoolname:string
  schoolcountry:string
  schoolstartdate:string
  schoolenddate:string
  companyname:string
  jobposition:string
  jobstartdate:string
  jobenddate:string
  jobdescription:string
  linkname:string
  linkurl:string
  skillname:string
  skilllevel:string
  languagename:string
  languagelevel:string
  projectname:string
  projectlink:string
  projectdescription:string

}


//resume

export interface Resume {
  id: string;
  resumeName: string;
  createInfo: CreateInfo;
  mainInfo: MainInfo;
  profileInfo?: ProfileInfo;
  educationInfo?: EducationInfo;
  ExperienceInfo?: ExperienceInfo;
  Skills: Skills;
  Languages: Languages;
  Projects: Projects;
  
}

export interface CreateInfo {
  date: string;
  isUpdated: boolean;
}

export interface MainInfo {
  sectionName: string;
  name: string;
  phone: string;
  city: string;
  jobTitle: string;
  email: string;
  links: Link[];
}

export interface Link {
  name: string;
  url: string;
}

export interface ProfileInfo {
  sectionName: string;
  profileDescription: string;
}

export interface EducationInfo {
  sectionName: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate:  string;
  endDate?:  string;
  schoolCity: string;
  schoolCountry: string;
}

export interface ExperienceInfo {
  sectionName: string;
  companyName: string;
  position: string;
  startDate: string ;
  endDate?:  string ;
  jobDescription: string;
}

export interface Date {
  day: string;
  month: string;
  year: string;
}

export interface Education {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  schoolCity: string;
  schoolCountry: string;
}

export interface Skills {
  sectionName: string;
  skills: Skill[];
}

export interface Skill {
  skillName: string;
  skillLevel: string;
}

export interface Languages {
  sectionName: string;
  languages: Language[];
}

export interface Language {
  languageName: string;
  languageLevel: string;
}

export interface Projects {
  sectionName: string;
  projects: Project[];
}

export interface Project {
  projectName: string;
  projectDescription: string;
  projectLink: string;
}




//************************** */
export type TabStackParamList = {
    HomeTab: undefined
    ProfileTab:undefined
    Settings : undefined
   
  };
export type HomeStackParamList = {
  
    HomeS:undefined
    ResumeCreate:{id:string|undefined}
   
  };
export type ProfileStackParamList = {
    ProfileS:undefined
    Resumes:undefined
  };
export type ResumeStackParamList = {
   
    ThirdFragment:undefined
    Profile:undefined
    ProfileS:undefined
  };
export type StackParamList = {
    Home:undefined
    Profile:undefined
    ResumeCreate:{id:string}
    ResumeDownload:{firstname:string}
  };

  //initial value of formik

  export const initialValue = {
    id: "",
    resumeName: "resume1",
    createInfo: {
      date: "",
      isUpdated: false,
    },
    mainInfo: {
      sectionName: "mainInfo",
      name: "",
      phone: "",
      city: "",
      jobTitle: "",
      email: "",
      links: [
        {
          name: "",
          url: "",
        },
      ],
    },
    profileInfo: {
      sectionName: "",
      profileDescription: "",
    },
    educationInfo: {
      sectionName: "profileInfo",
      schoolName: "",
      degree: "",
      fieldOfStudy: "",
        startDate: "",
      endDate: "",
      schoolCity: "",
      schoolCountry: "",
    },
    ExperienceInfo: {
      sectionName: "experienceInfo",
      companyName: "",
      position: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      jobDescription: "",
    },
    Skills: {
      sectionName: "Skills",
      skills: [
        {
          skillName: "",
          skillLevel: "",
        },
      ],
    },
    Languages: {
      sectionName: "languages",
      languages: [
        {
          languageName: "",
          languageLevel: "",
        },
      ],
    },
    Projects: {
      sectionName: "projects",
      projects: [
        {
          projectName: "",
          projectDescription: "",
          projectLink: "",
        },
      ],
    }

  };
