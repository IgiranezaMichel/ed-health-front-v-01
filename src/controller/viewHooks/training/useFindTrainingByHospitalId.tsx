import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_HOSPITAL_BY_ID } from "../../../graphQl/queries/hospitalQueries";

export const useFindTrainingByHospitalId=(id:number)=>{
    const [hospitalDetail,setHospitalDetail]=useState({
    id:0,
    logo:'',
    name:'',
    description:'',
    timeStamp:new Date(),
    });
    const [hospitalTrainingData,setHospitalTrainingData]=useState([]);
    const findHospital=useQuery(FIND_HOSPITAL_BY_ID,{variables:{id:id}});
    const [isFindingData,setIsFindingData]=useState(true);
    useEffect(
        ()=>{
           const fetchData=async()=>{
              return  await findHospital.data;
            }
            fetchData().then(data=>{setHospitalTrainingData(data.findHospitalById.hospitalTrainingList)
            setHospitalDetail({id:data.findHospitalById.id,description:data.findHospitalById.description,logo:data.findHospitalById.logo,name:data.findHospitalById.name,timeStamp:data.findHospitalById.timeStamp})
            setIsFindingData(false)
            }).catch(err=>err);
           
        }, [id,findHospital]
    )
    return{hospitalDetail,hospitalTrainingData,isFindingData}
}