/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { useQuery } from "@apollo/client";
import { GET_CERTIFIED_STUDENT_BY_ADMIN_APPROVAL_STATUS, GET_STUDENT_TRAINING_APPLICATION_PAGE, GET_TRAINING_APPLICANT_PAGE_BY__HOSPITAL_APPROVAL_STATUS } from "../../../graphQl/queries/TrainingApplicationQueries";

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

export const useGetCertifiedStudentByAdminApprovalStatus=(status:string,trainingId:number,input:PaginationInput)=>{
    const {data,refetch}=useQuery(GET_CERTIFIED_STUDENT_BY_ADMIN_APPROVAL_STATUS,
        {variables:{status:status,trainingId:trainingId,input:input}});
        const [isLoading, setIsLoading] = useState(true);
        const [certifiedStudentDetailObj, setCertifiedStudentDetailObj] = useState<any>({});
useEffect(
    ()=>{
        const fetchData=async()=>{
            return await data;
        }
        fetchData()
        .then(data=>{
            setCertifiedStudentDetailObj(data.getStudentTrainingApplicationPage);
            setIsLoading(false);
        })
    }
)
       return {refetch} 
}