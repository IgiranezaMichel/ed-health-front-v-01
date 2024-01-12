import { Button } from "@mui/material"

export const CertifiedStudentList=(props:{certificateId:number})=>{
return(
    <>
    <Button className="bg-primary">
        Certified
    </Button>
    <Button>
        Appending
    </Button>
    <Button>
        Rejection
    </Button>
    </>
)
}