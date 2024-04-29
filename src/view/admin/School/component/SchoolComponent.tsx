/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close, DataSaverOn, DeleteOutlineRounded,ListAlt,PinDrop, School, SchoolSharp } from "@mui/icons-material";
import { Button, Card,Dialog, Skeleton, Tooltip } from "@mui/material";
import { DashboardCard } from "../../../../components/default/DashboardCard";
import { SchoolFormModal } from "./schoolModal";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHospitalContext } from "../../../../context/hospitalContext";
export const SchoolComponent = (props: { accessedBy: string,children:ReactNode }) => {
    const navigation = useNavigate();
    const [addNewSchool,setAddNewSchool]=useState(false);
    const {data}=useHospitalContext();
    console.log(data)
      return (
        <>
            {data.schoolDataIsLoading && <div className="col-sm-8 m-auto">
                <div className="col-12 mt-5">
                    <Skeleton className="w-50 bg-primary mt-2" />
                    <Skeleton className="w-50 bg-primary mt-2" />
                    <Skeleton className=" bg-primary mt-2" />
                    <Skeleton className="bg-primary mt-2" />
                    <Skeleton className="bg-primary mt-2" />
                </div>
            </div>}
            {!data.schoolDataIsLoading && <div>
                <div className="row container-lg m-auto">
                    <span className="display-6 fw-bold mb-3" style={{ filter: 'drop-shadow(2px 3px grey)' }}>Manage School</span>
                    <section className="col-md-4">
                        <DashboardCard size={data.schoolSize} title="Total Schools" subtitleDescription="Total Schools" icon={<School />} />
                    </section>
                    <div className="container-lg mt-3">
                        <Button className="rounded-0 bg-primary text-white" onClick={()=>setAddNewSchool(true)}><DataSaverOn />
                        </Button>
                    </div>
                    {props.children}
                    <div className="row col-12 g-2 m-auto">
                        {
                            data.schoolList.map((data: any, index:number) => {
                                return <div className="col-sm-3 mb-3">
                                    <Card key={index} className=" p-0" elevation={6}>
                                        <div className="text-center">
                                            <img src={data.logo} className="text-center align-self-center" height={100} alt="" />
                                        </div>
                                        <Card elevation={4} className="border rounded-0 p-1">
                                            <p className="fw-bold"><small><SchoolSharp /> {data.name}</small></p>
                                            <div className="mb-1"><small>Total Faculty </small> 
                                            <small className="badge bg-primary">{data.facultyList.length}</small>
                                            </div>
                                            <div className="mb-1"><PinDrop /><small>{data.location.Location.Location.name} || {data.location.Location.name} || {data.location.name}</small></div>
                                            <div className="modal-footer">
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
                <Dialog maxWidth='xs' PaperProps={{className:'rounded-0 col-12'}} open={addNewSchool}>
                    <div className="p-3 sticky-top bg-white">Add new school <Close onClick={()=>setAddNewSchool(false)} className="float-end"/></div>
                    <SchoolFormModal/>
                </Dialog>
            </div>}
        </>
    );
};
