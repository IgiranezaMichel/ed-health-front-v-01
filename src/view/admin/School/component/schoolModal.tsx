/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFilterLocation } from "../../../../controller/viewHooks/Location/useFilterLocation";
import { SchoolInput } from "../../../../typeDefs/SchoolInput";
import { Avatar, Button, NativeSelect, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useFindAccountHolderByEmail } from "../../../../controller/dmlHooks/user";
import { AccountHolderInput } from "../../../../typeDefs/AccountHolderInput";
import { Role } from "../../../../enums/Role";
import { ToastContainer, toast } from "react-toastify";
import { useSaveNewSchoolHavingExistingUserAsAdmin, useSaveNewSchoolHavingNewUserAsAdmin } from "../../../../controller/dmlHooks/school/school";
export const SchoolFormModal = () => {
    const { listOfLocationData } = useFilterLocation("name", "PROVINCE");
    const [email, setEmail] = useState('');
    const [user, setUser] = useState<any>({});
    const { findByEmail } = useFindAccountHolderByEmail(email);

    const [school, setSchool] = useState<SchoolInput>({
        id: 0,
        locationId: 0,
        logo: '',
        name: ''
    });

    useEffect(
        () => {

        }, [school]
    )
    const [districtList, setDistrictList] = useState<any>([]);
    const [accountHolder, setAccountHolder] = useState<AccountHolderInput>({
        email: '', gender: '', id: 0, name: '', password: '', phoneNumber: '', profilePicture: '', dob: '', role: Role.SCHOOL_ADMIN
    });
    const saveSchoolWithExistingAccount=useSaveNewSchoolHavingExistingUserAsAdmin(school,email);
    const saveSchoolHavingNewAccount=useSaveNewSchoolHavingNewUserAsAdmin(school,accountHolder);
    const saveSchoolHandler=()=>{
        if(userHasAccount=='yes'){
            saveSchoolWithExistingAccount.registerSchool()
            .then(data=>toast(data.data.registerSchoolForExistingAccountHolder))
            .catch(err=>toast.error(err));
        }
        else{
            saveSchoolHavingNewAccount.registerSchool()
            .then(data=>toast(data.data.registerSchoolForNewAccountHolder))
            .catch(err=>toast.error(err));
        }
    }
    const [selectedProvinceId, setSelectedProvinceId] = useState<any>();
    const [selectedDistrictId, setSelectedDistrictId] = useState<any>();
    const [sectorList, setSectorList] = useState<any>([]);
    const [userHasAccount, setUserHasAccount] = useState('default');
    const findByEmailHandler = () => {
        findByEmail().then(data => { setUser(data.data.findAccountHolderByEmail); console.log(user) });
    }
    const findDistrict = (id: number | undefined) => {
        if (id != undefined) {
            setDistrictList(listOfLocationData[id].locationList);
            setSelectedDistrictId(undefined);
        }
    }
    const findListOfSectorWithInDistrict = (districtId: number) => {
        if (districtId != undefined) {
            setSectorList(districtList[districtId].locationList);
        }
    }

    const imgHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setSchool({ ...school, logo: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const profileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setAccountHolder({ ...accountHolder, profilePicture: reader.result as string })
            };
            reader.readAsDataURL(file);
        }
    }
    const newAccountHolder = <section>
        <Avatar className="m-auto mt-4" />
        <TextField label='Name' className="mb-3" onChange={(e) => setAccountHolder({ ...accountHolder, name: e.target.value })} fullWidth variant="standard" />
        <NativeSelect onChange={(e) => setAccountHolder({ ...accountHolder, gender: e.target.value })} fullWidth className="mb-3">
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
        </NativeSelect>
        <TextField label='Email' onChange={(e) => setAccountHolder({ ...accountHolder, email: e.target.value })} className="mb-3"  fullWidth variant="standard" />
        <TextField label='Phone Number' onChange={(e) => setAccountHolder({ ...accountHolder, phoneNumber: e.target.value })} className="mb-3"  fullWidth variant="standard" />
        <label htmlFor="">Profile Picture</label>
        <TextField type="file" className="mb-3" onChange={profileHandler} fullWidth variant="standard" />
        <label htmlFor="">Date of Birth</label>
        <TextField type="date" onChange={(e) => setAccountHolder({ ...accountHolder, dob: e.target.value })} className="mb-3"  fullWidth variant="standard" />
    </section>
    const userWithExistingAccount = <section>
        <TextField label='Enter email of user you want to make admin' onChange={(e) => setEmail(e.target.value)} fullWidth variant="standard" />
        <div className="modal-footer">
            <Search onClick={() => findByEmailHandler()} className="fs-2 p-1 bg-primary mt-2 text-white rounded-circle" />
        </div>
    </section>
    return <>
        <div className="p-4">
            <section>
                {school.logo != '' && <div className="col-sm-6  m-auto mb-4 row">
                    <div className="card p-0 rounded-0 border-0 col-6"><img src={school.logo} className="card-img rounded-0" /></div>
                    {user != undefined && user.profilePicture != undefined && <div className="card p-0 rounded-0 border-0 col-6"><img src={user.profilePicture} className="card-img rounded-0" /></div>}
                </div>}
            </section>
            <TextField className="m-auto form-control mb-3 " variant="standard" value={school.name} onChange={e => { setSchool({ ...school, name: e.target.value }) }} label="School Name" />
            <label htmlFor="label">School Logo</label>
            <input type="file" onChange={imgHandler} className="form-control mb-3  border border-dark rounded-0" />
            <div className="mb-3">
                <div className="mb-3">
                    <select onChange={(e) => { setSelectedProvinceId(Number(e.target.value)); findDistrict(Number(e.target.value)) }} className="form-select border border-dark rounded-0" >
                        <option value={undefined}>Select Province</option>
                        {
                            listOfLocationData.map((data: any, index: any) => {
                                return <option key={index} value={index}>{data.name}</option>
                            })
                        }
                    </select>
                </div>
                {selectedProvinceId != undefined &&
                    <div className="mb-3">
                        <select onChange={(e) => { setSelectedDistrictId(Number(e.target.value)); findListOfSectorWithInDistrict(Number(e.target.value)) }} className="form-select mb-3  border border-dark rounded-0" >
                            <option value={undefined}>Select District</option>
                            {
                                districtList.map((data: any, index: any) => {
                                    return <option key={index} value={index}>{data.name}</option>
                                })
                            }
                        </select>
                    </div>
                }
                {selectedDistrictId != undefined &&
                    <div className="mb-3">
                        <select onChange={(e) => setSchool({ ...school, locationId: Number(e.target.value) })} className="form-select  border border-dark rounded-0" >
                            <option value={undefined}>Select Sector</option>
                            {
                                sectorList.map((data: any, index: any) => {
                                    return <option key={index} value={data.id}>{data.name}</option>
                                })}
                        </select>
                    </div>
                }
                {school.locationId != 0 && <div>
                    <div className="fw-bold">Register admin for this school</div>
                    <div>
                        Does a user has account?{' '}
                        <button onClick={() => setUserHasAccount('yes')} className="border-0 bg-success text-white fw-bold">yes</button>
                        {' '}<button onClick={() => setUserHasAccount('no')} className="border-0 bg-primary text-white fw-bold">no</button>
                    </div>
                    {
                        userHasAccount == 'yes' ? userWithExistingAccount :
                            userHasAccount == 'no' ? newAccountHolder : ''
                    }
                    {user != undefined && user.profilePicture != undefined||userHasAccount=='no' && <div className="modal-footer">
                        <Button variant="contained" onClick={()=>saveSchoolHandler()} className="mt-2">Save</Button>
                    </div>}
                </div>}
            </div>
            <ToastContainer/>
        </div>
    </>
}