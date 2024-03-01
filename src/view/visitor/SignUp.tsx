
export const SignUp=()=>{
    return(
        <main style={{backgroundImage:'url(/visitor/bg-img.png)',backgroundPosition:'fixed',backgroundRepeat:'no-repeat',backgroundSize:'cover',backgroundAttachment:'fixed',height:'100vw'}} className="overflow-auto">
                <section className="d-flex justify-content-center align-content-center mb-5 mt-5 overflow-auto">
                  <div className="col-md-8 row py-5 mb-5 overflow-auto">
                  <div className="card col-sm-6 p-2 border-0 rounded-0">
                        <img src="/visitor/signup-img.jpg" className="card-img rounded-0"/>
                    </div>
                  <div className="card col-sm-6 d-flex justify-content-center align-content-center rounded-0 border-0">
                        <div className="col-lg-10 m-auto ">
                           <span className="fs-4 fw-bold d-block mb-4">Create an Account</span>
                           <div className="mb-2">
                           <input className="bg-info-subtle border w-100" type="text" placeholder="National Id"/>
                           </div>
                           <div className="mb-2">
                           <input className="bg-info-subtle border w-100" type="text" placeholder="Email"/>
                           </div>
                           <div className="mb-3">
                           <input className="bg-info-subtle border w-100" type="text" placeholder="Password"/>
                           </div>
                           <div className="mb-2">
                           <input className="bg-info-subtle border w-100" type="text" placeholder="National Id"/>
                           </div>
                           <div className="mb-2">
                           <input className="bg-info-subtle border w-100" type="text" placeholder="Email"/>
                           </div>
                           <div className="mb-3">
                           <input className="bg-info-subtle border w-100" type="text" placeholder="Password"/>
                           </div>
                           <button type="button" className="d-block btn w-100 text-white fw-bold" style={{backgroundColor:'#1B484B'}}>SIGN</button>
                        </div>
                    </div>
                  </div>
                </section>  
        </main>
    )
}