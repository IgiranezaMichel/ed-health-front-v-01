import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Setting } from './components/default/Setting'
import { Logout } from './view/Logout'
import { AdminHome } from './view/admin'
import { HospitalManagement } from './view/admin/HospitalManagement'
import { SchoolDetail } from './view/admin/School/SchoolDetail'
import { SchoolManagement } from './view/admin/School'
import { UserManagement } from './view/admin/UserManagement'
import { Certificate } from './view/hospital/Certificate'
import { HospitalDashboard } from './view/hospital/HospitalDashboard'
import { HospitalNotification } from './view/hospital/HospitalNotification'
import { Job } from './view/hospital/Job/Job'
import { JobDetail } from './view/hospital/Job/JobDetail'
import { HospitalTraining } from './view/hospital/Training'
import { NcnmHospital } from './view/ncnm/Hospital'
import { HospitalDetail } from './view/ncnm/Hospital/HospitalDetail'
import { NcnmCertificate } from './view/ncnm/NcnmCertificate'
import { NcnmDashboard } from './view/ncnm/NcnmDashboard'
import { NcnmPayment } from './view/ncnm/Payment'
import { NcnmSchool } from './view/ncnm/School'
import { NcnmTraining } from './view/ncnm/Training'
import { SchoolDashBoard } from './view/school'
import { SchoolStudents } from './view/school/Student'
import { SchoolActivity } from './view/school/school'
import { Login } from './view/visitor/Login'
import { TrainingDetail } from './view/ncnm/Training/components/TrainingDetail'
import { HospitalTrainingDetail } from './view/hospital/Training/TrainingDetail'
import { TrainingApplicant } from './view/hospital/Training/TrainingApplicant'
import { TrainingApplicationDetail } from './view/hospital/Training/components/TrainingApplicantDetail'
import { Student } from './view/student'
import { StudentTraining } from './view/student/training'
import { JobPublished } from './view/student/job'
import { StudentCertificate } from './view/student/certificate'
import { TrainingCertificate } from './view/hospital/Certificate/index'
// import { TrainingApplicantDetail } from './view/hospital/Training/components/TrainingApplicantDetail'
function App() {
  return (
   <>
    <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/student' element={<Student/>}/>
      <Route path='/student/training' element={<StudentTraining/>}/>
      <Route path='/student/job' element={<JobPublished/>}/>
      <Route path='/student/certificate' element={<StudentCertificate/>}/>
      <Route path='/:name/setting' element={<Setting/>}/>
       <Route path='/admin' element={<AdminHome/>}/>  
      <Route path='/admin/users' element={<UserManagement/>}/>
      <Route path='/admin/school' element={<SchoolManagement/>}/>
      <Route path='/:user/school-detail/:id' element={<SchoolDetail/>}/>
      <Route path='/admin/hospital' element={<HospitalManagement/>}/> 
 {/* ncnm  */}
      <Route path='/ncnm' element={<NcnmDashboard/>}/>
      <Route path='/ncnm/school' element={<NcnmSchool/>}/>
      <Route path='/ncnm/hospital' element={<NcnmHospital/>}/>
      <Route path='/ncnm/training' element={<NcnmTraining/>}/>
      <Route path='/ncnm/training-detail/:trainingId' element={<TrainingDetail/>}/>
      <Route path='/ncnm/certificate' element={<NcnmCertificate/>}/>
      <Route path='/ncnm/payment' element={<NcnmPayment/>}/>
      <Route path='/ncnm/hospital-detail/:id' element={<HospitalDetail/>}/>

      {/* school */}
      <Route path='/school' element={<SchoolDashBoard/>}/>
      <Route path='/school/student' element={<SchoolStudents/>}/>
      <Route path='/school/activity' element={<SchoolActivity/>}/>
      <Route path='/hospital' element={<HospitalDashboard/>}/>
      <Route path='/hospital/training' element={<HospitalTraining/>}/>
      <Route path='/hospital/training-detail/:id' element={<HospitalTrainingDetail/>}/>
      <Route path='/hospital/job' element={<Job/>}/>
      <Route path='/hospital/training-applicant-detail/:trainingId' element={<TrainingApplicationDetail/>}/>
      <Route path='/hospital/:trainingId' element={<TrainingApplicant/>}/>
      <Route path='/hospital/job-detail/:id' element={<JobDetail/>}/>
      <Route path='/hospital/notification' element={<HospitalNotification/>}/>
      <Route path='/hospital/certificate' element={<Certificate/>}/>
      <Route path='/hospital/certificate/:trainingId' element={<TrainingCertificate/>}/>
      <Route path='/:name/logout' element={<Logout/>}/>
    </Routes>
 </Router>
   </>
  )
}

export default App
