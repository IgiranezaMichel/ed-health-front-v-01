/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarToday, Close, LocationOn, School, Sort } from "@mui/icons-material";
import { Avatar, Dialog, NativeSelect, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { useExpiredTraining } from "../../../../controller/viewHooks/training/useExpiredTraining";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { SuccessTrainingDetail } from "./successTrainingDetail";
type trainingControl = {
    status: string,
}
export const ExpiredTrainingList: FC<trainingControl> = (props) => {
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 8, sort: "deadline" });
    const { expiredTrainingDetail, isLoadingExpiredTrainingDatas } = useExpiredTraining(props.status, page);
    console.log(expiredTrainingDetail)
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };
    const [trainingId, setTrainingId] = useState(0);
    const [openTrainingDetail, setOpenTrainingDetail] = useState(false);
    return (
        <>
            {expiredTrainingDetail.totalPages != 0 && <div className="mt-4">  Page {expiredTrainingDetail.pageNumber + 1} out of {expiredTrainingDetail.totalPages}  <span>
                <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                    <option value="8">8</option>
                    <option value="16">18</option>
                    <option value="24">24</option>
                </NativeSelect>
            </span>
                <span className="float-end"> Sort by<Sort /><NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                    <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                    <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
                    <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                </NativeSelect></span>
                <Pagination count={expiredTrainingDetail.totalPages} onChange={handleChange} page={expiredTrainingDetail.pageNumber + 1} />
            </div>}
            <Table className="overflow-auto mt-4">
                <TableHead>
                    <TableRow className={props.status == 'cancelled'?"bg-danger":"bg-success"}>
                        <TableCell className="fw-bold text-white">#</TableCell>
                        <TableCell className="fw-bold text-white">Hospital</TableCell>
                        <TableCell className="fw-bold text-white">Title</TableCell>
                        <TableCell className="fw-bold text-white">Published_On</TableCell>
                        <TableCell className="fw-bold text-white">Deadline</TableCell>
                        {props.status != 'cancelled' && <TableCell className="fw-bold text-white">Action</TableCell>}
                    </TableRow>
                </TableHead>
                {!isLoadingExpiredTrainingDatas && <TableBody>
                    {
                        expiredTrainingDetail.content.map((data: any, index: any) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell >
                                        <section className="d-flex">
                                        <Tooltip title={<div><img src={data.hospital.logo} alt="" /></div>}><Avatar src={data.hospital.logo}/></Tooltip>
                                        <div className="card justify-content-center border-0">{data.hospital.name}</div>
                                        </section>
                                    </TableCell>
                                    <TableCell>{data.title}</TableCell>
                                    <TableCell><CalendarToday />{String(data.timeStamp).split('T')[0]}</TableCell>
                                    <TableCell>
                                        <div className="mb-3"> <CalendarToday />{String(data.deadline).split('T')[0]}</div>
                                        <div><LocationOn />{data.location.Location.Location.name}/{data.location.Location.name}/{data.location.name}</div>
                                    </TableCell>
                                    <TableCell>
                                        {props.status != 'cancelled' && <School onClick={() => { setTrainingId(data.id); setOpenTrainingDetail(true) }} />}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                    {expiredTrainingDetail != undefined && expiredTrainingDetail.content != undefined && expiredTrainingDetail.content.length == 0 && <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            -- no data found --
                        </TableCell>
                    </TableRow>}
                </TableBody>}
            </Table>
            <Dialog maxWidth='lg' PaperProps={{ className: 'col-12 rounded-0' }} open={openTrainingDetail}>
                <SuccessTrainingDetail trainingId={trainingId}>
                    <div className="p-4 bg-white sticky-top fw-bold">Training Details <Close onClick={() => setOpenTrainingDetail(false)} className="float-end" /></div>
                </SuccessTrainingDetail>
            </Dialog>
        </>
    )
}
