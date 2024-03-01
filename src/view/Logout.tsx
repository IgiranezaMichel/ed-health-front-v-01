import { Button, Card } from "@mui/material"
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate=useNavigate();
  const user = JSON.parse(String(localStorage.getItem("userData")));
  function logoutHandler(): void {
   localStorage.clear();
   navigate("/");
  }

  return (
    <Card className="col-sm-12 card d-flex justify-content-center align-content-center align-items-center"
      style={{ height: '100dvh' }}>
      <section className="">
        Are you sure <b>{user.name}</b> you want to log out?
        <div className="text-center m-4">
           <Button onClick={()=>logoutHandler()} className="bg-success text-white fw-bolder">Logout</Button> 
        </div>
      </section>
    </Card>
  )
}
