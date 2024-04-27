/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_TRAINING_BY_ID } from "../../../graphQl/queries/TrainingQueries";

export const useFindTrainingById=(id:number)=>{
    const findTraining= useQuery(FIND_TRAINING_BY_ID,{variables:{id:id}});
    const [isFindingTraining,setIsFindingTraining]=useState(true);
    const [trainingDetail,setTrainingDetail]=useState<any>({});
    const [applicantList,setApplicantList]=useState<any>([]);
    const [trainerList,setTrainerList]=useState<any>([]);
    useEffect(
     ()=>{
         const fetchData=async()=>{
           if(findTraining.data){
            return await findTraining.data.findTrainingById;
           }
         }
         fetchData().then(data=>{
            setTrainingDetail(data);
            setApplicantList(data.applicantList);
            setTrainerList(data.trainers);
            setIsFindingTraining(false);
         }).catch(err=>console.log(err));
     }
    )
    const refreshTrainingDetail=()=>{
      findTraining.refetch();
    }
    return{isFindingTraining,trainerList,trainingDetail,applicantList,refreshTrainingDetail}
 }