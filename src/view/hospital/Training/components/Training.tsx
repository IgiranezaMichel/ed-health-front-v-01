/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactPage, Description, DocumentScannerRounded, ReadMore} from "@mui/icons-material"
import { Button, Card, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Zoom } from "@mui/material"
import { CalendarIcon } from "@mui/x-date-pickers"
import { FC, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useFindHospitalByHospitalAndNcnmStatus } from "../../../../controller/viewHooks/useHospital"
import { PaginationInput } from "../../../../typeDefs/PaginationInput"
type item = {
    hospitalId: number, status: string, page: PaginationInput, children: ReactNode
}
export const Training: FC<item> = (item) => {
    const { hasLoaded, trainingList } = useFindHospitalByHospitalAndNcnmStatus(item.hospitalId, item.status, item.page);
    const navigate = useNavigate();
    return (
        <>
            {
                !hasLoaded && <div className="d-flex align-items-center justify-content-center align-content-center">
                    <CircularProgress className="m-auto"/>
                </div>
            }
            {hasLoaded &&
                <section>
                    <div className="bg">
                        {item.children}
                    </div>
                    <Card>
                    <Table className="overflow-auto">
                        <TableHead className="bg-primary">
                            <TableRow >
                            </TableRow>
                            <TableRow >
                                <TableCell className="fw-bolder text-white">#</TableCell>
                                <TableCell className="fw-bolder text-white">Title</TableCell>
                                <TableCell className="fw-bolder text-white">Deadline</TableCell>
                                <TableCell className="fw-bolder text-white">Ncnm Approval</TableCell>
                                <TableCell className="fw-bolder text-white">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                trainingList.map((data: any, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="fw-bolder">{index + 1}</TableCell>
                                            <TableCell>{data.title}</TableCell>
                                            <TableCell><CalendarIcon />{String(data.deadline).split('T')[0]}</TableCell>
                                            <TableCell>{data.ncnmApprovalStatus}</TableCell>
                                            <TableCell>
                                                <Tooltip placement="top" title="Training details">
                                                    <Button onClick={() => navigate('/hospital/training-detail/' + data.id)}><Description /></Button>
                                                </Tooltip>
                                                {(data.ncnmApprovalStatus == 'approved') && <Tooltip TransitionComponent={Zoom} placement="top" title="View Certificate">
                                                    <Button onClick={() => navigate('/hospital/certificate/' + data.id)}><DocumentScannerRounded /></Button>
                                                </Tooltip>}
                                                {(data.ncnmApprovalStatus == 'approved') && <Tooltip TransitionComponent={Zoom} placement="top" title="Applicant">
                                                    <Button><ContactPage onClick={() => navigate("/hospital/training-applicant-detail/" + data.id)} /></Button>
                                                </Tooltip>}
                                                <Tooltip TransitionComponent={Zoom} placement="top" title="Extend deadline">
                                                    <Button><ReadMore /></Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table> 
                    </Card>
                    {trainingList.length==0&&<div className="text-center p-4 border">
                        No data found
                        </div>}
                </section>
            }
        </>)
}