/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close, DataSaverOn, DeleteOutlineRounded, Groups2, ListAlt, LockPersonRounded, PinDrop, School, SchoolSharp, Sort } from "@mui/icons-material";
import { Button, Card,Dialog, Pagination, Skeleton, Tooltip } from "@mui/material";
import { DashboardCard } from "../../../../components/default/DashboardCard";
import { SchoolFormModal } from "./schoolModal";
import { useState } from "react";
import { useSchoolPage } from "../../../../controller/viewHooks/SchoolHooks";
import { PaginationInput } from "../../../../typeDefs/PaginationInput";
import { useNavigate } from "react-router-dom";
export const SchoolComponent = (props: { accessedBy: string }) => {
    const navigation = useNavigate();
    const [addNewHospital,setAddNewHospital]=useState(false);
    const [page, setPage] = useState<PaginationInput>({
        pageNumber: 0,
        pageSize: 8,
        sort: "name"
    })
    const { schoolDataIsLoading, schoolList, schoolPageNumber, schoolSize, totalPage } = useSchoolPage(page);
    const handlePageSizeChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event;
        setPage({ ...page, pageNumber: value - 1 });
    };
      return (
        <>
            {schoolDataIsLoading && <div className="col-sm-8 m-auto">
                <div className="col-12 mt-5">
                    <Skeleton className="w-50 bg-primary mt-2" />
                    <Skeleton className="w-50 bg-primary mt-2" />
                    <Skeleton className=" bg-primary mt-2" />
                    <Skeleton className="bg-primary mt-2" />
                    <Skeleton className="bg-primary mt-2" />
                </div>
            </div>}
            {!schoolDataIsLoading && <div>
                <div className="row container-lg m-auto">
                    <span className="display-6 fw-bold mb-3" style={{ filter: 'drop-shadow(2px 3px grey)' }}>Manage School</span>
                    <section className="col-sm-4">
                        <DashboardCard size={schoolSize} title="Total Schools" subtitleDescription="Total Schools" icon={<School />} />
                    </section>
                    <div className="container-lg mt-3">
                        <Button className="rounded-0 bg-primary text-white" onClick={()=>setAddNewHospital(true)}><DataSaverOn />
                        </Button>
                    </div>
                    <div>  Page {schoolPageNumber + 1} out of {totalPage}  <span>
                        <select onChange={(e) => setPage({ ...page, pageSize: Number(e.target.value) })} className="p-1 mx-2"
                        >
                            <option value="8">8</option>
                            <option value="16">16</option>
                            <option value="24">24</option>
                            <option value="32">32</option>
                            <option value={schoolSize}>All</option>
                        </select>
                    </span>
                        <span className="float-end"> Sort by<select onChange={e => setPage({ ...page, sort: e.target.value })} className="custom-select p-1" name="" id="">
                            <option selected={page.sort == 'name' ? true : false} value={"name"}>Name</option>
                            <option selected={page.sort == 'location' ? true : false} value="location">Location</option>
                        </select><Sort /></span>
                        <Pagination
                            count={totalPage}
                            page={schoolPageNumber + 1}
                            onChange={handlePageSizeChange}
                        />
                    </div>
                    <div className="row col-12 g-2 m-auto">
                        {
                            schoolList.map((data: any, index) => {
                                return <div className="col-sm-3 mb-3">
                                    <Card key={index} className=" p-0" elevation={6}>
                                        <div className="text-center">
                                            <img src={data.logo} className="text-center align-self-center" height={100} alt="" />
                                        </div>
                                        <Card elevation={4} className="border rounded-0 p-1">
                                            <p className="fw-bold"><SchoolSharp /> {data.name}</p>
                                            <div className="mb-1"><b>Total Faculty </b> <span
                                                className="badge bg-primary">{data.facultyList.length}</span>
                                            </div>
                                            <div className="mb-1"><PinDrop />{data.location.Location.Location.name}/{data.location.Location.name}/{data.location.name}</div>
                                            <div><Groups2 />Total Student</div>
                                            <div className="modal-footer">
                                                <Tooltip placement="top" title={'create ' + data.name + " Admin"}>
                                                    <LockPersonRounded className="mx-2 mb-3 bg-primary rounded-2 p-1 text-light" />
                                                </Tooltip>
                                                <Tooltip placement="top" title={'View ' + data.name + " Detail"}>
                                                    <ListAlt onClick={() => navigation("/" + props.accessedBy + "/school-detail/" + data.id)} className="mx-2 mb-3 bg-success rounded-2 p-1 text-light" />
                                                </Tooltip>
                                                <Tooltip title={"Remove " + data.name} placement="top">
                                                    <DeleteOutlineRounded className="mx-2 mb-3 bg-danger rounded-2 p-1 text-light" />
                                                </Tooltip>
                                            </div>
                                        </Card>
                                    </Card>
                                </div>
                            })
                        }
                    </div>
                </div>
                <Dialog maxWidth='sm' PaperProps={{className:'rounded-0'}} open={addNewHospital}>
                    <div className="p-3 sticky-top bg-white">Add new school <Close className="float-end"/></div>
                    <SchoolFormModal/>
                </Dialog>
            </div>}
        </>
    );
};
