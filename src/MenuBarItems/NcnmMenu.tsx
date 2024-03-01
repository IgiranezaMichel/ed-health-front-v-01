import { DashboardCustomizeOutlined, Logout, Settings, Money, LocalHospitalSharp, LaptopMacSharp, BookmarkSharp, SchoolSharp} from "@mui/icons-material";
import { SideBarItem } from "../typeDefs/SideBarItem";

export const NcnmMenu: SideBarItem[] = [
    {
        name: 'Dashboard',
        link: '/ncnm',
        MenuItemProps: <DashboardCustomizeOutlined/>
    },
    {
        name: 'School',
        link: '/ncnm/school',
        MenuItemProps: <SchoolSharp/>
    },
    {
        name: 'Hospital',
        link: '/ncnm/hospital',
        MenuItemProps:<LocalHospitalSharp/>
    },
    {
        name: 'Training',
        link: '/ncnm/training',
        MenuItemProps:<LaptopMacSharp/>
    },
    {
        name: 'Certificate',
        link: '/ncnm/certificate',
        MenuItemProps:<BookmarkSharp/>
    },
    {
        name: 'Payment',
        link: '/ncnm/payment',
        MenuItemProps:<Money/>
    },
    {
        name: 'Settings',
        link: '/ncnm/setting',
        MenuItemProps: <Settings/>
    },
    {
        name: 'logout',
        link: '/ncnm/logout',
        MenuItemProps: <Logout/>
    },
]