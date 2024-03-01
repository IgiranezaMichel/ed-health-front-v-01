/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { MODIFY_TRAINING_STATUS, REGISTER_TRAINING } from "../../../graphQl/mutation/TrainingMutation";
import { TrainingInput } from "../../../typeDefs/TrainingInput";
export const useRegisterTraining=(training:TrainingInput)=>{
    const [saveTrainingResult,setSaveTrainingResult]=useState('');
    const [isProcessingRegisterTraining,setIsPrecessingRegisterTraining]=useState(true);
    const [trainingData]=useMutation(REGISTER_TRAINING);
    const saveTrainingHandler=()=>{
     trainingData({variables:{input:training}}).then(data=>{
        setSaveTrainingResult(data.data.registerTraining);
        setIsPrecessingRegisterTraining(false)}).catch(err=>err);
    }
    return {saveTrainingHandler,saveTrainingResult,isProcessingRegisterTraining}
}
export const useModifyTrainingApprovalStatus = (trainingId:any, status: any) => {
    const [saveTrainingStatusResult, setSaveTrainingStatusResult] = useState('');
    const [isProcessingRegisterTrainingStatus, setIsProcessingRegisterTrainingStatus] = useState(true);
    const [updateTrainingData] = useMutation(MODIFY_TRAINING_STATUS);

    const saveTrainingStatusHandler = () => {
        updateTrainingData({ variables: { trainingId: trainingId, status: status } })
            .then(data => {
                setSaveTrainingStatusResult(data.data.updateTrainingStatus);
                setIsProcessingRegisterTrainingStatus(false);
            })
            .catch(err => console.log(err));
    }

    return { saveTrainingStatusHandler, saveTrainingStatusResult, isProcessingRegisterTrainingStatus };
}