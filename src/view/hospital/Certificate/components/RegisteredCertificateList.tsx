import { Card } from "@mui/material"

export const RegisteredCertificateList=(props:{trainingId:number})=>{
    return<>
    <Card elevation={4} className="border">
       <div className="fw-bold p-4 text-center">
       --No Certificate found --
       </div>
    </Card>
    </>
}