import { DashboardCustomizeOutlined, LocalHospitalOutlined, Logout, PeopleAltOutlined, School, Settings} from "@mui/icons-material";
import { SideBarItem } from "../typeDefs/SideBarItem";

export const AdminMenu: SideBarItem[] = [
    {
        name: 'Dashboard',
        link: '/admin',
        MenuItemProps: <DashboardCustomizeOutlined/>
    },
    {
        name: 'System User',
        link: '/admin/users',
        MenuItemProps: <PeopleAltOutlined/>
    },
    {
        name: 'Hospitals',
        link: '/admin/hospital',
        MenuItemProps: <LocalHospitalOutlined />
    },
    {
        name: 'School',
        link: '/admin/school',
        MenuItemProps: <School/>
    },
    {
        name: 'Setting',
        link: '/admin/setting',
        MenuItemProps: <Settings/>
    },
    {
        name: 'logout',
        link: '/admin/logout',
        MenuItemProps: <Logout/>
    },
]