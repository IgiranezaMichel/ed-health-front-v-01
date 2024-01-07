import { CircularProgress } from "@mui/material";
import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries"

export const FindCertificateDetail=(props:{trainingId:number})=>{
    const certificateList=useFindCertificateByTrainingId_(props.trainingId);
    alert(props.trainingId)
    console.log(certificateList.certificateList)
    return(
        <>
        {
            certificateList.isLoading?<>
            <CircularProgress/>
            </>
            :<>
            
            </>
        }
        </>
    )
}