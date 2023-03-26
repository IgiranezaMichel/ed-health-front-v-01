import { useMutation } from "@apollo/client";
import { Cancel, Edit, Email, Password, Person2 } from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { Role } from "../../enums/Role";
import { REGISTER_USER } from "../../graphQl/mutation/UserMutations";
import { AccountHolderInput } from "../../typeDefs/AccountHolderInput";

export const Setting = () => {
    
    const [updateUser] = useMutation(REGISTER_USER);
    const user = JSON.parse(String(localStorage.getItem("userData")));
    const [edit, setEdit] = useState(false);
    const [userData, setUserData] = useState<AccountHolderInput>({
        dob: user.dob,
        email: user.email,
        gender: user.gender,
        id: Number(user.id),
        name: user.name,
        password: '',
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
        role: Role.ADMIN
    });

    const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setUserData({ ...userData, profilePicture: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }

    const updateUserHandler = () => {
        updateUser({ variables: { input: userData } }).then(data => { localStorage.removeItem("userData"); localStorage.setItem("userData", JSON.stringify(user)); alert(data.data.registerUser.name + " Saved successful") }
        ).catch(err => err);
    }

    return (
        <Card elevation={7} className="row col-sm-10 m-auto d-flex justify-content-center align-content-center my-5">
            <Card className="col-sm-6 p-0 rounded-0 m-auto d-flex justify-content-center align-content-center">
                <div>
                    <img src={userData.profilePicture} className="card-img border-0 rounded-0" alt="" />
                    {edit && <div className="p-2 bg-info" >
                        <input type="file" onChange={imgHandler} className="d-block text-white bg-black" />
                    </div>}
                </div>
            </Card>
            <Card className="col-sm-6 card d-flex justify-content-center align-content-center">
                <section className="">
                    <div className={edit ? "input-group  rounded-0 mb-2 border border-2 border-dark p-1" : "input-group  rounded-0 mb-2"}>
                        <span><Person2 /></span>
                        <input value={userData.name} onChange={(e) => { setUserData({ ...userData, name: e.target.value }) }} type="text" disabled={edit ? false : true} placeholder="Enter Name" className="form-control bg-white border-0 rounded-0" autoComplete="false" />
                    </div>
                    <div className={edit ? "input-group  rounded-0 mb-2 border border-2 border-dark p-1" : "input-group  rounded-0 mb-2"}>
                        <span><Person2 /></span>
                        {!edit && <input value={userData.gender} type="text" disabled={edit ? false : true} placeholder="Enter Name" className="form-control bg-white border-0 rounded-0" autoComplete="false" />}
                        {edit && <select onChange={(e) => { setUserData({ ...userData, gender: e.target.value }) }} className="custom-select form-control">
                            <option selected>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>}
                    </div>
                    <div className={edit ? "input-group  rounded-0 mb-2 border border-2 border-dark p-1" : "input-group  rounded-0 mb-2"}>
                        <span><Email /></span>
                        <input value={userData.email} onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }} type="text" disabled={edit ? false : true} placeholder="Enter Name" className="form-control bg-white border-0 rounded-0" autoComplete="false" />
                    </div>
                    <div className={edit ? "input-group  rounded-0 mb-2 border border-2 border-dark p-1" : "input-group  rounded-0 mb-2"}>
                        <span><CalendarIcon /></span>
                        <input type={edit ? "date" : "text"} value={userData.dob} onChange={(e) => { setUserData({ ...userData, dob: e.target.value }) }} disabled={edit ? false : true} placeholder="Enter Name" className="form-control bg-white border-0 rounded-0" autoComplete="false" />
                    </div>
                    {edit && <div className={edit ? "input-group  rounded-0 mb-2 border border-2 border-dark p-1" : "input-group  rounded-0 mb-2"}>
                        <span><Password /></span>
                        <input type="password" value={userData.dob} onChange={(e) => { setUserData({ ...userData, dob: e.target.value }) }} disabled={edit ? false : true} placeholder="Enter Name" className="form-control bg-white border-0 rounded-0" autoComplete="false" />
                    </div>}
                    <div className="modal-footer">
                        {!edit && <Edit onClick={() => setEdit(true)} />}
                        {edit && <div>
                            <Button className="bg-success text-white fw-bolder m-1" onClick={() => updateUserHandler()}>Update</Button>
                            <Button onClick={() => setEdit(false)} className="bg-danger text-white fw-bolder m-1">
                                <Cancel />
                            </Button>
                        </div>}
                    </div>
                </section>
            </Card>
        </Card>
    )
}
