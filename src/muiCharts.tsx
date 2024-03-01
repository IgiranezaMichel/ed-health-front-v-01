import { BarChart, PieChart, useDrawingArea } from "@mui/x-charts"
import { styled } from '@mui/material/styles';
const data = [
    { value: 5, label: 'A' },
    { value: 10, label: 'B' },
    { value: 15, label: 'C' },
    { value: 270, label: 'D' },
  ];
  
  const size = {
    width: 200,
    height: 200,
  };
const StyledText= styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));
export const MuiCharts=()=>{
    function PieCenterLabel({ children }: { children: React.ReactNode }) {
        const { width, height, left, top } = useDrawingArea();
        return (
          <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
          </StyledText>
        );
      }
    return(
        <section className="row col-12 m-auto py-4">
   <section className="row col-sm-5">
   <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Center label</PieCenterLabel>
    </PieChart>
   </section>
   <section className="col-sm-7">
   <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
   </section>
   </section>
    )
}