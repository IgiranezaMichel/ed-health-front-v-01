import { useMutation } from "@apollo/client";
import { WorkHistoryOutlined } from "@mui/icons-material";
import { TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { Modal } from "../../../../components/default/Modal";
import { Toast } from "../../../../components/default/Toast";
import { jobInputValidation } from "../../../../controller/validation/JobValidation";
import { JobStatus } from "../../../../enums/JobStatus";
import { REGISTER_JOB } from "../../../../graphQl/mutation/JobMutation";
import { JobInput } from "../../../../typeDefs/JobInput";
import { ToastProps } from "../../../../typeDefs/ToastProps";
import JoditEditor from 'jodit-react';
export const JobModal = () => {
  const [saveJobDataMutation]=useMutation(REGISTER_JOB)
  const [toastProps,setToastProps]=useState<ToastProps>({
    message:'',
    open:false,
    severity:"success"
  });
  const [job, setJob] = useState<JobInput>({
    deadline: '',
    description: '',
    hospitalId: 1,
    id: 0,
    picture: '',
    title: '',
    status:JobStatus.ACTIVE,
    numberOfEmployee:0,
    jobRequirement:''
  });
  const [jobDataHasSaved,setJobDataHasSaved]=useState(false);
  useEffect(
    ()=>{

    },[toastProps]
  )
  const imgHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
            setJob({...job,picture:reader.result as string})
            console.log(job.picture)
      };
      reader.readAsDataURL(file);  
  }
  }
  const handleSnackbarClose = () => {
    setToastProps({
        open:false,
        message:'',
        severity:"error"
    });
  };
  const jobInputValidationHandler=async()=>{
    const result=jobInputValidation(job);
    setToastProps({
        open:!result.isOkay,
        message:result.message,
        severity:"error"
    });
    if(result.isOkay){
     await saveJobDataMutation({variables:{input:job}}).then(data=>{
        setJobDataHasSaved(true)
        console.log(data)
        setToastProps({
            message:data.data.registerJob+' Saved successfully',
            open:true,
            severity:'success',
        })
      }).catch(err=>err);
    }
  }
  return (
    <>
      <Modal id="createJob"
        title="Create new Job"
        modalClass="col-md-8"
        titleBarClass="bg-success rounded-0 text-light"
        titleIcon={<WorkHistoryOutlined className="mx-2" />}
        actionBtn={
        <div>
          {!jobDataHasSaved?<button className="btn btn-primary fw-bold" onClick={()=>jobInputValidationHandler()}>Submit</button>:
          <button>Saving...</button>
          }
        </div>
        }
        >
        <div className=" p-3">
          <TextField value={job.title} id="outlined-basic" className="form-control mb-3" label="Job Title" variant="outlined"
            onChange={(e) => setJob({ ...job, title: e.target.value })} />
          <TextareaAutosize onChange={(e) => setJob({ ...job, description: e.target.value })} className="form-control mb-3" aria-label="minimum height" minRows={2} placeholder="Job Description" />
          <TextField id="outlined-basic" value={job.numberOfEmployee} onChange={(e) => { setJob({ ...job, numberOfEmployee:Number(e.target.value) })}} type="number" label="Number of employee" className="form-control mb-3" variant="outlined" />
          <span>Deadline</span>
          <TextField id="outlined-basic" value={job.deadline} onChange={(e) => { setJob({ ...job, deadline: e.target.value })}} type="datetime-local" className="form-control mb-3" variant="outlined" />
          <input type="file" onChange={imgHandler}/>
          <JoditEditor value="" onChange={text=>setJob({...job,jobRequirement:text})}>
            
          </JoditEditor>
        </div>
      </Modal>
      {/*  */}
      <Toast
        open={toastProps.open}
        severity={toastProps.severity}
        message={toastProps.message}
        onClose={handleSnackbarClose}
      />
    </>
  )
}
