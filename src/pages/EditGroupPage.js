import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import RestUserComponent from "../components/RestUserComponent"
import PresentUserComponent from "../components/PresentUserComponent"
import AllGroupComponent from "../components/AllGroupComponent"

const EditGroups=()=>{

    const token = localStorage.getItem('token')

    // const [groupId,setGroupId]=useState(null)

    const groupId=useSelector(state=>state.chat.groupId)

    // const [adminGroups,setGroupAdminGroups]=useState([])
    // const adminGroups=useSelector(state=>state.auth.adminGroups)

    const restUsers=useSelector(state=>state.auth.restUsers)
    const presentUsers=useSelector(state=>state.auth.presentUsers)

    // const [restUsers,setRestUsers]=useState([])

    // const [presentUsers,setPresentUsers]=useState([])


    
    return(
        <>
        <h1>All Groups</h1>
        <AllGroupComponent/>
        {restUsers.length>0 && <RestUserComponent users={restUsers} groupId={groupId}/>}
        {presentUsers.length>0 && <PresentUserComponent users={presentUsers} groupId={groupId}/>}
        
        </>
    )
}

export default EditGroups