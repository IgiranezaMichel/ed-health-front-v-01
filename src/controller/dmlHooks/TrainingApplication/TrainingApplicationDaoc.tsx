import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CHANGE_TRAINING_APPLICATION_STATUS_BY_HOSPITAL_ADMIN } from "../../../graphQl/mutation/TrainingApplicationMutations";

export const useUpdateTrainingApplicantStatusByHospitalAdmin=()=>(trainingId:number, status: string) => {
    const [saveTrainingApplicationStatusResult, setSaveTrainingApplicationStatusResult] = useState('');
    const [isRegisterTrainingApplicationStatus, setIsRegisterTrainingApplicationStatus] = useState(true);
    const [updateTrainingApplicationData] = useMutation(CHANGE_TRAINING_APPLICATION_STATUS_BY_HOSPITAL_ADMIN);

    const saveTrainingApplicationStatusHandler = () => {
        updateTrainingApplicationData({ variables: { trainingId: trainingId, status: status } })
            .then(data => {
                setSaveTrainingApplicationStatusResult(data.data.changeApplicantStatusByHospitalAdmin);
                setIsRegisterTrainingApplicationStatus(false);
            })
            .catch(err => console.log(err));
    }
    return { saveTrainingApplicationStatusHandler, saveTrainingApplicationStatusResult, isRegisterTrainingApplicationStatus};
}