import { useState } from "react"
import { useFindCertificateById_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";
import { Card, CircularProgress, Divider} from "@mui/material";

export const CertificateDetail=(props:{certificateId:number})=>{
    const [show,setShow]=useState('');
    const certificate=useFindCertificateById_(props.certificateId);
    console.log(certificate)
    return(
        <>
        {certificate.isLoading?<div>
            <CircularProgress/>
        </div>:
        <>
        {show==''&&<Card className="m-2 border border-5 p-3">
        <div className="p-2">
            <div className="float-end mt-3">
                <img src={certificate.certificate.training.hospital.logo} height={80} /><br />
                <span>{certificate.certificate.training.hospital.name} </span>
            </div>

            <div>
                <div style={{ fontFamily: 'fantasy' }} className="display-2 d-block">Certificate
                </div>
                 <div style={{fontFamily: 'fantasy'}}>
                    {certificate.certificate.title}
                 </div>
            </div>

            <section className="mt-5">
                <div>Proudly to represented to </div>
                <b style={{ fontFamily: 'cursive' }} className="display-6 d-block">Name Surname</b>
            </section>
            <div style={{fontFamily: 'fantasy'}}>
                    {certificate.certificate.description}
                 </div>
            <section className="mt-3">
           certificate
            </section>

            <div className="d-flex justify-content-center my-4">
                <div className="mx-5">
                    <div className="text-center fw-bold">Approve date</div>
                    <Divider className="border border-dark "/>
                {String(certificate.certificate.timeStamp).split('T')[0]} {String(certificate.certificate.timeStamp).split('T')[1].split('.')[0]}
                </div>

                <div className="mx-5">
                    <div className="text-center fw-bold">
                        <img src={certificate.certificate.userSignature} alt="" />
                    </div>
                    <Divider className="border border-dark "/>
                {String(certificate.certificate.accountHolder.name)}
                </div>

                <div className="mx-5">
                    <div className="text-center fw-bold">
                        <img src={certificate.certificate.userSignature} alt="" />
                    </div>
                    <Divider className="border border-dark "/>
                {String(certificate.certificate.accountHolder.name)}
                </div>
            </div>

        </div>
    </Card>}
        </>
        }
        </>
    )
}