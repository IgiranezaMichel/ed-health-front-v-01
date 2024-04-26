/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFilterLocation } from "../../../../controller/viewHooks/Location/useFilterLocation";
import { REGISTER_SCHOOL } from "../../../../graphQl/mutation/SchoolMutation";
import { SchoolInput } from "../../../../typeDefs/SchoolInput";
// import { ToastProps } from "../../../../typeDefs/ToastProps";
import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useFindAccountHolderByEmail } from "../../../../controller/dmlHooks/user";
export const SchoolFormModal = () => {
    const { listOfLocationData } = useFilterLocation("name", "PROVINCE");
    const [email,setEmail]= useState('');
    const [user,setUser]=useState<any>({});
    const {findByEmail}=useFindAccountHolderByEmail(email);
   
    const [school, setSchool] = useState<SchoolInput>({
        id: 0,
        locationId: 0,
        logo: '',
        name: ''
    });
    // const [toastProps, setToastProps] = useState<ToastProps>({
    //     message: '',
    //     open: false,
    //     severity: 'success'
    // })
    // useEffect(
    //     () => {

    //     }, [toastProps, school]
    // )
    const [districtList, setDistrictList] = useState<any>([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState<any>();
    const [selectedDistrictId, setSelectedDistrictId] = useState<any>();
    const [sectorList, setSectorList] = useState<any>([]);
    const [registerSchool] = useMutation(REGISTER_SCHOOL);
    const findByEmailHandler=()=>{
        findByEmail().then(data=>{setUser(data.data.findAccountHolderByEmail);console.log(user)});
    }
    useEffect(
        () => {

        }, [registerSchool]
    )
    const findDistrict = (id: number | undefined) => {
        if (id != undefined) {
            setDistrictList(listOfLocationData[id].locationList);
            setSelectedDistrictId(undefined);
        }
    }
    const findListOfSectorWithInDistrict = (distictId: number) => {
        if (distictId != undefined) {
            setSectorList(districtList[distictId].locationList);
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
    return <>
        <div className="p-2">
            <section>
                {school.logo!=''&&<div className="col-sm-6  m-auto mb-4 row">
                    <div className="card p-0 rounded-0 border-0 col-6"><img src={school.logo} className="card-img rounded-0" /></div>
                    {user!=undefined&&user.profilePicture!=undefined&&<div className="card p-0 rounded-0 border-0 col-6"><img src={user.profilePicture} className="card-img rounded-0" /></div>}
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
                {school.locationId!=0&&<div>
                    <TextField label='Enter email of user you want to make admin' onChange={(e)=>setEmail(e.target.value)} fullWidth variant="standard"/>
                    <div className="modal-footer">
                    <Search onClick={()=>findByEmailHandler()} className="fs-2 p-1 bg-primary mt-2 text-white rounded-circle"/>
                    </div>
                    {user!=undefined&&user.profilePicture!=undefined&&<div className="modal-footer">
                        <Button variant="contained" className="mt-2">Save</Button>
                    </div>}
                    </div>}
            </div>
        </div>
    </>
}