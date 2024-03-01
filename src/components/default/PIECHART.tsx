/* eslint-disable @typescript-eslint/no-explicit-any */
import {PieChart, useDrawingArea } from "@mui/x-charts"
import { styled } from '@mui/material/styles';
import { FC } from "react";
import { PieChartData } from "../../typeDefs/PiechartData";
  

type StudentStatisticsByStatus={
    items:PieChartData[],
    centerLabel:string
}
 export const PIE_CHART_DEFAULT: FC<StudentStatisticsByStatus>=(props)=>{
    const item:PieChartData[]=props.items;
    const data =item;
      const size = {
        width: 370,
        height: 200,
      };
      const StyledText= styled('text')(({ theme }) => ({
        fill: theme.palette.text.primary,
        textAnchor: 'middle',
        dominantBaseline: 'central',
        fontSize: 20,
      }));
    function PieCenterLabel({ children }: { children: React.ReactNode }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
          </StyledText>
        );
      }
    return(
 <>
   {props.items&&<section>
   <PieChart series={[{ data, innerRadius: 80 }]}  {...size}>
      <PieCenterLabel>{props.centerLabel}</PieCenterLabel>
    </PieChart>
   </section>}
   <section className="col-sm-7">
   </section>
   </>
    )
}