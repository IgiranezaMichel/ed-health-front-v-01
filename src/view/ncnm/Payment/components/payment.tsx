import { Person } from "@mui/icons-material"
import { Card } from "@mui/material"

export const Payment=()=>{
    return(
        <>
        <span className="d-block display-6 fw-bolder mt-4">Recent certificate</span>
       <Card elevation={5} className="mb-3 row col-sm-12 m-auto">
        <div className="col-md-2">
            User img
        </div>
        <div className="col-md-4">
            <div><Person/></div>
        </div>
       </Card>
        </>
    )
}