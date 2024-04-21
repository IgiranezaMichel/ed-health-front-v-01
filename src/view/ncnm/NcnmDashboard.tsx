import { PeopleAltOutlined } from "@mui/icons-material"
import { NcnmMenu } from "../../MenuBarItems/NcnmMenu"
import { DashboardCard } from "../../components/default/DashboardCard"
import { Navigation } from "../../components/default/Navigation"
import { useGetTotalAccountHolderByRole } from "../../controller/viewHooks/User/totalAccountHolderByRole"
import { Role } from "../../enums/Role"
import { useTotalHospital } from "../../controller/viewHooks/User/totalHospital"
import { useShowAllStudentStatisticsByStatus } from "../../controller/viewHooks/Student/ShowAllStudentStatusStatistics"
import { PIE_CHART_DEFAULT } from "../../components/default/PIECHART"
import { Card } from "@mui/material"

export const NcnmDashboard = () => {
    const { resultHasFound, total } = useGetTotalAccountHolderByRole(Role.STUDENT);
    const result = useTotalHospital();
    const { isLoadingStudentStatusStatistics, studentStatusStatistics } = useShowAllStudentStatisticsByStatus();
    return (
        <Navigation items={NcnmMenu}>
            {resultHasFound && result.resultHasFound && <main className="row col-12">
                <div className="col-sm-4">
                    <DashboardCard title="Available Hospital" icon={<PeopleAltOutlined />} subtitleDescription="Total available hospital" size={result.total} />
                </div>
                <div className="col-sm-4">
                    <DashboardCard title="Available students" icon={<PeopleAltOutlined />} subtitleDescription="Total available student" size={Number(total)} />
                </div>
            </main>}
            {!isLoadingStudentStatusStatistics && <section className="col-12 g-2 row m-auto mt-5">
                <Card className="col-sm-6 border border-3">
                    <div className="fw-bold fs-2 mb-2">Student Status</div>
                    <PIE_CHART_DEFAULT centerLabel="Student" items={studentStatusStatistics} />
                </Card>
                <Card className="col-sm-6 border border-3">
                    <div className="fw-bold fs-2 mb-2">Student Status</div>
                    <PIE_CHART_DEFAULT centerLabel="Student" items={studentStatusStatistics} />
                </Card>
            </section>}
        </Navigation>
    )
}