/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { GET_JOB_APPLICATION_DETAIL, GET_STUDENT_JOB_APPLICATION } from "../../../graphQl/queries/JobApplicationQueries";
import { useEffect, useState } from "react";

export const useGetStudentJobApplicationList = (studentId: number, status: string, input: PaginationInput) => {
    const [jobApplicationObj, setJobApplicationObj] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const { data, refetch } = useQuery(GET_STUDENT_JOB_APPLICATION, { variables: { studentId: studentId, status: status, input: input } });
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData().then(data => {
                setJobApplicationObj(data.getStudentJobApplicationList);
                setIsLoading(false)
            })
                .catch(err => err)
        }
    )
    return { jobApplicationObj, refetch, isLoading }
}
export const useJobApplicationDetail=(id: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [jobApplication, setJobApplication] = useState(false);
    const { data, refetch } = useQuery(GET_JOB_APPLICATION_DETAIL, { variables: { id:id } });
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData()
                .then(data => {
                    setJobApplication(data.getJobApplicationDetail);
                    setIsLoading(false);
                })
                .catch(err => err)
        }
    )
    return { isLoading, jobApplication, refetch }
}