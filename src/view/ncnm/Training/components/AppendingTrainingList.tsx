/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarToday, ListAltSharp,  LocationOn, Sort } from "@mui/icons-material";
import { Avatar, Card, NativeSelect, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { useAppendingTraining } from "../../../../controller/viewHooks/training/useAppendingTraining";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { useNavigate } from "react-router-dom";
type trainingControl = {
    status: string,
}
export const AppendingTrainingList: FC<trainingControl> = (props) => {
    const [page, setPage] = useState<PaginationInput>({ pageNumber: 0, pageSize: 8, sort: "deadline" });
    const navigate = useNavigate();
    const { appendingTrainingDetail, isLoadingAppendingTrainingData } = useAppendingTraining(props.status, page);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };
    return (
        <>
           {appendingTrainingDetail.totalPages!=0&&<div className="mt-4">  Page {appendingTrainingDetail.pageNumber + 1} out of {appendingTrainingDetail.totalPages}  <span>
                <NativeSelect onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value="24">24</option>
                </NativeSelect>
            </span>
                <span className="float-end"> Sort by <Sort /> <NativeSelect onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                    <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                    <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
                    <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                </NativeSelect></span>
                <Pagination count={appendingTrainingDetail.totalPages} onChange={handleChange} page={appendingTrainingDetail.pageNumber + 1} />
            </div>}
            <Card className="overflow-auto mt-5">
            <Table >
                <TableHead>
                    <TableRow className="bg-body-secondary">
                        <TableCell className="fw-bold">#</TableCell>
                        <TableCell className="fw-bold">Hospital</TableCell>
                        <TableCell className="fw-bold">Title</TableCell>
                        <TableCell className="fw-bold">Deadline</TableCell>
                        <TableCell className="fw-bold">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!isLoadingAppendingTrainingData && <TableBody>
                    {
                        appendingTrainingDetail.content.map((data: any, index: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="col-sm-2">
                                        <div className="d-flex">
                                            <Tooltip title={<div><img className="card-img p-1" height={'100vh'} src={data.hospital.logo} /></div>}>
                                            <Avatar className="card-img p-1" src={data.hospital.logo} />
                                            </Tooltip>
                                            <div className="card d-flex justify-content-center border-0">{data.hospital.name}</div>
                                        </div>
                                        <div>
                                        {String(data.timeStamp).split('T')[0]}
                                        </div>
                                    </TableCell>
                                    <TableCell>{data.title}</TableCell>
                                    <TableCell>
                                        <div className="mb-2"> <CalendarToday className="border rounded-circle border-black p-1"/> {String(data.deadline).split('T')[0]}</div>
                                        <div className="m"><LocationOn className="border rounded-circle border-black p-1"/> {data.location.Location.Location.name} || {data.location.Location.name} || {data.location.name}</div>
                                    </TableCell>
                                    <TableCell><ListAltSharp onClick={() => navigate("/ncnm/training-detail/" + data.id)} /></TableCell>
                                </TableRow>
                            )
                        })
                    }
                     {appendingTrainingDetail != undefined && appendingTrainingDetail.content != undefined && appendingTrainingDetail.content.length == 0 && <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            -- no data found --
                        </TableCell>
                    </TableRow>}
                </TableBody>}

            </Table>
            </Card>
            {
                !isLoadingAppendingTrainingData && appendingTrainingDetail.length == 0 &&
                <div className="text-center p-4 bg-primary text-white fw-bold">
                    -- No data found --
                </div>
            }
            
        </>
    )
}
