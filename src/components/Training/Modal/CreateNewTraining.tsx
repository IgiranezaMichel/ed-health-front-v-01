import { useMutation } from "@apollo/client";
import { Loupe } from "@mui/icons-material";
import { CircularProgress, Skeleton, TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { TrainingInputValidation } from "../../../controller/validation/TrainingValidation";
import { useFilterLocation } from "../../../controller/viewHooks/Location/useFilterLocation";
import { REGISTER_TRAINING } from "../../../graphQl/mutation/TrainingMutation";
import { TrainingInput } from "../../../typeDefs/TrainingInput";
import { Toast } from "../../default/Toast";
type Severity={severity:"error"|"success"|"info"|"warning",message:string,open:boolean}
export const CreateNewTraining = () => {
    const {listOfLocationData,isLoading}=useFilterLocation("name","PROVINCE");
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [districtList,setDistrictList]=useState<any>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selecteProvinceId,setSelectedProvinceId]=useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selecteDistrictId,setSelectedDistrictId]=useState<any>();
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [sectorList,setSectorList]=useState<any>([]);
    const [isSavingData,setIsSavingData]=useState(false);
    const hospital=JSON.parse(String(localStorage.getItem("hospital")));
    const [training, setTraining] = useState<TrainingInput>({
        id: 0, 
        deadline:'',
        description: '',
        ncnmApprovalStatus: 'appending',
        title: '',
        hospitalId:Number(hospital.id),
        locationId: 0,
        trainerId: 0
    });
    const [showSnackbar, setShowSnackbar] = useState<Severity>({
        open:false,
        message:"warning",
        severity:"warning"
    });
    const handleSnackbarClose = () => {
        setShowSnackbar({
            open:false,
            message:'',
            severity:"error"
        });
      };
    useEffect(
        ()=>{
            const fetchDate=async()=>{
                return listOfLocationData;
            }
            fetchDate();
        }
    )
    const [saveRegisterTraining]=useMutation(REGISTER_TRAINING);
    const findDistrict=(id:number|undefined)=>{
      if(id!=undefined){
        setDistrictList(listOfLocationData[id].locationList);
        setSelectedDistrictId(undefined);
      }
    }
    const findListOfSectorWithInDistrict=(distictId:number)=>{
        if(distictId!=undefined){
            setSectorList(districtList[distictId].locationList);
          }
    }
    const submitTrainingDataHandler=async()=>{
        const result=TrainingInputValidation(training);
        setShowSnackbar({
            open:!result.isOkay,
            message:result.message,
            severity:"error"
        });
        if(result.isOkay){
            setIsSavingData(true)
         await saveRegisterTraining({variables:{input:training}}).then(data=>{
            setIsSavingData(false)
            setShowSnackbar({
                message:data.data.registerTraining.title+' Saved successfully',
                open:true,
                severity:'success',
            })
          });
        }
    }
    return (
        <>
           {isLoading&&
           <div>
             <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
            </div>}
            {
                !isLoading&& <div className="modal fade" id="modalId" data-bs-backdrop="static" data-bs-keyboard="false" style={{maxHeight:'95%',marginTop:'5%'}}
                role="dialog" aria-labelledby="modalTitleId" aria-hidden="false" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md " role="document" >
                    <div className="modal-content rounded-0 bg-white ">
                        <div className="modal-header sticky-top top-0" style={{zIndex:3}}>
                            <h5 className="modal-title fw-bold" id="modalTitleId"><Loupe /> <b>New Training</b></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="overflow-auto">
                            <div className=" p-3">
                                <TextField value={training.title} id="outlined-basic" className="form-control mb-3" label="Title" variant="outlined"
                                    onChange={(e) => setTraining({ ...training, title: e.target.value })}
                                    
                                />
                                <TextareaAutosize onChange={(e)=>setTraining({...training,description:e.target.value})} className="form-control mb-3" aria-label="minimum height" minRows={2} placeholder="Training Description" />
                                <span>Deadline</span>
                                <TextField id="outlined-basic" value={training.deadline} onChange={(e)=>{setTraining({...training,deadline:e.target.value});alert(e.target.value)}} type="datetime-local" className="form-control mb-3" variant="outlined" />
                                <div className="mb-3">
                                    <select onChange={(e)=>{setSelectedProvinceId(Number(e.target.value));findDistrict(Number(e.target.value))}} className="form-select form-select-lg" >
                                        <option value={undefined}>Select Province</option>
                                        {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            listOfLocationData.map((data:any,index:any)=>{
                                                return<option key={index} value={index}>{data.name}</option>
                                            })
                                        }
                                 </select>
                                </div>
                                {selecteProvinceId!=undefined&&
                                    <div className="mb-3">
                                    <select onChange={(e)=>{setSelectedDistrictId(Number(e.target.value));findListOfSectorWithInDistrict(Number(e.target.value))}}  className="form-select form-select-lg" >
                                        <option  value={undefined}>Select District</option>
                                        {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            districtList.map((data:any,index:any)=>{
                                                return<option key={index} value={index}>{data.name}</option>
                                            })
                                        }
                                 </select>
                                </div>
                                }
                                {selecteDistrictId!=undefined&&
                                    <div className="mb-3">
                                    <select onChange={(e)=>setTraining({...training,locationId:Number(e.target.value)})}  className="form-select form-select-lg" >
                                        <option value={undefined}>Select Sector</option>
                                        {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            sectorList.map((data:any,index:any)=>{
                                                return<option key={index} value={data.id}>{data.name}</option>
                                            })
                                        }
                                 </select>
                                </div>
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                           {!isSavingData?<button type="button" onClick={()=>submitTrainingDataHandler()} className="btn btn-primary fw-bold">Save</button>
                            :<CircularProgress disableShrink/>}
                         </div>
                    </div>
                </div>
            </div>
            }
           <Toast
        open={showSnackbar.open}
        severity={showSnackbar.severity}
        message={showSnackbar.message}
        onClose={handleSnackbarClose}
      />
        </>
    )
}
