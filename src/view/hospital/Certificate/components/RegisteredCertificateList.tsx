import { Card } from "@mui/material"
import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";

export const RegisteredCertificateList = (props: { trainingId: number }) => {
    const certificateList=useFindCertificateByTrainingId_(props.trainingId);
    console.log(certificateList.certificateList)
    return <>
        <Card elevation={4} className="border">
            <div className="fw-bold p-4 text-center">
                --No Certificate found --
            </div>
        </Card>
    </>
}