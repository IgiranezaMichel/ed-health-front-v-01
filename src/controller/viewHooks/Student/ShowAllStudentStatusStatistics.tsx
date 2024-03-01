/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_STUDENT_STATUS_STATISTICS } from "../../../graphQl/queries/StudentQueries";
export const useShowAllStudentStatisticsByStatus=()=>{
    const [studentStatusStatistics, setStudentStatusStatistics] = useState<any>({});
    const [isLoadingStudentStatusStatistics, setIsLoadingStudentStatusStatistics] = useState(true);
    const data = useQuery(GET_STUDENT_STATUS_STATISTICS);
    useEffect(
        () => {
            const fetchData = async () => {
                return await data.data;
            }
            fetchData().then(data => {
                setStudentStatusStatistics(data.studentStatisticsByStatus);
                setIsLoadingStudentStatusStatistics(false);
            }).catch(err => console.log(err))
        }
    )
    return { studentStatusStatistics, isLoadingStudentStatusStatistics }
}