/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { CertificateInput } from "../../../../typeDefs/CertificateInput";
import { CancelPresentation, CheckBox, } from "@mui/icons-material";
import { Card, Divider } from "@mui/material";
import { useFindTrainingById } from "../../../../controller/viewHooks/training/useFindTrainingById";
import QrCode from "../../../../components/default/QrCode";
import { useRegisterCertificate } from "../../../../controller/dmlHooks/Certificate/CertifateDao";
export const CreateCertificate = (props: { trainingId: number }) => {
    const user = JSON.parse(String(localStorage.getItem('userData')));
    const day = new Date();
    const { trainingDetail, isFindingTraining } = useFindTrainingById(props.trainingId);
    const [certificate, setCertificate] = useState<CertificateInput>({
        id: 0,
        accountHolderId: Number(user.id),
        description:'',
        userSignature:'',
        hospitalStamp:'',
        title: 'of Award',
        trainingId: props.trainingId
    });
    const saveCertificate = useRegisterCertificate(certificate);
    const saveCertificateHandler = () => {
        console.log(certificate)
        saveCertificate.saveCertificateHandler();
        if (!saveCertificate.isLoading) {
            alert(saveCertificate.result.message);
        }
    }
    const signatureInputRef = useRef(null);
    const stampInputRef = useRef(null);

    const handleSignatureClick = () => {
        if (signatureInputRef.current) {
            signatureInputRef.current.click();
        }
    };
    const handleStampClick = () => {
        if (stampInputRef.current) {
            stampInputRef.current.click();
        }
    };
    const handleStamp = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setCertificate({ ...certificate, hospitalStamp: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const handleSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setCertificate({ ...certificate, userSignature: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <>
            {
                !isFindingTraining && <Card className="m-2 border border-5 p-3">
                    <div className="p-2">
                        <div className="float-end mt-3">
                            <img src={trainingDetail.hospital.logo} height={80} /><br />
                            <span>{trainingDetail.hospital.name} </span>
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
                            <textarea className="form-control p-1"
                                style={{ border: '1px solid black', borderStyle: 'dashed' }}
                                placeholder="This certificate is proudly ..."
                                onChange={(e) => { setCertificate({ ...certificate, description: e.target.value }) }} value={certificate.description}>
                            </textarea>
                        </section>

                        <div className="d-flex justify-content-center my-4">
                            <div className="mx-5">
                                <div>{day.getUTCDate() + "-" + day.getMonth() + "-" + day.getFullYear()}</div>
                                <Divider className="border-2 border-black " />
                                <div className="text-center">Date</div>
                            </div>
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
                    <div style={{ width: '40px', height: '40px', float: 'right', }}>
                        <QrCode url="/certificate" certificateId={1} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="text-center" style={{ clear: 'both' }}>
                        <CheckBox onClick={() => saveCertificateHandler()} className="fs-2" /> <CancelPresentation className="fs-2" />
                    </div>
                </Card>
            }
        </>
    )
}