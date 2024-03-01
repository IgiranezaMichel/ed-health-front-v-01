/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { STUDENT_FROM_SAME_SCHOOL_STATISTICS_BY_STATUS } from "../../../graphQl/queries/StudentQueries";

export const useShowStudentFromSameSchoolStatusStatistics=(schoolId:number)=>{
    const [studentsStatusStatistics, setStudentsStatusStatistics] = useState<any>({});
    const [isLoadingStudentStatusStatistics, setIsLoadingStudentStatusStatistics] = useState(true);
    const data = useQuery(STUDENT_FROM_SAME_SCHOOL_STATISTICS_BY_STATUS, { variables: { schoolId: schoolId} });
    useEffect(
        () => {
            const fetchData = async () => {
                return await data.data;
            }
            fetchData().then(data => {
                setStudentsStatusStatistics(data.studentFromSameSchoolStatisticsByStatus);
                setIsLoadingStudentStatusStatistics(false);
            }).catch(err => console.log(err))
        }
    )
    return { studentsStatusStatistics, isLoadingStudentStatusStatistics }
}