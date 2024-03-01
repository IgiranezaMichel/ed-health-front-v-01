/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_HOSPITAL_ADMIN_STATUS_STATISTICS } from "../../../graphQl/queries/HospitalAdminQueries";
export const useShowHospitalAdminStatusStatistics=()=>{
    const [hospitalAdminStatusStatistics, setHospitalAdminStatusStatistics] = useState<any>({});
    const [isLoadingSchoolAdminStatistics, setIsLoadingSchoolAdminStatistics] = useState(true);
    const data = useQuery(GET_HOSPITAL_ADMIN_STATUS_STATISTICS);
    useEffect(
        () => {
            const fetchData = async () => {
                return await data.data;
            }
            fetchData().then(data => {
                setHospitalAdminStatusStatistics(data.hospitalAdminStatisticByStatus);
                setIsLoadingSchoolAdminStatistics(false);
            }).catch(err => console.log(err))
        }
    )
    return { hospitalAdminStatusStatistics, isLoadingSchoolAdminStatistics }
}