/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_SCHOOL_ADMIN_STATUS_STATISTICS } from "../../../graphQl/queries/SchoolAdminQueries";
export const useShowSchoolAdminStatusStatistics=()=>{
    const [schoolAdminStatusStatistics, setSchoolAdminStatusStatistics] = useState<any>({});
    const [isLoadingSchoolAdminStatistics, setIsLoadingSchoolAdminStatistics] = useState(true);
    const data = useQuery(GET_SCHOOL_ADMIN_STATUS_STATISTICS);
    useEffect(
        () => {
            const fetchData = async () => {
                return await data.data;
            }
            fetchData().then(data => {
                setSchoolAdminStatusStatistics(data.schoolAdminStatusStatistics);
                setIsLoadingSchoolAdminStatistics(false);
            }).catch(err => console.log(err))
        }
    )
    return { schoolAdminStatusStatistics, isLoadingSchoolAdminStatistics }
}