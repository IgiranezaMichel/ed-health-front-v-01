/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { DataContextInput } from "../typeDefs/dateContextInput";

export const HospitalContext=createContext<DataContextInput|undefined>(undefined);
export const useHospitalContext=()=>{
    const data=useContext(HospitalContext);
    if(data===undefined)throw new Error("Hospital cant be undefined");
    return data;
}