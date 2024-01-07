import { Card, CircularProgress } from "@mui/material"
import { useFindCertificateByTrainingId_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";
import { Certificate } from "../../Certificate";

export const RegisteredCertificateList = (props: { trainingId: number }) => {
    const certificateList=useFindCertificateByTrainingId_(props.trainingId);
    console.log(certificateList.certificateList)
    return <>
        <Card elevation={4} className="border">
            {certificateList.isLoading?<div className="fw-bold p-4 text-center">
                <CircularProgress/>
            </div>:<>
            --No Certificate found --
            </>}
        </Card>
    </>
}