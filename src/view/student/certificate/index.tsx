import {QrCode2, WorkspacePremium } from "@mui/icons-material"
import { StudentMenu } from "../../../MenuBarItems/StudentMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Modal } from "../../../components/default/Modal"
import QrCode from "../../../components/default/QrCode"
import { useGetAllStudentCertificatePage } from "../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao"
import { useState } from "react"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { Button, Card } from "@mui/material"
export const StudentCertificate = () => {
    const student=JSON.parse(String(localStorage.getItem("Student")));
    const [page,setPage]=useState<PaginationInput>({pageNumber:0,pageSize:10,sort:"id"});
    const studentCertificate=useGetAllStudentCertificatePage(Number(student.id),page);
    const certificateModal = <Modal id="certificate" title="My certificate qrcode" actionBtn={<button data-bs-toggle="modal"
        data-bs-dismiss="#certificate" className="bg-danger text-white fw-bold border-0 p-1">close</button>}>
        <div className="text-center p-2">
            <QrCode certificateId={1} />
        </div>
    </Modal>
    return (
        <Navigation items={StudentMenu}>
            <div className="fs-5 fw-bolder">
                <WorkspacePremium /> My Certificates
            </div>
            <Button data-bs-toggle="modal" data-bs-target="#certificate"><QrCode2 /></Button>
            <Card>
                <h4>Certificate title: </h4>
                
                <div>Certificate title: </div>
                <div>Certificate title: </div>
            </Card>
            {certificateModal}
        </Navigation>
    )
}