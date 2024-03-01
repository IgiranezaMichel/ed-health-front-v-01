/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@apollo/client";
import { DataSaverOn, DeleteOutlineRounded, Groups2, ListAlt, LockPersonRounded, PinDrop, School, SchoolOutlined, SchoolRounded, SchoolSharp, Sort } from "@mui/icons-material";
import { Button, Card, CircularProgress, Pagination, Skeleton, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SchoolInputValidation } from "../controller/validation/SchoolValidation";
import { useFilterLocation } from "../controller/viewHooks/Location/useFilterLocation";
import { useSchoolPage } from "../controller/viewHooks/SchoolHooks";
import { REGISTER_SCHOOL } from "../graphQl/mutation/SchoolMutation";
import { PaginationInput } from "../typeDefs/PaginationInput";
import { SchoolInput } from "../typeDefs/SchoolInput";
import { ToastProps } from "../typeDefs/ToastProps";
import { DashboardCard } from "./default/DashboardCard";
import { Modal } from "./default/Modal";
import { Toast } from "./default/Toast";
export const SchoolComponent = (props: { accessedBy: string }) => {
    const { listOfLocationData } = useFilterLocation("name", "PROVINCE");
    const navigation = useNavigate();
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0,
        pageSize: 8,
        sort: "name"
    })
    const { schoolDataIsLoading, schoolList, schoolPageNumber, schoolSize, totalPage } = useSchoolPage(page);
    const [school, setSchool] = useState<SchoolInput>({
        id: 0,
        locationId: 0,
        logo: '',
        name: ''
    });
    const [toastProps, setToastProps] = useState<ToastProps>({
        message: '',
        open: false,
        severity: 'success'
    })
    useEffect(
        () => {

        }, [toastProps, school, page]
    )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [districtList, setDistrictList] = useState<any>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selecteProvinceId, setSelectedProvinceId] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selecteDistrictId, setSelectedDistrictId] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sectorList, setSectorList] = useState<any>([]);
    const [isSavingData, setIsSavingData] = useState(false);
    const [registerSchool] = useMutation(REGISTER_SCHOOL);
    useEffect(
        () => {

        }, [isSavingData, registerSchool, page]
    )
    const handlePageSizeChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };
    // 
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
    const registerSchoolHandler = async () => {
        const result = SchoolInputValidation(school);
        setToastProps({
            open: !result.isOkay,
            message: result.message,
            severity: "error"
        });
        if (result.isOkay) {
            setIsSavingData(true)
            setPage({ ...page, pageNumber: 2 });
            await registerSchool({ variables: { input: school } }).then(data => {
                setIsSavingData(false),
                    setPage({ ...page, pageNumber: 1 });
                setToastProps({
                    message: data.data.registerTraining.title + ' Saved successfully',
                    open: true,
                    severity: 'success',
                })
            });
        }
    }
    const [schoolAdmin, setSchoolAdmin] = useState({
        schoolId: 0,
        schoolName: '',
        logo: '',
    })
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
    const addSchoolAdmin = <Modal actionBtn={<button className="btn btn-primary text-white fw-bold">Submit</button>} id="add-school-admin" title="Add School Admin">
        <section className="p-3">
            <div className="rounded-circle m-auto" style={{ width: '150px', height: '90px' }}>
                <img src={schoolAdmin.logo} className="card-img" style={{ objectFit: 'cover' }} />
            </div>
            <div className="m-5 text-center"><span><SchoolOutlined /> {schoolAdmin.schoolName}</span></div>
            <div className="mt-5">
                <TextField className="form-control mt-3 border border-dark" label="Enter user email" />
            </div>
        </section>
    </Modal>
    const schoolModal = () => {
        return <Modal
            id="register_school"
            titleIcon={<SchoolRounded className="mx-3 fs-1" />}
            title="Register new School"
            actionBtn={<div >
                {!isSavingData ? <button type="button" onClick={() => registerSchoolHandler()} className="btn btn-primary fw-bold">Save</button>
                    : <CircularProgress disableShrink />}
            </div>}>
            <div className="p-2">
                <TextField className="m-auto form-control mb-3 " value={school.name} onChange={e => { setSchool({ ...school, name: e.target.value }) }} label="School Name" />
                <label htmlFor="label">School Logo</label>
                <input type="file" onChange={imgHandler} className="form-control mb-3  border border-dark rounded-0" />
                <div className="mb-3">
                    <div className="mb-3">
                        <select onChange={(e) => { setSelectedProvinceId(Number(e.target.value)); findDistrict(Number(e.target.value)) }} className="form-select border border-dark rounded-0" >
                            <option value={undefined}>Select Province</option>
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                listOfLocationData.map((data: any, index: any) => {
                                    return <option key={index} value={index}>{data.name}</option>
                                })
                            }
                        </select>
                    </div>
                    {selecteProvinceId != undefined &&
                        <div className="mb-3">
                            <select onChange={(e) => { setSelectedDistrictId(Number(e.target.value)); findListOfSectorWithInDistrict(Number(e.target.value)) }} className="form-select mb-3  border border-dark rounded-0" >
                                <option value={undefined}>Select District</option>
                                {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    districtList.map((data: any, index: any) => {
                                        return <option key={index} value={index}>{data.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    }
                    {selecteDistrictId != undefined &&
                        <div className="mb-3">
                            <select onChange={(e) => setSchool({ ...school, locationId: Number(e.target.value) })} className="form-select  border border-dark rounded-0" >
                                <option value={undefined}>Select Sector</option>
                                { // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    sectorList.map((data: any, index: any) => {
                                        return <option key={index} value={data.id}>{data.name}</option>
                                    })}
                            </select>
                        </div>
                    }
                </div>
            </div>
        </Modal>
    }

    return (
        <>
            {schoolDataIsLoading && <div className="col-sm-8 m-auto">
                <div className="col-12 mt-5">
                    <Skeleton className="w-50 bg-primary mt-2" />
                    <Skeleton className="w-50 bg-primary mt-2" />
                    <Skeleton className=" bg-primary mt-2" />
                    <Skeleton className="bg-primary mt-2" />
                    <Skeleton className="bg-primary mt-2" />
                </div>
            </div>}
            {!schoolDataIsLoading && <div>
                <div className="row container-lg m-auto">
                    <span className="display-6 fw-bold mb-3" style={{ filter: 'drop-shadow(2px 3px grey)' }}>Manage School</span>
                    <section className="col-sm-4">
                        <DashboardCard size={schoolSize} title="Total Schools" subtitleDescription="Total Schools" icon={<School />} />
                    </section>
                    <div className="container-lg mt-3">
                        <Button data-bs-toggle="modal"
                            data-bs-target="#register_school" className="rounded-0 bg-primary text-white"><DataSaverOn />
                        </Button>
                    </div>
                    <div>  Page {schoolPageNumber + 1} out of {totalPage}  <span>
                        <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                        >
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="24">24</option>
                            <option value="32">32</option>
                            <option value={schoolSize}>All</option>
                        </select>
                    </span>
                        <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                            <option selected={page.sort == 'name' ? true : false} value={"name"}>Name</option>
                            <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                        </select><Sort /></span>
                        <Pagination
                            count={totalPage}
                            page={schoolPageNumber + 1}
                            onChange={handlePageSizeChange}
                        />
                    </div>
                    <div className="row col-12 g-2 m-auto">
                        {
                            schoolList.map((data: any, index) => {
                                return <div className="col-sm-3 mb-3">
                                    <Card key={index} className=" p-0" elevation={6}>
                                        <div className="text-center">
                                            <img src={data.logo} className="text-center align-self-center" height={100} alt="" />
                                        </div>
                                        <Card elevation={4} className="border rounded-0 p-1">
                                            <p className="fw-bold"><SchoolSharp /> {data.name}</p>
                                            <div className="mb-1"><b>Total Faculty </b> <span
                                                className="badge bg-primary">{data.facultyList.length}</span>
                                            </div>
                                            <div className="mb-1"><PinDrop />{data.location.Location.Location.name}/{data.location.Location.name}/{data.location.name}</div>
                                            <div><Groups2 />Total Student</div>
                                            <div className="modal-footer">
                                                <Tooltip placement="top" title={'create ' + data.name + " Admin"}>
                                                    <LockPersonRounded data-bs-toggle="modal" data-bs-target="#add-school-admin" onClick={() => {
                                                        setSchoolAdmin({ schoolId: data.id, logo: data.logo, schoolName: data.name });
                                                    }} className="mx-2 mb-3 bg-primary rounded-2 p-1 text-light" />
                                                </Tooltip>
                                                <Tooltip placement="top" title={'View ' + data.name + " Detail"}>
                                                    <ListAlt onClick={() => navigation("/" + props.accessedBy + "/school-detail/" + data.id)} className="mx-2 mb-3 bg-success rounded-2 p-1 text-light" />
                                                </Tooltip>
                                                <Tooltip title={"Remove " + data.name} placement="top">
                                                    <DeleteOutlineRounded className="mx-2 mb-3 bg-danger rounded-2 p-1 text-light" />
                                                </Tooltip>
                                            </div>
                                        </Card>
                                    </Card>
                                </div>
                            })
                        }
                    </div>
                </div>
                {schoolModal()}
                {addSchoolAdmin}
                <Toast
                    open={toastProps.open}
                    severity={toastProps.severity}
                    message={toastProps.message}
                />
            </div>}
        </>
    );
};
