import { useParams } from "react-router-dom"
import { useFindTrainingById } from "../../../controller/viewHooks/training/useFindTrainingById";
import { Card, Divider } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import { Navigation } from "../../../components/default/Navigation";
import { HospitalMenu } from "../../../MenuBarItems/HospitalMenu";

export const TrainingCertificate = () => {
    const { trainingId } = useParams();
    const { trainingDetail, isFindingTraining } = useFindTrainingById(Number(trainingId));
    const user = JSON.parse(String(localStorage.getItem('userData')))
    let day = new Date();
    console.log(trainingDetail)
    return (
        <Navigation items={HospitalMenu}>
            {!isFindingTraining && <Card elevation={3} className="border">
                <Card elevation={5} className="border bg-primary border-secondary text-white p-2">
                    <div className="display-6 fw-bolder mb-2">{trainingDetail.title}</div>
                    <div className="fw-bolder mb-2"><LocationOn /> {trainingDetail.location.Location.Location.name}/{trainingDetail.location.Location.name} || {trainingDetail.location.name}</div>
                    <Divider className="border border-3 border-white my-3" />
                    {trainingDetail.description}
                </Card>
                <div className="d-flex justify-content-center p-2">
                    <div className="mx-2">
                        Total Attended Student <span
                            className="badge bg-primary">10</span>
                    </div>
                    <div className="mx-2">
                        Given certificate Student <span
                            className="badge bg-primary">10</span>
                    </div>
                </div>
                <Card className="m-2 border border-5 p-3">
                    <div className="p-2">
                        <div className="float-end mt-3">
                            <img src={trainingDetail.hospital.logo} height={80} /><br />
                            <span>{trainingDetail.hospital.name} </span>
                        </div>
                        <div>
                            <div style={{ fontFamily: 'fantasy' }} className="display-2 d-block">Certificate
                            </div>
                            <b style={{ fontFamily: 'fantasy' }} className="display-6 d-block">of Award</b>

                        </div>
                        <section className="mt-5">
                            <div>Proudly to represented to </div>
                            <b style={{ fontFamily: 'cursive' }} className="display-6 d-block">Name Surname</b>
                        </section>
                        <section className="mt-3">
                            This certificate is proudly presented to Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare posuere neque, eget venenatis turpis imperdiet condimentum. Nunc ornare nunc sit amet ullamcorper tempus. Maecenas pellentesque nisl pretium
                        </section>
                        <div className="d-flex justify-content-center">
                            <div className="mx-5">
                                <div>{day.getUTCDate() + "-" + day.getMonth() + "-" + day.getFullYear()}</div>
                                <Divider className="border-2 border-black " />
                                <div className="text-center">Date</div>
                            </div>
                            <div className="mx-5">
                                <div>{user.name}</div>
                                <Divider className="border-2 border-black " />
                                <div className="text-center">Date</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Card>
            }
        </Navigation>
    )
}