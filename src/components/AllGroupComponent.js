import { useSelector,useDispatch } from "react-redux"
import { authActions } from "../store/Auth"
import { chatActions } from "../store/Chat"
import axios from "axios"

const AllGroupComponent=()=>{

    const dispatch=useDispatch()

    const adminGroups=useSelector(state=>state.auth.adminGroups)

    const token=localStorage.getItem('token')

    const openGroupDetailsHandler=async(id)=>{
        // console.log(id)
        // setGroupId(id)
        dispatch(chatActions.setGroup(id))
        const users = await axios.get(`http://localhost:3000/user/getrestusers/${id}`)
        // console.log(users.data.Rest_users)
        // setRestUsers(users.data.Rest_users)
        dispatch(authActions.updateRestUsers(users.data.Rest_users))

        const PresentUsers = await axios.get(`http://localhost:3000/user/getpresentusers/${id}`, { headers: { "Authorization": token } })
        // console.log(PresentUsers.data.PresentUsers)
        // setPresentUsers(PresentUsers.data.PresentUsers)
        dispatch(authActions.updatePresentUsers(PresentUsers.data.PresentUsers))
    }


    return(
        <>
        {adminGroups.map((group)=>(
            <div>
                <button onClick={()=>{openGroupDetailsHandler(group.id)}}>{group.name}</button>
            </div>
        ))}
        </>
    )
}

export default AllGroupComponent