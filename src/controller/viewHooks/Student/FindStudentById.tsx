/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_STUDENT_BY_ID } from "../../../graphQl/queries/StudentQueries";

export default function useFindStudentById(id:number) {
    const [studentDetail, setStudentDetail] = useState<any>({});
    const [isLoadingStudentData, setIsLoadingStudentData] = useState(true);
    const {data,refetch} = useQuery(FIND_STUDENT_BY_ID, { variables: {id: id},fetchPolicy:'no-cache' });
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData().then(data => {
                setStudentDetail(data.findStudentById);
                setIsLoadingStudentData(false);
            }).catch(err => console.log(err))
        },[data]
    )
    const refetchStudentDetail=()=>{
        refetch();
    }
    return { studentDetail,isLoadingStudentData,refetchStudentDetail}
}
