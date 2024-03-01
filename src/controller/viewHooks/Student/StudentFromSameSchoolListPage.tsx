/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FIND_ALL_STUDENT_FROM_SAME_SCHOOL_PAGE } from "../../../graphQl/queries/StudentQueries";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
export default function useStudentFromSameSchoolListPage(schoolId: number, page: PaginationInput) {
    const [studentObj, setStudentObj] = useState<any>({});
    const [isLoadingStudentData, setIsLoadingStudentData] = useState(true);
    const {data,refetch} = useQuery(FIND_ALL_STUDENT_FROM_SAME_SCHOOL_PAGE, { variables: { schoolId: schoolId, input: page }});
    useEffect(
        () => {
            const fetchData = async () => {
                return await data;
            }
            fetchData().then(data => {
                setStudentObj(data.studentFromSameSchoolListPage);
                setIsLoadingStudentData(false);
            }).catch(err => console.log(err))
        }
    )
    const refetchStudentObj=()=>{
        refetch();
    }
    return { studentObj, isLoadingStudentData,refetchStudentObj}
}
