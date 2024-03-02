import { useMutation } from "@apollo/client";
import { useState } from "react"
import { CHANGE_TRAINING_APPLICATION_STATUS_BY_HOSPITAL_ADMIN, REGISTER_STUDENT_TRAINING_APPLICATION } from "../../../graphQl/mutation/TrainingApplicationMutations";

export const useUpdateTrainingApplicantStatusByHospitalAdmin=(trainingId:number, status: string)=>{
    const [saveTrainingApplicationStatusResult, setSaveTrainingApplicationStatusResult] = useState('');
    const [isRegisterTrainingApplicationStatus, setIsRegisterTrainingApplicationStatus] = useState(true);
    const [updateTrainingApplicationData] = useMutation(CHANGE_TRAINING_APPLICATION_STATUS_BY_HOSPITAL_ADMIN);

    const saveTrainingApplicationStatusHandler = () => {
        updateTrainingApplicationData({ variables: { trainingId: trainingId, trainingStatus: status } })
            .then(data => {
                setSaveTrainingApplicationStatusResult(data.data.changeApplicantStatusByHospitalAdmin);
                setIsRegisterTrainingApplicationStatus(false);
            })
            .catch(err => console.log(err));
    }
    return { saveTrainingApplicationStatusHandler, saveTrainingApplicationStatusResult, isRegisterTrainingApplicationStatus};
}
export const useRegisterStudentTrainingApplication=(studentId:number,trainingId:number,studentApprovalStatus:string)=>{
const [saveStudentRegistration]=useMutation(REGISTER_STUDENT_TRAINING_APPLICATION);
const [hasFinishLoading,setHasFinishLoading]=useState(false);
const saveStudentRegistrationHandler=()=>{
    saveStudentRegistration({variables:{studentId:studentId,trainingId:trainingId,studentApprovalStatus:studentApprovalStatus}})
    .then(data=>{alert(data.data.registerStudentTrainingApplication.split(',')[1]);setHasFinishLoading(true);})
    .catch(err=>err)
}
return{saveStudentRegistrationHandler,hasFinishLoading}
}