/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocationCitySharp, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import { AdminMenu } from "../../../MenuBarItems/AdminMenu";
import { DashboardCard } from "../../../components/default/DashboardCard";
import { Navigation } from "../../../components/default/Navigation";
import { useSchool } from "../../../controller/viewHooks/SchoolHooks";

export const SchoolDetail=()=>{
    const {id}=useParams();
    const {schoolDataIsLoading,schoolDetailList}=useSchool(Number(id));
    return(
        <Navigation items={AdminMenu} >
               {!schoolDataIsLoading&& <main>
                    <section className="row col-12 m-auto">
                    <Card className="col-sm-4"  elevation={3}>
                        <img className="card-img" src={schoolDetailList.logo} alt="" />
                        <div><School/> {schoolDetailList.name}</div>
                        <div><LocationCitySharp/> 
                        {schoolDetailList.location.Location.Location.name}/
                        {schoolDetailList.location.Location.name}/
                        {schoolDetailList.location.name}
                         </div>
                    </Card >
                    <Card elevation={3} className="col-sm-8">
                        <h3>School Admins</h3>
                    </Card>
                    </section>
                    <main className="mb-3 col-12 m-auto row g-2">
                    {schoolDetailList.facultyList.map((data:any)=>{
                        return(
                            
                                <div className="col-sm-4">
                                <DashboardCard title="Faculty" subtitleDescription={data.name}/>
                                </div>
                            
                        )
                    })}
                    </main>
                </main>}
        </Navigation>
    )
}