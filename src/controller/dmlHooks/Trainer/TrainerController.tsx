import { useMutation } from "@apollo/client"
import { DELETE_TRAINER_BY_ID, REGISTER_TRAINER } from "../../../graphQl/mutation/TrainerMutations";
import { TrainerInput } from "../../../typeDefs/TrainerInput";

export const RegisterTrainer = (trainer: TrainerInput) => {
    const [saveTrainerData] = useMutation(REGISTER_TRAINER);
    const registerTrainerHandler = async () => {
        await saveTrainerData({
            variables: { input: trainer }
        })
    }
    registerTrainerHandler().then(data => data).catch(err => err)
}
export const DeleteTrainerById = (id: number) => {
    const [trainerData] = useMutation(DELETE_TRAINER_BY_ID);
    const deleteTrainerHandler = async () => {
        await trainerData({ variables: { id: id } });
    }
    deleteTrainerHandler().then(data => data).catch(err => err);

}