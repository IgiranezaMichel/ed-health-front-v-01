import { useState } from "react"
import { useFindCertificateById_ } from "../../../../controller/viewHooks/Certificate/CertificateQueries";
import { Card, CircularProgress} from "@mui/material";

export const CertificateDetail=(props:{certificateId:number})=>{
    const [show,setShow]=useState('');
    const certificate=useFindCertificateById_(props.certificateId);
    return(
        <>
        {certificate.isLoading?<div>
            <CircularProgress/>
        </div>:
        <Card className="m-2 border border-5 p-3">
        <div className="p-2">
            <div className="float-end mt-3">
                <img src={certificate.certificate.hospital.logo} height={80} /><br />
                <span>{certificate.certificate.hospital.name} </span>
            </div>

            <div>
                <div style={{ fontFamily: 'fantasy' }} className="display-2 d-block">Certificate
                </div>
                <input style={{ fontFamily: 'fantasy', border: '1px solid black', borderStyle: 'dashed' }}
                    onChange={(e) => setCertificate({ ...certificate, title: e.target.value })}
                    className="display-6" value={certificate.title} type="text" />
            </div>

            <section className="mt-5">
                <div>Proudly to represented to </div>
                <b style={{ fontFamily: 'cursive' }} className="display-6 d-block">Name Surname</b>
            </section>

            <section className="mt-3">
           certificate
            </section>

            <div className="d-flex justify-content-center my-4">
                <div className="mx-5">
                    <div onClick={handleStampClick} style={{ border: '2px solid blue', borderStyle: 'dashed', width: '100%' }}>
                        {certificate.hospitalStamp == '' ? <div className="text-center" >
                            Add Stamp
                        </div> : <img width={100} src={certificate.hospitalStamp} />}
                    </div>
                    <input type="file" ref={stampInputRef} style={{ display: 'none' }} onChange={handleStamp} />
                    <div className="text-center">{trainingDetail.hospital.name}</div>
                </div>

                <div className="mx-5">
                    <div onClick={handleSignatureClick} style={{ border: '2px solid blue', borderStyle: 'dashed', width: '100%' }}>
                        {certificate.userSignature == '' ? <div className="text-center" style={{ border: '2px solid blue', borderStyle: 'dashed' }}>
                            Add signature
                        </div> : <img width={100} style={{ objectFit: 'contain' }} src={certificate.userSignature} />}
                    </div>
                    <input type="file" ref={signatureInputRef} style={{ display: 'none' }} onChange={handleSignature} />
                    <div>{user.name}</div>
                </div>
            </div>

        </div>
    </Card>
        }
        </>
    )
}