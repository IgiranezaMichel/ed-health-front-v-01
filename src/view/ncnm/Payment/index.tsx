import { Button } from "@mui/material"
import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { Navigation } from "../../../components/default/Navigation"
import { ListAltRounded } from "@mui/icons-material"

 export const NcnmPayment=()=>{
    return<Navigation items={NcnmMenu}>
      <span className="display-6 fw-bold ">Payment</span>
      <div>
         <Button className="bg-primary text-white m-1"><ListAltRounded/>Recent payment certificate</Button>
         <Button className="bg-primary text-white m-1"><ListAltRounded/>Unpaid certificate</Button>
         
      </div>
    </Navigation>
 }