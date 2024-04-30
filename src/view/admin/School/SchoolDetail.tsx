/* eslint-disable @typescript-eslint/no-explicit-any */
import { Email, LocationCitySharp,LockPersonOutlined, People, Phone, School, Wc } from "@mui/icons-material";
import { Avatar, Box, Card, Chip, Tab, Tooltip } from "@mui/material";
import { useParams } from "react-router-dom";
import { AdminMenu } from "../../../MenuBarItems/AdminMenu";
import { DashboardCard } from "../../../components/default/DashboardCard";
import { Navigation } from "../../../components/default/Navigation";
import { useSchoolDetailById } from "../../../controller/viewHooks/SchoolHooks";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";

export const SchoolDetail=()=>{
    const {id}=useParams();
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event;
        setValue(newValue);
    }
    const {responseReady,schoolDetailObj}=useSchoolDetailById(Number(id));
    console.log(schoolDetailObj)
    return(
        <Navigation items={AdminMenu} >
               {responseReady&& <main>
                    <section className="col-12 m-auto">
                    <Card className="col-sm-4 mb-3 p-2"  elevation={3}>
                        <img className="float-end" height={'30vh'} src={schoolDetailObj.logo} alt="" />
                        <div><School/> {schoolDetailObj.name}</div>
                        <div><LocationCitySharp/> 
                        {schoolDetailObj.location.Location.Location.name} ||{' '}
                        {schoolDetailObj.location.Location.name} ||{' '}
                        {schoolDetailObj.location.name}
                         </div>
                    </Card >
                    <Card elevation={3} className="col-12 rounded-0">
                    <TabContext value={value}>
                    <Box sx={{ border: 'none', borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label={<div><School /> Faculty</div>} value="1" />
                                    <Tab label={<div><School /> Department</div>} value="2" />
                                    <Tab label={<div><People /> Student</div>} value="3" />
                                    <Tab label={<div><LockPersonOutlined /> Admins</div>} value="4" />
                    </TabList>
                    <TabPanel value="1">
                    <main className="mb-3 col-12 m-auto g-2">
                    {schoolDetailObj.facultyList.map((data:any)=>{
                        return(
                                <div className="col-sm-6">
                                <DashboardCard title="Faculty" subtitleDescription={data.name}/>
                                </div>
                        )
                    })}
                    {schoolDetailObj.facultyList.length==0&&<div className="text-center">
                        <Chip color="info" label='No data found' className="m-auto"/>
                    </div>}
                    </main>
                    </TabPanel>
                    <TabPanel value="2">
                    <main className="mb-3 col-12 m-auto g-2">
                    {schoolDetailObj.facultyList.map((data:any)=>{
                        return(
                                <div className="col-sm-6">
                                    <div>{data.name}</div>
                                    {data.departmentList!=undefined&&data.departmentList.length!=0&&
                                    data.departmentList.map(
                                        (result:any)=>{
                                            return <DashboardCard title="Department" key={result.id} subtitleDescription={result.name}/>
                                        }
                                    )}
                                </div>
                        )
                    })}
                    {schoolDetailObj.facultyList.length==0&&<div className="text-center">
                        <Chip color="info" label='No data found' className="m-auto"/>
                    </div>}
                    </main>
                    </TabPanel>
                    <TabPanel value="3">d</TabPanel>
                    <TabPanel value="4">
                        <div className="fw-bold py-2 pb-3">
                        {schoolDetailObj.name} Admins
                        </div>
                        {
                            schoolDetailObj.schoolAdminList!=undefined&&
                            schoolDetailObj.schoolAdminList.length!=0&&
                            schoolDetailObj.schoolAdminList.map((data:any)=>{
                                return <Card className="border mb-2 row col-12 rounded-0 p-2" elevation={0}>
                                         <div className="col-md-6">
                                            <div className="d-flex">
                                            <Tooltip title={<img src={data.user.profilePicture} height={'150vh'}/>}>
                                                <div className="card d-flex border-0 justify-content-center"><Avatar className="bg-black" src={data.user.profilePicture}/></div>
                                            </Tooltip>
                                            <div className="card d-flex justify-content-center border-0 mx-2">{data.user.name}</div>
                                            </div>
                                            <div className="d-flex mt-2 border-0">
                                                <Wc/><span>{data.user.gender}</span>
                                                </div>
                                         </div>
                                         <div className="col-md-3">
                                            <div className="mb-2"><Email/>{data.user.email}</div>
                                            <div className="mb-2"><Phone/>{data.user.phoneNumber}</div>
                                         </div>
                                         <div className="col-md-3">
                                            <div className="mb-2"><b>Position: </b>{data.position}</div>
                                            <div className="mb-2"><b>Status: </b>{data.status}</div>
                                         </div>
                                    </Card>
                            })
                            
                        }
                        {schoolDetailObj.schoolAdminList!=undefined&&
                            schoolDetailObj.schoolAdminList.length==0&&
                            <Chip color="info" label='No data found' className="m-auto"/>
                            }
                    </TabPanel>
                    </Box>
                    </TabContext>
                    </Card>
                    </section>
                </main>}
        </Navigation>
    )
}