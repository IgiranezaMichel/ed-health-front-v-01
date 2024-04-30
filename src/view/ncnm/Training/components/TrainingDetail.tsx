/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useFindTrainingById } from "../../../../controller/viewHooks/training/useFindTrainingById";
import { Navigation } from "../../../../components/default/Navigation";
import { NcnmMenu } from "../../../../MenuBarItems/NcnmMenu";
import { Avatar, Box,  Button,  Card, Chip, CircularProgress, Dialog, SpeedDial, SpeedDialAction, SpeedDialIcon, Tab, Tooltip } from "@mui/material";
import { Close, DescriptionTwoTone, People, PersonPin, PhoneInTalkOutlined, ThumbDown, ThumbUp } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { useState } from "react";
import { useModifyTrainingApprovalStatus } from "../../../../controller/dmlHooks/Training/TrainingDao";
import { STATUS } from "../../../../enums/Status";
import { TabContext, TabList, TabPanel } from "@mui/lab";
export const TrainingDetail = () => {
  const { trainingId } = useParams();
  const { applicantList, isFindingTraining, trainerList, trainingDetail, refreshTrainingDetail } = useFindTrainingById(Number(trainingId));
  const [trainingStatus, setTrainingStatus] = useState('');
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event;
    setValue(newValue);
  }
  const { isProcessingRegisterTrainingStatus, saveTrainingStatusHandler, saveTrainingStatusResult } = useModifyTrainingApprovalStatus(Number(trainingId), trainingStatus);
  const saveUpdatesHandler = () => {
    if (trainingStatus != '') {
      saveTrainingStatusHandler();
      if (!isProcessingRegisterTrainingStatus) {
        alert(saveTrainingStatusResult); refreshTrainingDetail()
      }
    }
    else {
      alert('Please select training status')
    }
  }
  const dialog=<Dialog maxWidth='xs' PaperProps={{className:'col-12'}} open={open}>
    <div className="p-3 fw-bold">Ncnm Action on training <Close className="float-end" onClick={()=>setOpen(false)}/></div>
    <span className="p-3">Are you sure you want to <b>{trainingStatus}</b> this training?</span>
    <div className="modal-footer p-1">
      <Button variant="contained" onClick={()=>saveUpdatesHandler()}>Save Change</Button>
    </div>
  </Dialog>
  return (
    <Navigation items={NcnmMenu}>
      {isFindingTraining && <div>
        <CircularProgress />
      </div>}
      {
        !isFindingTraining &&
        <>
          <section className="row m-auto g-1 col-12 mb-4">
            <section className="col-md-4 d-flex justify-content-center align-items-center rounded-0">
              <Card className="border-o col-sm-12">
                <Tooltip className="" title={<img src={trainingDetail.hospital.logo} height={'100vh'} className="p-1" />}>
                  <div className="d-flex">
                    <Avatar src={trainingDetail.hospital.logo} className="p-1" />
                    <div className="mx-2 card d-flex justify-content-center border-0"><b>{trainingDetail.hospital.name}</b></div>
                  </div>
                </Tooltip>
                <div className="bg-light p-2">
                  <div className="mb-2"><CalendarIcon />{String(trainingDetail.hospital.timeStamp).split('T')[0]}</div>
                  <div className="mb-2"><DescriptionTwoTone />{trainingDetail.hospital.description}</div>
                </div>
              </Card>
            </section>
            <section className="col-md-8 d-flex justify-content-center align-items-center rounded-0">
              <Card className="col-sm-12">
                <div className="d-flex">
                  <Avatar src={trainingDetail.hospital.logo} className="p-1" />
                  <div className="mx-2 card d-flex justify-content-center border-0"><b>Training title:{trainingDetail.title}</b></div>
                </div>

                <div className="bg-light p-2">
                  <div className="mb-2">Ncnm approval : <b>{trainingDetail.ncnmApprovalStatus}</b></div>
                  <div className="mb-2">Deadline:{String(trainingDetail.deadline).split('T')[0]}</div>
                </div>
              </Card>
            </section>
          </section>
          <Card className="mt-3 rounded-0 mb-3" elevation={4}>
            <TabContext value={value}>
              <Box sx={{ border: 'none', borderColor: 'divider' }}>
                <TabList onChange={handleChange}>
                  <Tab label={<div><PersonPin /> Requirement</div>} value="1" />
                  <Tab label={<div>
                    <span className=" btn border-0 position-relative">
                      <People /> Trainers
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {trainerList.length}
                      </span>
                    </span>
                  </div>} value="2" />
                  <Tab label={<div>
                    <span className=" btn border-0 position-relative">
                      <People /> Applicant list
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                      {applicantList.length}
                      </span>
                    </span>
                  </div>} value="3" />
                </TabList>
              </Box>
              <TabPanel value="1" className="col-12">

                <div className="fw-bold italic">Description</div>
                <div>{trainingDetail.description}</div>
                <div className="fw-bold italic mb-3 mt-3">Requirement</div>
                <div dangerouslySetInnerHTML={{ __html: trainingDetail.trainingRequirement }}></div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  <span className="fw-bold fs-5 d-block">Trainer</span>
                  <div className="col-12 row m-auto g-1">
                    {trainerList.map((data: any) => {
                      return <Card className="p-3 row col-12 m-auto mt-3" elevation={4}>
                        <section className="col-md-6">
                          <section className='d-flex'>
                            <Tooltip arrow title={<img src={data.profilePicture} height={'100vh'} />}>
                              <Avatar className="bg-black card-img" src={data.profilePicture} />
                            </Tooltip>
                            <div className="card mx-2 d-flex justify-content-center border-0">
                              <div><b>{data.trainerTitle}</b> {data.name}</div>
                            </div>
                          </section>

                        </section>
                        <section className="col-md-3">
                          <div className="mt-2 ">
                            <PhoneInTalkOutlined />{data.phoneNumber}
                          </div>
                        </section>
                        <section className="col-md-3">
                          <Tooltip title={<div>
                            <div><b>{data.trainerTitle}</b> {data.name}</div>
                            <div>Signature</div>
                          </div>} className="float-end">
                            <div><img src={data.signature} height={30} /><br /></div>
                          </Tooltip>
                        </section>
                      </Card>
                    })}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3">
                {applicantList.length != 0 &&
                                    <div >
                                        display something
                                    </div>

                                }
                                {applicantList.length == 0 &&
                                    <div className="text-center">
                                      <Chip className="fw-bold  p-3" label=' -- No Applicant data found --'/>
                                    </div>

                                }
              </TabPanel>
            </TabContext>
          </Card>
        </>
      }
      <div className="col-sm-12 m-auto">
      <Box sx={{ height: 30, transform: 'translateZ(0px)', flexGrow: 1 }}className="fixed-bottom">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
          <SpeedDialAction arrow
            icon={<ThumbUp onClick={()=>{setTrainingStatus(STATUS.APPROVE);setOpen(true)}}/>}
            tooltipTitle={'Approve Training'}
          />
          <SpeedDialAction arrow
            icon={<ThumbDown onClick={()=>{setTrainingStatus(STATUS.CANCEL);setOpen(true)}}/>}
            tooltipTitle={'Cancel Training'}
          />
      </SpeedDial>
    </Box>
      </div>
      {dialog}
    </Navigation>
  )
}
