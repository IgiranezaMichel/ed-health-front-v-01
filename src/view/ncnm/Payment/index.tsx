import { Button } from "@mui/material"
import { NcnmMenu } from "../../../MenuBarItems/NcnmMenu"
import { Navigation } from "../../../components/default/Navigation"
import { ListAltRounded } from "@mui/icons-material"
import { Payment } from "./components/payment"

export const NcnmPayment = () => {
   return <Navigation items={NcnmMenu}>
      <span className="display-3 fw-bold ">Payment</span>
      <div>
         <Button variant="contained" className="fw-bolder m-1 rounded-0"><ListAltRounded />Recent payment certificate</Button>
         <Button variant="contained" className="text-white fw-bolder m-1 rounded-0"><ListAltRounded />Unpaid certificate</Button>
      </div>
      <Payment />
   </Navigation>
}