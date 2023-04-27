import { Button } from "@mui/material"
import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { Navigation } from "../../../components/default/Navigation"
import { List, PeopleAltOutlined } from "@mui/icons-material"
import { Certificate } from "./components/Certificate"

export const NcnmCertificate = () => {
    return (
        <Navigation items={NcnmMenu}>
            <span className="display-6 fw-bold">Certificate</span>
            <div>
                <Button className="bg-info text-light fw-bold rounded-0 m-1"><List className="text-light" />Certificate</Button>
                <Button className="bg-info text-light fw-bold rounded-0 m-1"><PeopleAltOutlined />Certified Users</Button>
            </div>
            <div className="m-auto">
                <Certificate />
            </div>
        </Navigation>
    )
}