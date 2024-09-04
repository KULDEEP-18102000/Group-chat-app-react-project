import { useState,useEffect } from "react"
import axios from "axios"
import LoggedInUsersComponent from "../components/LoggedInUsersComponent"
import NavBarComponent from "../components/NavbarComponent"
import { authActions } from "../store/Auth"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import AllGroupComponent from "../components/AllGroupComponent"
import MessageFormComponent from "../components/MessageFormComponent"
import ChatsComponent from "../components/ChatsComponent"
import SideBarGroups from "../components/SideBarGroups"
// import { useState } from "react"
import { chatActions } from "../store/Chat"
import { io } from 'socket.io-client';
import Stack from '@mui/material/Stack';
import '../App.css';
import Box from '@mui/material/Box';

const socket = io('http://localhost:5000'); 

const HomePage=()=>{

    const dispatch=useDispatch()

    const history=useHistory()

    const [groups,setGroups]=useState([])

    const [chats,setChats]=useState([])

    const groupId=useSelector(state=>state.chat.groupId)

    // const [files,setFiles]=useState([])

    const routeToMakeGroupPage=()=>{
        history.push('/makeGroup')
    }

    const routeToGroupSettingPage=()=>{
        history.push('/editGroup')
    }

    const loggedInUsers=useSelector(state=>state.auth.loggedInUsers)
    console.log(loggedInUsers)

    // const [loggedInUsers,setLoggedInUsers]=useState([])
    const token=localStorage.getItem('token')

    socket.on('receive-message', (message) => {
        console.log(message)
        const current_chats=[...chats]
        console.log(current_chats)
        current_chats.push(message)
        console.log(current_chats)
        setChats(current_chats)
        // setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("receive-image", image => {
        console.log(image)
        const current_chats=[...chats]
        console.log(current_chats)
        current_chats.push(image)
        console.log(current_chats)
        setChats(current_chats)
    })

    useEffect(()=>{

        

        const getGroups=async()=>{
            const token = localStorage.getItem('token')
            const Groups = await axios.get('http://localhost:3000/group/getallgroups', { headers: { "Authorization": token } })
        // console.log(Groups.data.groupIds)
        console.log(Groups)
        let groups=[]
        for (let index = 0; index < Groups.data.groupIds.length; index++) {
            const element = Groups.data.groupIds[index];
            element.name=Groups.data.groupNames[index]
            groups.push(element)
        }
        console.log(groups)
        setGroups(groups)
        }

        const getLoggedInUsers=async()=>{
            const allLoggedInUsers = await axios.get('http://localhost:3000/user/getallloggedinusers', { headers: { "Authorization": token } })
            // console.log(allLoggedInUsers)
            dispatch(authActions.updateLoggedInUsers(allLoggedInUsers.data.loggedinusers))
            // setLoggedInUsers(allLoggedInUsers.data.loggedinusers)
        }

        const fetchAdminGroups=async()=>{
            const token = localStorage.getItem('token')
            const Groups = await axios.get('http://localhost:3000/group/getAllAdmingroups', { headers: { "Authorization": token } })
            console.log(Groups)
            let groups=[]
            for (let index = 0; index < Groups.data.groupIds.length; index++) {
                const element = Groups.data.groupIds[index];
                element.name=Groups.data.groupNames[index]
                groups.push(element)
            }
            console.log(groups)
            // setGroupAdminGroups(groups)
            dispatch(authActions.updateAdminGroups(groups))
        }
        fetchAdminGroups()

        getGroups()
        getLoggedInUsers()
    },[])

    

    const fetchGroupChatAndFiles=async(id)=>{

        // fetchChatsHandler(id)
        // fetchFilesHandler(id)

        dispatch(chatActions.setGroup(id))

        const allChats = await axios.get(`http://localhost:3000/chat/getallchatsofgroup/${id}`)
        console.log(allChats)
        
        const files = await axios.get(`http://localhost:3000/file/getallfiles/${id}`)
        console.log(files.data.files)

        const new_chats=[]

        allChats.data.chats.map((chat)=>{
            new_chats.push(chat)
        })

        files.data.files.map((file)=>{
            new_chats.push(file)
        })
        console.log(new_chats)
        // new_chats.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
        // console.log(new_chats)

        setChats(new_chats)
    }
    
    return(
        <div>
            <NavBarComponent/>
            {/* <Stack direction="row"> */}
            {/* <SideBarGroups/> */}
            <Box component="section" sx={{ width: '100%' }}>
            <h1>View All Groups</h1>
            <button onClick={routeToMakeGroupPage}>Make Group</button>
            <button onClick={routeToGroupSettingPage}>Group Settings</button>
            <LoggedInUsersComponent loggedInUsers={loggedInUsers}/>
            {/* <AllGroupComponent/> */}
            <div>
                
            {groups.map((group)=>(
            <div>
                <button onClick={()=>{fetchGroupChatAndFiles(group.groupId)}}>{group.name}</button>
            </div>
        ))}
        </div>
        {groupId!=null && <MessageFormComponent/>}
            
            {groupId!=null && chats.length>0 && <ChatsComponent chats={chats}/>}
    </Box>
            {/* </Stack> */}
            
        </div>
    )
}

export default HomePage