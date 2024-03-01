/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { StudentStatus } from "../../../enums/StudentStatus";
import { FIND_STUDENT_FROM_SAME_SCHOOL_BY_STATUS } from "../../../graphQl/queries/StudentQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";

export const useShowStudentFromSameSchoolHavingSameStatus=(schoolId: number,status:StudentStatus,page: PaginationInput)=>{
    const [studentWithSameStatusObj, setStudentWithSameStatusObj] = useState<any>({});
    const [isLoadingStudentDataStatus, setIsLoadingStudentDataStatus] = useState(true);
    const data = useQuery(FIND_STUDENT_FROM_SAME_SCHOOL_BY_STATUS, { variables: { schoolId: schoolId,status:status, input: page } });
    useEffect(
        () => {
            const fetchData = async () => {
                return await data.data;
            }
            fetchData().then(data => {
                setStudentWithSameStatusObj(data.findStudentFromSameSchoolByStatusListPage);
                setIsLoadingStudentDataStatus(false);
            }).catch(err => console.log(err))
        }
    )
    return { studentWithSameStatusObj,isLoadingStudentDataStatus}
}