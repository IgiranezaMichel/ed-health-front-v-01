import { useSchool } from "../../controller/viewHooks/SchoolHooks";
import { useFindHospitalById } from "../../controller/viewHooks/useHospital";
import { useFindUserById } from "../../controller/viewHooks/User/FindUserById";

export const Login = () => {
  const { user, userHasFound } = useFindUserById(52);
  const { schoolDataIsLoading, schoolDetailList } = useSchool(1);
  const { hospitalDetail, isProcessingHospitalData } = useFindHospitalById(1);
  console.log(hospitalDetail)
  if (!schoolDataIsLoading && schoolDetailList != null) localStorage.setItem("school", JSON.stringify(schoolDetailList));
  if (userHasFound && user != null) localStorage.setItem("userData", JSON.stringify(user));
  if (!isProcessingHospitalData) localStorage.setItem("hospital", JSON.stringify({
    id:hospitalDetail.id,
    logo:hospitalDetail.logo,
    location:hospitalDetail.location
  }));
  return (
    <main style={{ backgroundImage: 'url(/visitor/bg-img.png)', backgroundPosition: 'fixed', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', width: '100vw', height: '100vw' }} className="fixed-top overflow-auto">
      <section className="d-flex justify-content-center align-content-center">
        <div className="col-md-8 row py-5">
          <div className="card col-sm-6 d-flex justify-content-center align-content-center rounded-0 border-0">
            <div className="col-lg-10 m-auto ">
              <span className="display-6 fw-bold d-block mb-4">Login</span>
              <div className="mb-2">
                <input className="bg-info-subtle border w-100" type="text" placeholder="National Id" />
              </div>
              <div className="mb-2">
                <input className="bg-info-subtle border w-100" type="text" placeholder="Email" />
              </div>
              <div className="mb-3">
                <input className="bg-info-subtle border w-100" type="text" placeholder="Password" />
              </div>
              <button type="button" className="d-block btn w-100 text-white fw-bold" style={{ backgroundColor: '#1B484B' }}>SIGN</button>
            </div>
          </div>
          <div className="card col-sm-6 p-2 border-0 rounded-0">
            <img src="/visitor/login-img.jpg" className="card-img rounded-0" />
          </div>
        </div>
      </section>
    </main>
  )
}