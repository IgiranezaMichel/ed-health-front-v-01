import { BarChart} from "@mui/x-charts"
  export const BAR_CHART=()=>{
    return(
        <section>

   <section>
   <BarChart
      series={[
        { data: [35, 44, 24, 34],label:'A' },
        { data: [51, 6, 49, 900] ,label:'B'},
        { data: [15, 25, 30, 50],label:'C'},
        { data: [60, 50, 15, 25],label:'D'},
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
   </section>
   </section>
    )
}