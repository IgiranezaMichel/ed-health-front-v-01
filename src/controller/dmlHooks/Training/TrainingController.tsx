import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { DELETE_TRAINING, REGISTER_TRAINING } from "../../../graphQl/mutation/TrainingMutation";
import { GET_ALL_TRAINING, TRAINING_PAGINATION } from "../../../graphQl/queries/TrainingQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { TrainingInput } from "../../../typeDefs/TrainingInput";

export const useRegisterTraining=(training:TrainingInput)=>{
   const [trainingData]=useMutation(REGISTER_TRAINING);
   const saveTrainingHandler=async()=>{
   await  trainingData({variables:{input:training}});
   }
   saveTrainingHandler().then(data=>data).catch(err=>err)
}
export const DeleteTrainingById=(id:number)=>{
    const [trainingData]=useMutation(DELETE_TRAINING);
    const deleteTrainingHandler=async()=>{
    await  trainingData({variables:{id:id}});
    }
    deleteTrainingHandler().then(data=>data).catch(err=>err)
}
export const UseDisplayTraining=(sort:string)=>{
const[trainingList,setTrainingList]=useState([]);
const trainingData=useQuery(GET_ALL_TRAINING,{variables:{sort:sort}});
useEffect(
    ()=>{
const fetchTrainingData=async()=>{
   return await trainingData.data;
}
fetchTrainingData().then(data=>setTrainingList(data.getAllTraining)).catch(err=>console.log(err))
    },[trainingData,trainingList,sort]
)
return {trainingList}
}
// search training
export const UseSearchTraining=(search:string)=>{
    const[trainingList,setTrainingList]=useState([]);
    const trainingData=useQuery(GET_ALL_TRAINING,{variables:{search:search}});
    useEffect(
        ()=>{
    const fetchTrainingData=async()=>{
       return await trainingData.data;
    }
    fetchTrainingData().then(data=>setTrainingList(data.getAllTraining)).catch(err=>console.log(err))
        },[trainingData,trainingList,search]) 
}
// training pagination
export const UseTrainingPagination=(pagination:PaginationInput)=>{
    const[trainingList,setTrainingList]=useState([]);
    const trainingData=useQuery(TRAINING_PAGINATION,{variables:{input:pagination}});
    useEffect(
        ()=>{
    const fetchTrainingData=async()=>{
       return await trainingData.data;
    }
    fetchTrainingData().then(data=>setTrainingList(data.getAllTraining)).catch(err=>console.log(err))
        },[trainingData,trainingList,pagination]) 
}