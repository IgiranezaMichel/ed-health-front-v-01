import { DashboardCustomizeOutlined, Logout, Settings,LaptopMacSharp, BusinessCenter} from "@mui/icons-material";
import { SideBarItem } from "../typeDefs/SideBarItem";

export const HospitalMenu: SideBarItem[] = [
    {
        name: 'Dashboard',
        link: '/hospital',
        MenuItemProps: <DashboardCustomizeOutlined/>
    },
    {
        name: 'Training',
        link: '/hospital/training',
        MenuItemProps:<LaptopMacSharp/>
    },
    {
        name: 'Job',
        link: '/hospital/job',
        MenuItemProps:<BusinessCenter/>
    },

    {
        name: 'Settings',
        link: '/hospital/setting',
        MenuItemProps: <Settings/>
    },
    {
        name: 'logout',
        link: '/hospital/logout',
        MenuItemProps: <Logout/>
    },
]