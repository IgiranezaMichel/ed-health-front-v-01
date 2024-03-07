import { Email, Person2Outlined } from "@mui/icons-material"
import { Card } from "@mui/material"

export const CertifiedStudent=()=>{
    return(
        <>
         {
        !certificateObj.isLoading&&<div className="p-2">
            {
                certificateObj.studentCertifiedObj.content.length!=0?
                <>
                    {certificateObj.studentCertifiedObj.content.map((data:any,index:number)=>{
                        return <Card elevation={3} key={index} className="mb-3 col-sm-12 row m-auto">
                            <div className="col-sm-4">
                            <img src={data.student.user.profilePicture} height={100} />
                            </div>
                            <div className="col-sm-8">
                           <div className="mb-2"><Person2Outlined/> {data.student.user.name}</div>
                           <div className="mb-2"><Email/> {data.student.user.email}</div>
                           <div className="mb-2"><Person2Outlined/> {data.student.user.email}</div>
                           <div className="mb-2"><Person2Outlined/> {data.student.user.dob}</div>
                            </div>
                        </Card>
                    })}
                </>:
                <div className="p-3 text-center border fw-bold">
                -- No certified student found --
                </div>
            }
        </div>
    }
        </>
    )
}