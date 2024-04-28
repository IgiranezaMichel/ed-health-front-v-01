/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation } from "@apollo/client";
import { SchoolInput } from "../../../typeDefs/SchoolInput";
import { REGISTER_SCHOOL_FOR_EXISTING_ACCOUNT_HOLDER, REGISTER_SCHOOL_FOR_NEW_ACCOUNT_HOLDER } from "../../../graphQl/mutation/SchoolMutation";
import { AccountHolderInput } from "../../../typeDefs/AccountHolderInput";

export const useSaveNewSchoolHavingExistingUserAsAdmin = (schoolInput: SchoolInput, userEmail: string) => {
    const [addSchool] = useMutation(REGISTER_SCHOOL_FOR_EXISTING_ACCOUNT_HOLDER);
    const registerSchool = async () => {
        return addSchool({ variables: { schoolInput: schoolInput, userEmail: userEmail} })
    }
    return { registerSchool };
}

export const useSaveNewSchoolHavingNewUserAsAdmin = (schoolInput: SchoolInput, userInput: AccountHolderInput) => {
    const [addSchool] = useMutation(REGISTER_SCHOOL_FOR_NEW_ACCOUNT_HOLDER);
    const registerSchool = async () => {
        return addSchool({ variables: { schoolInput: schoolInput, userInput: userInput} })
    }
    return { registerSchool };
}