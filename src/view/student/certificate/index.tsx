import { Description, Download, QrCode2, WorkspacePremium } from "@mui/icons-material"
import { StudentMenu } from "../../../MenuBarItems/StudentMenu"
import { Navigation } from "../../../components/default/Navigation"
import { Modal } from "../../../components/default/Modal"
import QrCode from "../../../components/default/QrCode"
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
export const StudentCertificate=()=>{
    const certificateModal=<Modal id="certificate" title="My certificate qrcode" actionBtn={<button data-bs-toggle="modal"
    data-bs-dismiss="#certificate" className="bg-danger text-white fw-bold border-0 p-1">close</button>}>
        <div className="text-center p-2">
            <QrCode certificateId={1}/>
        </div>
    </Modal>
    return (
        <Navigation items={StudentMenu}>
            <div className="fs-5 fw-bolder">
            <WorkspacePremium/> Certificates
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
                            <Button  data-bs-toggle="modal"
                            data-bs-target="#certificate"><QrCode2/></Button>
                            <Button><Download/></Button>
                            <Button><Description/></Button>
                        </TableCell>
                        
                    </TableRow>
                 </TableBody>
            </Table>
            {certificateModal}
        </Navigation>
    )
}