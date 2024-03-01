import { TrainingInput } from "../../typeDefs/TrainingInput"
type result={
    isOkay:boolean,
    message:string
}
export const TrainingInputValidation=(data:TrainingInput):result=>{
if(data.title==''){
    return {isOkay:false,message:'Training Title is Required'}
}
else if(data.description===''){
    return {isOkay:false,message:'Training Description is Required'}
}
else if(data.deadline===''){
    return {isOkay:false,message:'Deadline is Required'}
}
else if(data.locationId===0){
    return {isOkay:false,message:'Specify Training Location'}
}else if(data.hospitalId===0){
    return {isOkay:false,message:'Hospital Id is Required'}
}
else{
    return {isOkay:true,message:'Done'}
}
}