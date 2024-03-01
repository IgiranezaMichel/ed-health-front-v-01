import { JobInput } from "../../typeDefs/JobInput"

type result={
    isOkay:boolean,
    message:string
}
export const jobInputValidation=(input:JobInput):result=>{
if(input.title=='')return {isOkay:false,message:'Job Title is required'}
else if(input.description=='')return {isOkay:false,message:'Job Description is required'}
else if(input.deadline=='')return {isOkay:false,message:'Job deadline is required'}
else if(input.picture=='')return {isOkay:false,message:'Picture is required'}
else return{isOkay:true,message:'Done'}
}