/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { useQuery } from "@apollo/client";
import { GET_CERTIFIED_STUDENT_BY_ADMIN_APPROVAL_STATUS, GET_LIST_OF_TRAINING_APPLICANT_BY_TRAINING_ID, GET_STUDENT_TRAINING_APPLICATION_PAGE, GET_TRAINING_APPLICANT_PAGE_BY__HOSPITAL_APPROVAL_STATUS } from "../../../graphQl/queries/TrainingApplicationQueries";
import { HOSPITAL_TRAINING_APPROVAL_STATUS_STATISTIC } from "../../../graphQl/queries/TrainingQueries";
export const useGetTrainingApplicantPage = (status: string, trainingId: number, input: PaginationInput) => {
    const { data, refetch } = useQuery(GET_TRAINING_APPLICANT_PAGE_BY__HOSPITAL_APPROVAL_STATUS, { variables: { status: status, trainingId: trainingId, input: input } });
    const [trainingApplicants, setTrainingApplicants] = useState<any>([]);
    const [isLoadingApplicant, setIsLoadingApplicant] = useState(true);
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData().then((data) => { setTrainingApplicants(data.getTrainingApplicantPageByHospitalApprovalStatus); setIsLoadingApplicant(false) }).catch(err => err)
        }
    )
    const refetchApplicants = () => {
        refetch();
    }
    return { refetchApplicants, trainingApplicants, isLoadingApplicant }
}
export const useGetStudentTrainingApplicationPage = (studentId: number, status: string, input: PaginationInput) => {
    const [hasFinishLoading, setHasFinishLoading] = useState(false);
    const [trainingApplicationDetail, setTrainingApplicationDetail] = useState<any>({});
    const { data, refetch } = useQuery(GET_STUDENT_TRAINING_APPLICATION_PAGE,
        { variables: { studentId: studentId, status: status, input: input } });
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData()
                .then(data => {
                    setTrainingApplicationDetail(data.getStudentTrainingApplicationPage);
                    setHasFinishLoading(true);
                })
                .catch(err => err);
        }
    )
    return { trainingApplicationDetail, refetch, hasFinishLoading }
}

export const useGetCertifiedStudentByAdminApprovalStatus = (status: string, trainingId: number, input: PaginationInput) => {
    const { data, refetch } = useQuery(GET_CERTIFIED_STUDENT_BY_ADMIN_APPROVAL_STATUS,
        { variables: { status: status, trainingId: trainingId, input: input } });
    const [isLoading, setIsLoading] = useState(true);
    const [certifiedStudentDetailObj, setCertifiedStudentDetailObj] = useState<any>({});
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData()
                .then(data => {
                    setCertifiedStudentDetailObj(data.getTrainingApplicantPageByHospitalApprovalStatus);
                    setIsLoading(false);
                })
        }
    )
    return { refetch, isLoading, certifiedStudentDetailObj }
}
export const useGetStudentAppliedForTraining= (trainingId: number) => {
    const { data, refetch } = useQuery(GET_LIST_OF_TRAINING_APPLICANT_BY_TRAINING_ID    ,
        { variables: {trainingId: trainingId }});
    const [isLoading, setIsLoading] = useState(true);
    const [studentList, setStudentList] = useState<any>([]);
    useEffect(
        () => {
            const fetchData = async () => {
                if(data){
                    return await data.getListOfAllTrainingApplicant;
                }
            }
            fetchData()
                .then(data => {
                    setStudentList(data);
                    setIsLoading(false);
                })
        }
    )
    return { refetch, isLoading, studentList }
}
export const useHospitalTrainingApprovalStatusStatistic=(hospitalId:number,queryBy:string)=>{
const [triValueDto,setTriValueDto]=useState<any>([]);
const [responseReady,setResponseReady]=useState(false);
const {data,refetch}=useQuery(HOSPITAL_TRAINING_APPROVAL_STATUS_STATISTIC,{variables:{hospitalId:hospitalId,queryBy:queryBy}});
useEffect(
    ()=>{
        if(data){
            setTriValueDto(data.hospitalTrainingApprovalStatusStat);
            setResponseReady(true)
        }
    }
)
return {responseReady,refetch,triValueDto}
}