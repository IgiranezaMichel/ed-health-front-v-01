import { SchoolInput } from "../../typeDefs/SchoolInput";
type result={
    isOkay:boolean,
    message:string
}
export const SchoolInputValidation=(input:SchoolInput):result=>{
    if(input.name=='')return {isOkay:false,message:'School Name is required'}
else if(input.logo=='')return {isOkay:false,message:'School Logo is required'}
else if(input.locationId==0)return {isOkay:false,message:'Job Title is required'}
else return{isOkay:true,message:'okay'}
}