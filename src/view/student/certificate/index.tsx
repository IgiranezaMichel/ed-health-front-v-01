import { Download, QrCode2, RemoveRedEyeRounded, Sort, WorkspacePremium } from "@mui/icons-material"
import { StudentMenu } from "../../../MenuBarItems/StudentMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Modal } from "../../../components/default/Modal"
import QrCode from "../../../components/default/QrCode"
import { useGetAllStudentCertificatePage } from "../../../controller/viewHooks/CertifiedStudent/CertifiedStudentDao"
import { useState } from "react"
import { PaginationInput } from "../../../typeDefs/PaginationInput"
import { Button, Card, Divider, Pagination, Stack } from "@mui/material"
export const StudentCertificate = () => {
    const student = JSON.parse(String(localStorage.getItem("Student")));
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 10, sort: "id" });
    const studentCertificate = useGetAllStudentCertificatePage(Number(student.id), page);
    console.log(studentCertificate)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };

    const certificateModal = <Modal id="certificate" title="My certificate qrcode" actionBtn={<button data-bs-toggle="modal"
        data-bs-dismiss="#certificate" className="bg-danger text-white fw-bold border-0 p-1">close</button>}>
        <div className="text-center p-2">
            <QrCode url="" style={{}} pathVariable=""/>
        </div>
    </Modal>
    return (
        <Navigation items={StudentMenu}>
            <div className="fs-5 fw-bolder mb-3">
                <WorkspacePremium /> My Certificates
            </div>
            {!studentCertificate.isLoading && studentCertificate.studentCertificateObj.content.length != 0 && <>
                <div className="row g-3 mt-4">
                    <Stack spacing={2} className="mb-4">
                        <div>  Page {studentCertificate.studentCertificateObj.pageNumber + 1} out of {studentCertificate.studentCertificateObj.totalPages}  <span>
                            <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                            >
                                <option value="8">8</option>
                                <option value="16">16</option>
                                <option value="24">24</option>
                                <option value="32">32</option>
                            </select>
                        </span>
                            <span className="float-end">
                                Find My <select >
                                </select><Sort /></span>
                            <Pagination
                                count={studentCertificate.studentCertificateObj.totalPages}
                                page={studentCertificate.studentCertificateObj.pageNumber + 1}
                                onChange={handleChange}
                            />
                        </div>
                    </Stack>
                </div>

                <Card className="mb-3 border p-3">
                    <h4>Certificate title: </h4>
                    Training Location
                    <div></div>
                    <Divider className="border border-2 border-dark-subtle m-2" />
                    <div>Training description: </div>
                    <div className="modal-footer">
                        <Download />
                        <Button data-bs-toggle="modal" data-bs-target="#certificate"><QrCode2 /></Button>
                        <Button data-bs-toggle="modal" data-bs-target="#certificate"><RemoveRedEyeRounded /></Button>
                    </div>
                </Card>
            </>}
            {!studentCertificate.isLoading && studentCertificate.studentCertificateObj.content.length == 0 &&
                <div className="bg-primary fw-bold text-white text-center p-3">
                    -- No data found --
                </div>
            }
            {certificateModal}
        </Navigation>
    )
}