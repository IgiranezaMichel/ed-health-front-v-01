import { Description, Download, QrCode2, WorkspacePremium } from "@mui/icons-material"
import { StudentMenu } from "../../../MenuBarItems/StudentMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Modal } from "../../../components/default/Modal"
import QrCode from "../../../components/default/QrCode"
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useGetAllStudentCertificatePage } from "../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao"
import { useState } from "react"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
export const StudentCertificate = () => {
    const student=JSON.parse(String(localStorage.getItem("Student")));
    const [page,setPage]=useState<PaginationInput>({pageNumber:0,pageSize:10,sort:"id"});
    useGetAllStudentCertificatePage(Number(student.id),page);
    const certificateModal = <Modal id="certificate" title="My certificate qrcode" actionBtn={<button data-bs-toggle="modal"
        data-bs-dismiss="#certificate" className="bg-danger text-white fw-bold border-0 p-1">close</button>}>
        <div className="text-center p-2">
            <QrCode certificateId={1} />
        </div>
    </Modal>
    return (
        <Navigation items={StudentMenu}>
            <div className="fs-5 fw-bolder">
                <WorkspacePremium /> Certificates
            </div>
            <Table className="mt-2">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>#</TableCell>
                        <TableCell>Issued date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>#</TableCell>
                        <TableCell>Issued date</TableCell>
                        <TableCell>
                            <Button data-bs-toggle="modal"
                                data-bs-target="#certificate"><QrCode2 /></Button>
                            <Button><Download /></Button>
                            <Button><Description /></Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            
            {certificateModal}
        </Navigation>
    )
}