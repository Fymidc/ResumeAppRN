import { createSlice, PayloadAction, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import firestore from '@react-native-firebase/firestore';
import { Resume } from "../../../types";

interface ResumesState {
  resumes: Resume[];
  loading: boolean;
  error: string | null;
}
const initialState: ResumesState = {
  resumes: [],
  loading: false,
  error: null,
}

const resumeActionSlice = createSlice({
  name: "createResume",
  initialState,
  reducers: {
    // addResume: {
    //   reducer: (state, action: PayloadAction<Resume>) => {
    //     state.push(action.payload);
    //   },
    //   prepare: (resume: Resume) => {
    //     return {
    //       payload: {
    //         ...resume,
    //         id: nanoid(),
    //         createInfo: {
    //           ...resume.createInfo,
    //           date: new Date().toISOString(),
    //           isUpdated: false,
    //         },
    //       },
    //     };
    //   },
    // },
    //     updateResume: (state, action: PayloadAction<Resume>) => {
    //       const { id } = action.payload;
    // console.log("update den gelen state",action.payload)
    //       const selectedResume = state.find((resume) => resume.data.id === id);
    //       if (selectedResume) {
    //         return state.map((resume) => {
    //           if (resume.data.id === id) {
    //             return {
    //               ...resume,
    //               ...action.payload,
    //               createInfo: {
    //                 ...resume.createInfo,
    //                 isUpdated: true,
    //                 date: new Date().toISOString(),
    //               },
    //             };
    //           } else {
    //             return resume;
    //           }
    //         });
    //       }
    //     },
    // deleteResume: (state, action: PayloadAction<string>) => {
    //   return state.filter((resume) => resume.id !== action.payload);
    // },


  },
  extraReducers(builder) {
    builder.addCase(createResume.fulfilled, (state, action: PayloadAction<Resume>) => {

       state.resumes.push(action.payload)
   

    }),
      builder.addCase(UpdateResume.pending, (state, action) => {
        state.loading = true;
        state.error = null;
    

      }),
      builder.addCase(UpdateResume.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedResume = action.payload;
        const index = state.resumes.findIndex((user) => user.id === updatedResume.id);
        if (index !== -1) {
          state.resumes[index] = updatedResume;
        }

      }),

      builder.addCase(GetResume.pending, (state, action) => {

        return {
          ...state,
          loading:true,
         
        }
      })
      builder.addCase(GetResume.fulfilled, (state, action) => {

        return {
          ...state,
          loading:false,
          resumes: action.payload
        }
      })
  },

});


export const createResume = createAsyncThunk('resume/createResume', async (data: Resume) => {
  console.log("createreducer called")

  await firestore()
    .collection("resumes")
    .doc(data.id)
    .set({
       data
    }).then((data) => console.log("data added", data))
    .catch((error) => console.log(error))



  return data;

  // payload: {

  //   id: nanoid(),
  //   createInfo: {
  //     ...data.createInfo,
  //     date: new Date().toISOString(),
  //     isUpdated: false,
  //   },
  // },


})

//create yaparken id oluştur

export const GetResume = createAsyncThunk('resume/GetResume', async () => {

  const resumearray: any = []
  const snapshot = await firestore()
    .collection("resumes").get()

  snapshot.forEach((doc) => {
     //console.log(doc.data().data)
    resumearray.push(doc.data().data)

  })

  return resumearray
})
export const UpdateResume = createAsyncThunk('resume/UpdateResume', async (data: Resume) => {
// const ndata = JSON.parse(JSON.stringify(data))
// console.log("data.id",ndata.data.id)
//console.log(data.data.id)  

firestore()
    .collection('resumes')
    .doc(`${data.id}`)
    .update({
      data
    })
    .then(() => {
      console.log('User updated!');
    });

  return data
})

//export const selectAllResumes = (state: any) => state.createResume



export default resumeActionSlice.reducer;