/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@mui/material";
import { useFindTrainingById } from "../../../controller/viewHooks/training/useFindTrainingById"
import { Description, LocalHospital, LocationOn } from "@mui/icons-material";
import { ClockIcon } from "@mui/x-date-pickers";

export const TrainingDetail = (props: { trainingId: number }) => {

    const { refreshTrainingDetail, trainerList, trainingRequirementList, isFindingTraining, trainingDetail } = useFindTrainingById(Number(props.trainingId));
    console.log(trainingDetail)
    return (
        <div>
            {!isFindingTraining && <>
                <Card className="col-sm-4 border-4 border-top border-primary">
                    <div className="text-center">
                        <span className="bg-primary text-white p-3">Host</span>
                    </div>
                    <img src={trainingDetail.hospital.logo} alt="" />
                    <section>
                        <div className="m-1"><LocalHospital />{trainingDetail.hospital.name}</div>
                        <div className="m-1"><LocalHospital />{trainingDetail.location.name}</div>
                    </section>
                </Card>
                <Card className="mt-3 p-2">
                    <Card elevation={5} className="p-2">
                        <h2 className="card-title mb-2">{trainingDetail.title}</h2>
                        <div className="mb-1"><span><LocationOn />{trainingDetail.location.Location.Location.name} || {trainingDetail.location.Location.name} || {trainingDetail.location.name}</span></div>
                        <div className="card-body mb-2">
                            <Description /> {trainingDetail.description}
                            <span className="float-end"><ClockIcon /> {trainingDetail.deadline}</span>
                        </div>
                    </Card>
                    <div className="card-body p-2">

                        {trainingDetail.trainingRequirementList.length != 0 &&
                            <>
                                <h4 className="mt-3 my-3">Requirement</h4>
                                {
                                    trainingDetail.trainingRequirementList.map((data: any,index:any) => {
                                        return <ul key={index}>
                                            <li>{data.description}</li>
                                        </ul>
                                    })
                                }
                            </>
                        }
                    </div>
                </Card>
            </>}
        </div>
    )
}
