import { useMutation } from "@apollo/client"
import { FIND_USER_BY_EMAIL } from "../../../graphQl/mutation/UserMutations"

export const useFindAccountHolderByEmail=(email:string)=>{
const [findUser]=useMutation(FIND_USER_BY_EMAIL);
const findByEmail=async()=>{
    return await findUser({variables:{email:email}})
}
return {findByEmail}
}