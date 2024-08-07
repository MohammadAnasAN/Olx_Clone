import React,{useState} from "react";
import { createContext } from "react";

export const FirebaseContext=createContext(null)

export const AuthContext = createContext(null);


//component
//ivide oru props varinind athinakath children parayana oru object ind 
//athine destructure chyth edukkanam
//ithu firebasente context alla nammal contextin vendi create cheyyunna component aanu
export default function Context ({children}){

   const [user,setUser]= useState(null)

   return(
   <AuthContext.Provider value={{user,setUser}}>
      {children}
   </AuthContext.Provider>
   )
}