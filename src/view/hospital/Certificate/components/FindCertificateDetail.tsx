import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries"

export const FindCertificateDetail=(props:{trainingId:number})=>{
    const trainingData=useFindCertificateByTrainingId_(props.trainingId);
    return(
        <>
        </>
    )
}