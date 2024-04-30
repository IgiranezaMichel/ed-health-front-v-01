/* eslint-disable @typescript-eslint/no-explicit-any */
import { HospitalMenu } from "../../MenuBarItems/HospitalMenu"
import { Navigation } from "../../components/default/Navigation"
import { BarChart } from "@mui/x-charts"
import { axisClasses } from '@mui/x-charts';
import { useHospitalTrainingApprovalStatusStatistic } from "../../controller/viewHooks/TrainingApplication/trainingApplication";
import { STATUS } from "../../enums/Status";
import { Card } from "@mui/material";
export const HospitalDashboard=()=>{
  const hospital=JSON.parse(String(localStorage.getItem("hospital")));
 const {triValueDto,responseReady}=useHospitalTrainingApprovalStatusStatistic(Number(hospital.id),"");
  const chartSetting = {
    yAxis: [
      {
        label: 'Ncnm Training Approval Status',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

// Extracting the array from the jsonData
const statusArray = triValueDto;

// Initialize an object to store grouped data
const groupedData:any = {};

// Iterate through the array to group data by axisLabel
statusArray.forEach((status:any) => {
    const { value, label, axisLabel } = status;
    if (!groupedData[axisLabel]) {
        groupedData[axisLabel] = {};
    }
    if (!groupedData[axisLabel][label]) {
        groupedData[axisLabel][label] = value;
    } else {
        groupedData[axisLabel][label] += value;
    }
});

// Convert groupedData object to an array
const groupedArray = Object.entries(groupedData).map(([axisLabel, labels]) => ({
    ...labels as any,
    axisLabel
}));


    return(
    <Navigation items={HospitalMenu}>
    <Card className="p-1">
      <div className="fw-bold mb-2">Ncnm Training Approval status </div>
    {responseReady&&<BarChart
      dataset={groupedArray}
      xAxis={[{ scaleType: 'band', dataKey: 'axisLabel' }]}
      series={[
        { dataKey: STATUS.APPENDING, label:STATUS.APPENDING },
        { dataKey: STATUS.APPROVE, label:STATUS.APPROVE },
        { dataKey: STATUS.CANCEL, label:STATUS.CANCEL },
      ]}
      {...chartSetting}
    />}
    </Card>
    </Navigation>)
}