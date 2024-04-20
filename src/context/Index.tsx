/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { PaginationInput } from "../typeDefs/PaginationInput";

export const MyContext=createContext<PaginationInput|undefined>(undefined)
export const useMyPagination_=()=>{
const user=useContext(MyContext);
if(user==undefined)throw Error('No data found')
return{user}
}