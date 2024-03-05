/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetStudentTrainingApplicationPage } from "../../../controller/viewHooks/TrainingApplication/trainingApplication";
import { STATUS } from "../../../enums/Status";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { Card, Divider, Pagination, Stack } from "@mui/material";
import { LocationOn, Sort } from "@mui/icons-material";

export const StudentTrainingApplicationStatus = () => {
    const student = JSON.parse(String(localStorage.getItem('Student')));
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0,
        pageSize: 10,
        sort: 'id'
    });
    const [status, setStatus] = useState<any>(STATUS.APPENDING);
    const trainResult = useGetStudentTrainingApplicationPage(Number(student.id), status, page);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
      };
      
    return (
        <>
            <div className="row g-3 mt-4">
                <Stack spacing={2} className="mb-4">
                    <div>  Page {trainResult.trainingApplicationDetail.pageNumber + 1} out of {trainResult.trainingApplicationDetail.totalPages}  <span>
                        <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                        >
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="24">24</option>
                            <option value="32">32</option>
                        </select>
                    </span>
                        <span className="float-end">
                            Find My <select onChange={e => setStatus(e.target.value)} className="custom-select p-1" name="" id="">
                                <option selected={status == STATUS.APPENDING ? true : false} value={STATUS.APPENDING}>On going application</option>
                                <option selected={status == STATUS.APPENDING ? true : false} value={STATUS.APPROVE}>Approved application</option>
                                <option selected={status == STATUS.APPENDING ? true : false} value={STATUS.CANCEL}>Cancelled application</option>
                            </select><Sort /></span>
                        <Pagination
                            count={trainResult.trainingApplicationDetail.totalPages}
                            page={trainResult.trainingApplicationDetail.pageNumber + 1}
                        onChange={handleChange}
                        />
                    </div>
                </Stack>
            </div>
            {trainResult.hasFinishLoading && trainResult.trainingApplicationDetail.content.map(
                (data: any, index: any) => {
                    return <Card elevation={4} className="mb-3 p-3" key={index}>
                        <section>
                            <div className="display-6">{data.training.title}</div>
                            <div><LocationOn />{data.training.location.Location.Location.name} || {data.training.location.Location.name} || {data.training.location.name}</div>
                            <small style={{ clear: 'both' }} className="float-sm-end"> Prepared by {data.training.hospital.name}</small>
                        </section>

                        <Divider className="border border-2 border-dark-subtle my-1 mt-2" />
                        <div >{data.training.description}</div>
                        <div ><b>Posted at </b>{String(data.training.timeStamp).split('T')[0]} <span className="float-md-end"><b>Deadline </b>{String(data.training.deadline).split('T')[0]} </span></div>
                    </Card>
                }
            )

            }
            {trainResult.hasFinishLoading && trainResult.trainingApplicationDetail.content.length == 0 &&
                <div className="bg-primary text-white text-center fw-bolder p-2">
                    -- No data found --
                </div>}
        </>
    )
}