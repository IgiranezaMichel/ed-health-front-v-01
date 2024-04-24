import { Autorenew, Person, Phone, School, Wc } from '@mui/icons-material'
import { CalendarIcon } from '@mui/x-date-pickers'
export const  UserDetail=()=> {
  return (
    <div>
    <section className="card rounded-0 border-0">
        <img src="/public/vite.svg" alt="" className="card-img" />
        <div className="mb-3 mt-5"><Person /></div>
        <div className="mb-3"><Wc /></div>
        <div className="mb-3"><CalendarIcon /></div>
        <div className="mb-3"><Phone /></div>
        <div className="mb-3"><School /></div>
        <div className="mb-3"><School /></div>
        <div className="mb-3"><Autorenew /></div>
    </section>
</div>
  )
}
