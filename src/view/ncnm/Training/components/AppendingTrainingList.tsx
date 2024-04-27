/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarToday, ListAltSharp, LocalHospital, LocationOn, Sort } from "@mui/icons-material";
import { Pagination, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
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
            <div className="mt-4">  Page {appendingTrainingDetail.pageNumber + 1} out of {appendingTrainingDetail.totalPages}  <span>
                <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2">
                    <option value={8}>8</option>
                    <option value={16}>16</option>
                    <option value="24">24</option>
                </select>
            </span>
                <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                    <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                    <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
                    <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                </select><Sort /></span>
                <Pagination count={appendingTrainingDetail.totalPages} onChange={handleChange} page={appendingTrainingDetail.pageNumber + 1} />
            </div>
            <Table className="overflow-auto">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Hospital</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Published_On</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                {!isLoadingAppendingTrainingData && <TableBody>
                    {
                        appendingTrainingDetail.content.map((data: any, index: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="col-sm-2">
                                        <div>
                                            <img className="card-img" src={data.hospital.logo} alt="" />
                                            <div><LocalHospital />{data.hospital.name}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{data.title}</TableCell>
                                    <TableCell><CalendarToday />{String(data.timeStamp).split('T')[0]}</TableCell>
                                    <TableCell>
                                        <div> <CalendarToday />{String(data.deadline).split('T')[0]}</div>
                                        <div><LocationOn />{data.location.Location.Location.name}/{data.location.Location.name}/{data.location.name}</div>
                                    </TableCell>
                                    <TableCell><ListAltSharp onClick={() => navigate("/ncnm/training-detail/" + data.id)} /></TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>}

            </Table>
            {
                !isLoadingAppendingTrainingData && appendingTrainingDetail.length == 0 &&
                <div className="text-center p-4 bg-primary text-white fw-bold">
                    -- No data found --
                </div>
            }
            
        </>
    )
}
