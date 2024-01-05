import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries"

export const FindCertificateDetail=(props:{trainingId:number})=>{
    useFindCertificateByTrainingId_()
    return(
        <>
        </>
    )
}