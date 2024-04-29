import { useMutation } from "@apollo/client";
import { Cancel, CheckBox, LocalHospital, LocalHospitalOutlined, LocationCity, PostAdd } from "@mui/icons-material";
import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu";
import { Modal } from "../../../components/default/Modal";
import { Navigation } from "../../../components/default/Navigation";
import { useFindHospitalById } from "../../../controller/viewHooks/useHospital";
import { Role } from "../../../enums/Role";
import { REGISTER_HOSPITAL_ADMIN } from "../../../graphQl/mutation/HospitalAdminMutations";
import { AccountHolderInput } from "../../../typeDefs/AccountHolderInput";
import { HospitalAdminInput } from "../../../typeDefs/HospitalAdminInput";

export const HospitalDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState<AccountHolderInput>({
        email: '',
        gender: '',
        name: '',
        password: '',
        phoneNumber: '',
        id: 0,
        profilePicture: '',
        role: Role.HOSPITAL_ADMIN
    })
    const [hospitalAdmin, setHospitalAdmin] = useState<HospitalAdminInput>({
        hospitalId: Number(id),
        id:0,
        position:'',
    });
    
    const { hospitalDetail, isProcessingHospitalData } = useFindHospitalById(Number(id));
    const [userHasAccount, setUserHasAccount] = useState(false);
    const [hasSetChoice, setHasSetChoice] = useState(false);
    console.log(hospitalDetail);
    const [saveHospitalAdminData]=useMutation(REGISTER_HOSPITAL_ADMIN);
    const saveHospitalAdminHandler=()=>{
        saveHospitalAdminData({variables:{hospitalAdmin:hospitalAdmin,user:user}})
        .then(data=>alert(data.data.registerHospitalAdmin));
    }
    const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setUser({ ...user, profilePicture: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const userInput = <div className="p-2">
        {!userHasAccount && <>
            <TextField value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} className="form-control mb-2" label="Name" />
            <div>
                Select gender
            </div>
            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input value='Male' checked={user.gender == 'Male' ? true : false} type="checkbox" className="btn-check" />
                <label className="btn btn-outline-primary" onClick={() => { setUser({ ...user, gender: 'Male' }) }}>Male</label>
                <input type="checkbox" value='Female' checked={user.gender == 'Female' ? true : false} className="btn-check" />
                <label className="btn btn-outline-primary" onClick={() => setUser({ ...user, gender: 'Female' })} >Female</label>
            </div>
            <div className="mb-3">
                <label className="form-label">Choose Profile picture</label>
                <input type="file" onChange={imgHandler} className="form-control"
                />
            </div>
            <div>
                Date of birth
                <input onChange={(e) => setUser({ ...user, dob: e.target.value })} type="date" className="form-control mb-2" />
            </div>
        </>}
        <TextField value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control mb-2" label="Email" />
        {!userHasAccount && <>
            <TextField value={user.phoneNumber} onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} className="form-control mb-2" label="Phone number" />
            <TextField type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} className="form-control mb-2" label="Password" />
        </>}
        <TextField value={hospitalAdmin.position} onChange={(e) => setHospitalAdmin({ ...hospitalAdmin,position: e.target.value })} className="form-control mb-2" label="Position Name" />
    </div>
    const saveUserModal = <Modal titleIcon={<LocalHospitalOutlined className="fs-2 mx-1" />} id="saveHospitalAdmin" title="Add Hospital Admin"
        actionBtn={<Button onClick={()=>saveHospitalAdminHandler()} className="bg-primary text-white">Submit</Button>}>
        <div>
            <div className="text-center p-2 fw-bold">User has account?
                <CheckBox onClick={() => { setHasSetChoice(true); setUserHasAccount(true) }} />
                <Cancel onClick={() => { setHasSetChoice(true); setUserHasAccount(false) }} /></div>
            {hasSetChoice ? userInput : ""}
        </div>
    </Modal>

    return (
        <Navigation items={NcnmMenu} >
            {!isProcessingHospitalData && <div className="row col-12 m-auto">
                <Card className="col-sm-4 rounded-0">
                    <img src={hospitalDetail.logo} className="card-img" />
                    <div><LocalHospital />{hospitalDetail.name}</div>
                    <div>
                        <LocationCity />{hospitalDetail.location.Location.Location.name} || {hospitalDetail.location.Location.name} || {hospitalDetail.location.name}
                    </div>
                </Card>
                <Card className="col-sm-8 rounded-0 d-flex justify-content-center align-content-center align-items-center">
                    <div>
                        <h5>{hospitalDetail.name} Admins</h5>
                        {hospitalDetail.hospitalTrainingList.length == 0 &&
                            <div className="bg-primary text-white fw-bolder text-center">
                                --No data found --
                            </div>}
                        <div>
                            <PostAdd data-bs-toggle="modal" data-bs-target="#saveHospitalAdmin" className="float-end" />
                        </div>
                    </div>
                </Card>
            </div>}
            {saveUserModal}
        </Navigation>
    )
}
