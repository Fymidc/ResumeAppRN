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
    
    builder.addCase(createResume.pending, (state, action) => {

      state.loading = true;
      state.error = null;
   

    }),
    builder.addCase(createResume.fulfilled, (state, action: PayloadAction<Resume>) => {

      // state.resumes.push(action.payload)
      state.loading = false;
      state.resumes.push(action.payload);

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
      builder.addCase(DeleteResume.pending, (state, action) => {
       return{
        
         ...state,
 
         loading : true,
         error : null
       }
    

      }),
      builder.addCase(DeleteResume.fulfilled, (state, action) => {
       return{
        ...state,
         loading : false,
        error :null,
        resumes :state.resumes.filter((resume) => resume.id !== action.payload),
       
       }

      }),

      builder.addCase(GetResume.pending, (state, action) => {

        return {
          ...state,
          loading:true,
         
        }
      })
      builder.addCase(GetResume.fulfilled, (state, action) => {
        // const createdResume = action.payload
        // const index = state.resumes.findIndex((user) => user.userid === createdResume.userid);
        
        // if (index !== -1) {
          
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




})



export const GetResume = createAsyncThunk('resume/GetResume', async () => {

  const resumearray: any = []
  const snapshot = await firestore()
    .collection("resumes").get()

  snapshot.forEach((doc) => {
    
  // const data = doc.data().data.filter((val:Resume) => val.userid !== id)
  // console.log("get resume",data)
  resumearray.push(doc.data().data)
     

  })

  return resumearray
})

export const UpdateResume = createAsyncThunk('resume/UpdateResume', async (data: Resume) => {


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

export const DeleteResume = createAsyncThunk('resume/DeleteResume', async (id:string) => {


   firestore()
  .collection('resumes')
  .doc(`${id}`)
  .delete()
  .then(() => {
    console.log('User deleted!');
  });

  return id
  
})




export default resumeActionSlice.reducer;