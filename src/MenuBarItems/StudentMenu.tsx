import { BookmarkSharp, DashboardCustomizeOutlined, LaptopMacSharp, Logout,Settings, WorkHistoryOutlined} from "@mui/icons-material";
import { SideBarItem } from "../typeDefs/SideBarItem";

export const StudentMenu: SideBarItem[] = [
    {
        name: 'Dashboard',
        link: '/student',
        MenuItemProps: <DashboardCustomizeOutlined/>
    },
    {
        name: 'Certificate',
        link: '/student/certificate',
        MenuItemProps: <BookmarkSharp/>
    },
    {
        name: 'Training',
        link: '/student/training',
        MenuItemProps: <LaptopMacSharp/>
    },
    {
        name: 'Job',
        link: '/student/job',
        MenuItemProps: <WorkHistoryOutlined/>
    },
    {
        name: 'Setting',
        link: '/student/setting',
        MenuItemProps: <Settings/>
    },
    {
        name: 'logout',
        link: '/student/logout',
        MenuItemProps: <Logout/>
    },
]