import { DashboardCustomizeOutlined, Logout, PeopleAltOutlined, SchoolTwoTone, Settings} from "@mui/icons-material";
import { SideBarItem } from "../typeDefs/SideBarItem";

export const SchoolMenu: SideBarItem[] = [
    {
        name: 'Dashboard',
        link: '/school',
        MenuItemProps: <DashboardCustomizeOutlined/>
    },
    {
        name: 'Student',
        link: '/school/student',
        MenuItemProps: <PeopleAltOutlined/>
    },
    {
        name: 'School',
        link: '/school/activity',
        MenuItemProps: <SchoolTwoTone/>
    },
    {
        name: 'Settings',
        link: '/school/setting',
        MenuItemProps: <Settings/>
    },
    {
        name: 'logout',
        link: '/school/logout',
        MenuItemProps: <Logout/>
    },
]