import { Button } from "@mui/material"
import { useFindCertifiedStudentByCertificateIdPage } from "../../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao"

export const CertifiedStudentList=(props:{certificateId:number})=>{
    useFindCertifiedStudentByCertificateIdPage(props.certificateId); 
return(
    <>
    <Button variant="contained" className="rounded-0 mx-2">
        Certified
    </Button>
    <Button variant="outlined" className="rounded-0">
        Appending
    </Button>
    <Button variant="outlined" className=" mx-1 rounded-0">
        Rejection
    </Button>
    </>
)
}