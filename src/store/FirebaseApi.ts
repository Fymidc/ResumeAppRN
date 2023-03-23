//import firestore from '@react-native-firebase/firestore';
//import { initialValue } from "../types";
import auth from "@react-native-firebase/auth"

// export function createResume() {
//     firestore()
//         .collection("resumes")
//         .add({
//             data: initialValue
//         }).then((data) => console.log("data added", data))
//         .catch((error) => console.log(error))
// }

// export async function getresume() {

//     const resumelist = []

//     const snapshot = await firestore()
//         .collection("resumes").get()

//     snapshot.forEach((doc) => {
//         resumelist.push(doc.data())
//     })

// }


// let userId = "" as string;
// export function userid() : string {
    
//     auth().onAuthStateChanged(user => {
    
//         if (user) {
//             userId = user.uid
//             return userId
//             //console.log("func user id",userId)

//         } 
//     })

//     return userId;

// }
//userid console de görünüyor ama funciton dönmüyor.