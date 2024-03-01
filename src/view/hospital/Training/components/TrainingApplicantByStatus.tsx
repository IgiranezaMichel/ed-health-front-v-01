/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cancel, CheckBoxOutlined, InsertDriveFile, LocalFireDepartment, LocationOn, Person2, Save,School, Sort, Wc } from "@mui/icons-material";
import { Card, Pagination, Tooltip } from "@mui/material";
import { useState } from "react";
import { useGetTrainingApplicantPage } from "../../../../controller/viewHooks/TrainingApplication/trainingApplication";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { useUpdateTrainingApplicantStatusByHospitalAdmin } from "../../../../controller/dmlHooks/TrainingApplication/TrainingApplicationDao";
import { STATUS } from "../../../../enums/Status";
import { Modal } from "../../../../components/default/Modal";

export const ShowApplicantStatus = (props: { trainingId: number, status: string }) => {
    const [status, setStatus] = useState(props.status);
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0,
        pageSize: 10,
        sort: "id"
    });
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event
        setPage({ ...page, pageNumber: value - 1 });
    };
    const { isLoadingApplicant, refetchApplicants, trainingApplicants } = useGetTrainingApplicantPage(props.status, Number(props.trainingId), page);
    const { isRegisterTrainingApplicationStatus, saveTrainingApplicationStatusHandler, saveTrainingApplicationStatusResult } = useUpdateTrainingApplicantStatusByHospitalAdmin(Number(props.trainingId), status);
    const changeStatusModal = <Modal actionBtn={<Save
        onClick={() => {
            saveTrainingApplicationStatusHandler();
            if (!isRegisterTrainingApplicationStatus) {
                alert(saveTrainingApplicationStatusResult);
                refetchApplicants();
            }
        }} />}
        id="saveChanges" title="Update application" >
        <div className="p-2">
            Are you sure you want to {status == 'cancelled' ? 'Cancel' : 'Approve'} this applicant?
        </div>
    </Modal>
    return (
        <>
            {!isLoadingApplicant &&
                <div className="mb-4 col-12">
                    <div className="row col-12 g-1 m-auto">
                    {trainingApplicants.content.length != 0 &&<div className="m-4">  Page {trainingApplicants.pageNumber + 1} out of {trainingApplicants.totalPages}  <span>
                                <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </span>
                                <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                                    <option selected={page.sort == 'title' ? true : false} value={"title"}>Title</option>
                                    <option selected={page.sort == 'description' ? true : false} value="description">Description</option>
                                    <option selected={page.sort == 'deadline' ? true : false} value="deadline">Deadline</option>
                                    <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                                </select><Sort /></span>
                                <Pagination
                                    count={trainingApplicants.totalPages}
                                    page={trainingApplicants.pageNumber + 1}
                                    onChange={handleChange}
                                />
                    </div>}
                        {trainingApplicants.content.length != 0 && <div className="col-sm-3 ">
                            
                            {trainingApplicants.content.map((data: any, index: any) => {
                                return <Card elevation={4} key={index} className="col-12 mt-2">
                                    <div className="text-center">
                                        <img src={data.student.user.profilePicture} height={150} />
                                    </div>
                                    <div className="m-2">
                                        <div className="mb-1"><Person2 /> {data.student.user.name}</div>
                                        <div className="mb-1"><Wc /> {data.student.user.gender}</div>
                                        <div className="mb-1">
                                            <Tooltip placement="top" title={"studied at " + data.student.school.name}>
                                                <span><School /> {data.student.school.name}</span>
                                            </Tooltip>
                                        </div>
                                        <div className="mb-1">
                                            <Tooltip placement="top" title={"Department of " + data.student.department.name}>
                                                <span><LocalFireDepartment /> {data.student.department.name}</span>
                                            </Tooltip>
                                        </div>
                                        <div className="mb-1">
                                            <Tooltip placement="top" title={data.student.school.name + " is located at " + data.student.school.location.name + '/' + data.student.school.location.Location.Location.name + '/' + data.student.school.location.Location.name}>
                                                <span><LocationOn />{data.student.school.location.name}/{data.student.school.location.Location.Location.name}/{data.student.school.location.Location.name}</span>
                                            </Tooltip>
                                        </div>
                                        <div className="mb-1">
                                            <Tooltip title={data.student.user.name + ' has ' + data.student.status + ' at ' + data.student.school.name}>
                                                <span>Student status <b>{data.student.status}</b></span>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="modal-footer py-2">
                                        <InsertDriveFile className="m-1" data-bs-toggle="modal" data-bs-target="#saveChanges" onClick={() => setStatus(STATUS.CANCEL)} />
                                        {props.status != 'approved' && <CheckBoxOutlined className="m-1" data-bs-toggle="modal" data-bs-target="#saveChanges" onClick={() => setStatus(STATUS.APPROVE)} />}
                                        {props.status != 'cancelled' && <Cancel className="m-1" data-bs-toggle="modal" data-bs-target="#saveChanges" onClick={() => setStatus(STATUS.CANCEL)} />}
                                    </div>
                                </Card>
                            })}
                        </div>}
                    </div>
                    {trainingApplicants.content.length == 0 && <div className="bg-primary p-3 text-white fw-bold text-center">
                        -- No applicant found --
                    </div>}
                </div>
            }
            {changeStatusModal}
        </>
    )
}
