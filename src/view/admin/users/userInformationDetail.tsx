import {  Email, Person, Phone, Wc } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { useFindUserById } from '../../../controller/viewHooks/User/FindUserById';
import { CalendarIcon } from '@mui/x-date-pickers';

export default function UserInformationDetail(props: { userId: number }) {
    const { user, userHasFound } = useFindUserById(props.userId)
    return (
        <div>
            {!userHasFound && <div className='p-5 text-center'>
                <CircularProgress />
            </div>
            }
            {userHasFound && <section>
                <div className="card rounded-0 p-0 border-0">
                    <img src={user.profilePicture} className='card-img' alt="" />
                    <div className='mb-4'><Person/>{user.name}</div>
                    <div className='mb-4'><Wc/>{user.gender}</div>
                    <div className='mb-4'><Email/>{user.email}</div>
                    <div className='mb-4'><Phone/>{user.phoneNumber}</div>
                    <div className='mb-4'><CalendarIcon/>{user.dob}</div>
                </div>
            </section>}
        </div>
    )
}
