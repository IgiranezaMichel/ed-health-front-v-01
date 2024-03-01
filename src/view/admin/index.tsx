import { LockPerson, School } from "@mui/icons-material";
import { Card } from "@mui/material";
import { AdminMenu } from "../../MenuBarItems/AdminMenu";
import { DashboardCard } from "../../components/default/DashboardCard";
import { Navigation } from "../../components/default/Navigation";
import { PIE_CHART_DEFAULT } from "../../components/default/PIECHART";
import { useShowSchoolAdminStatusStatistics } from "../../controller/viewHooks/SchoolAdmin/SchoolAdminStatistics";
import { useShowAllStudentStatisticsByStatus } from "../../controller/viewHooks/Student/ShowAllStudentStatusStatistics";

export const AdminHome = () => {
    const { isLoadingSchoolAdminStatistics, schoolAdminStatusStatistics } = useShowSchoolAdminStatusStatistics();
    const { isLoadingStudentStatusStatistics, studentStatusStatistics } = useShowAllStudentStatisticsByStatus();
    console.log(studentStatusStatistics)
    // const{hospitalAdminStatusStatistics,isLoadingSchoolAdminStatistics}=useShowHospitalAdminStatusStatistics();
    return (
        <Navigation items={AdminMenu}>
            <div className="col-sm-12 m-auto g-1 row">
                <div className="col-sm-6">
                    <Card className="border border-2">
                    <DashboardCard icon={<LockPerson className="fs-1 float-end"/>} title="Total School Admins" size={4} subtitleDescription="Total Admin"/>
                    {!isLoadingSchoolAdminStatistics && <PIE_CHART_DEFAULT centerLabel="School Admin" items={schoolAdminStatusStatistics} />}
                    </Card>
                </div>
                <div className="col-sm-6">
                   <Card className="border border-2">
                   <DashboardCard icon={<School className="fs-1 float-end"/>} title="Total School" size={4} subtitleDescription="Total Student"/>
                    {!isLoadingStudentStatusStatistics && <PIE_CHART_DEFAULT centerLabel="Student" items={studentStatusStatistics} />}
                   </Card>
                </div>
            </div>
        </Navigation>
    )
}