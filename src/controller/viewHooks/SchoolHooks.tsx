/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { FIND_FACULTY_BY_SCHOOL_BY_ID, FIND_SCHOOL_BY_ID, GET_ALL_SCHOOL, } from "../../graphQl/queries/SchoolQuery"
import { PaginationInput } from "../../typeDefs/PaginationInput"
// pagination
export const useSchoolPage=(input:PaginationInput)=>{
    const [schoolList,setSchoolList]=useState([]);
    const [schoolSize,setSchoolSize]=useState(0);
    const [totalPage,setTotalPage]=useState(0);
    const [schoolDataIsLoading,setSchoolDataIsLoading]=useState(true);
    const [schoolPageNumber,setSchoolPageNumber]=useState(0);
    const data=useQuery(GET_ALL_SCHOOL,{variables:{input:input}});
useEffect(
    ()=>{
        const fetchData=async()=>{
          return await data.data;
        }
        fetchData().then(data=>{
            setSchoolList(data.schoolPageList.content);
            setTotalPage(data.schoolPageList.totalPages)
            setSchoolPageNumber(data.schoolPageList.pageNumber)
            setSchoolSize(data.schoolPageList.size)
            setSchoolDataIsLoading(false);
        }).catch(err=>console.log(err))
    }
)
return {schoolList,schoolPageNumber,totalPage,schoolSize,schoolDataIsLoading}
}
export const useFaculty= (schoolId: number) => {
    const schoolData = useQuery(FIND_FACULTY_BY_SCHOOL_BY_ID, { variables: { id: schoolId },fetchPolicy:'no-cache'});
    const [facultyData, setFacultyData] = useState<any>([]);
    const [facultyDataIsLoading, setFacultyDataIsLoading] = useState(true);
  
    useEffect(() => {
      // Check if the data is present in the schoolData object
      if (schoolData.data && schoolData.data.findSchoolById) {
        setFacultyData(schoolData.data.findSchoolById.facultyList);
        setFacultyDataIsLoading(false);
      }
    }, [schoolData.data]);
    return { facultyData, facultyDataIsLoading };
  };
  export const useSchool= (id: number) => {
    const schoolData = useQuery(FIND_SCHOOL_BY_ID, { variables: {id: id },fetchPolicy:'no-cache'});
    const [schoolDetailList, setSchoolDetailList] = useState<any>([]);
    const [schoolDataIsLoading, setSchoolDataIsLoading] = useState(true);
    useEffect(() => {
      // Check if the data is present in the schoolData object
      if (schoolData.data && schoolData.data.findSchoolById) {
        setSchoolDetailList(schoolData.data.findSchoolById);
        console.log(schoolDetailList)
        setSchoolDataIsLoading(false);
      }
    }, [schoolData, id, schoolDetailList]);
    return { schoolDetailList, schoolDataIsLoading };
  };