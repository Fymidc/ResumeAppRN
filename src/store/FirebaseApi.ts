import firestore from '@react-native-firebase/firestore';
import { initialValue } from "../types";

export function createResume(){
    firestore()
    .collection("resumes")
    .add({
        data:initialValue
    }).then((data) => console.log("data added",data))
    .catch((error)=> console.log(error))
}

export async function getresume() {

    const resumelist=[]

    const snapshot = await firestore()
    .collection("resumes").get()

    snapshot.forEach((doc)=>{
        resumelist.push(doc.data())
    })

}