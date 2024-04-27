/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { STATUS } from "../../../enums/Status";
import { PaginationInput } from "../../../typeDefs/PaginationInput";
import { Navigation } from "../../../components/default/Navigation";
import { StudentMenu } from "../../../MenuBarItems/StudentMenu";
import { CreateNewFolder, Description, NewReleases } from "@mui/icons-material";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Zoom } from "@mui/material";
import { TimeIcon } from "@mui/x-date-pickers";
import { TrainingDetail } from "./TrainingDetail";
import { useNcnmTrainingApprovalStatusPage } from "../../../controller/viewHooks/training/useNcnmTrainingApprovalStatus";
import { StudentTrainingApplicationStatus } from "./StudentTrainingApplicationStatus";

export const StudentTraining = () => {
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0, pageSize: 10, sort: "id"
    })
    const training = useNcnmTrainingApprovalStatusPage(page, STATUS.APPROVE);
    const [trainingId, setTrainingId] = useState(0);
    const [showPage, setShowPage] = useState('newTraining');
    return (
        <Navigation items={StudentMenu}>
            {trainingId == 0 && <div>
                {
                    <>
                        <div className="modal-footer py-3">
                            <Button className="mx-1" onClick={() => setShowPage('newTraining')} variant={showPage == 'newTraining' ? "contained" : "outlined"}>Available training</Button>
                            <Button className="mx-1" onClick={() => setShowPage('studentTrainingApplicationList')} variant={showPage == 'studentTrainingApplicationList' ? "contained" : "outlined"}>My Application</Button>
                        </div>

                    </>
                }
                <>
                    {training.hasFinishLoading && showPage == 'newTraining' && <div>

                        <span className="display-6 d-block" style={{ clear: 'both' }}><NewReleases className="fs-1" /> Training</span>
                        {training.trainingObj.content.length != 0 &&
                            <div>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Assigned by</TableCell>
                                            <TableCell>Deadline</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            training.trainingObj.content.map((data: any, index: any) => {
                                                return <TableRow key={index}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{data.title}</TableCell>
                                                    <TableCell>{data.hospital.name}</TableCell>
                                                    <TableCell><TimeIcon />{data.deadline}</TableCell>
                                                    <TableCell>
                                                        <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Check detail of " + data.title}>
                                                            <span><Description onClick={() => setTrainingId(Number(data.id))} /></span>
                                                        </Tooltip>
                                                        <Tooltip TransitionComponent={Zoom} className="m-1" placement="top" title={"Apply for " + data.title}>
                                                            <span><CreateNewFolder onClick={() => setTrainingId(Number(data.id))} /></span>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        }
                        {training.trainingObj.content.length == 0 &&
                            <div className="p-2 fw-bold text-center bg-primary text-white">
                                -- No New training found --
                            </div>
                        }
                    </div>
                    }
                </>
                {showPage == 'studentTrainingApplicationList' &&
                    <StudentTrainingApplicationStatus />
                }
            </div>}
            {trainingId != 0 && <div>
                <TrainingDetail trainingId={trainingId} />
            </div>}
        </Navigation>
    )
}