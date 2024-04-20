import { useMyPagination_ } from "./Index";

function Demo() {
    const page=useMyPagination_();
    page.user.sort='Michael'
    console.log(page)
  return (
    <div>
        {page.user.pageNumber}
    </div>
  )
}
export const Example=()=>{
    const myPage= useMyPagination_();
    myPage.user.pageNumber=20
    myPage.user.sort='Joel Kim'
    console.log(myPage)
     return <>
     <input type="text"   onChange={(e)=>myPage.user.sort=e.target.value} id="" />
     {myPage.user.sort}
     </>
 }
export default Demo
