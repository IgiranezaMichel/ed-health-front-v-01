import { Card } from "@mui/material"
import { FC, ReactNode } from "react"
type item={
    icon?:ReactNode,
    title?:string,
    subtitleDescription?:string,
    size?:number
}
export const DashboardCard:FC<item>=(item)=>{
    return(
        <Card className="border" elevation={3}>
        <div className="p-2">
          {item.icon}
          <span className="fw-bolder">{item.title} </span>
          <div>
            {item.subtitleDescription} <span className="badge bg-primary">
                {item.size}
                </span>
          </div>
        </div>
      </Card>
    )
}