import { Route, Switch, Link } from 'react-router-dom';
import EditGroups from './EditGroupPage';
import ChatsComponent from '../components/ChatsComponent';
import MessageFormComponent from '../components/MessageFormComponent';
import NewMessageForm from '../components/Layouts/NewMessageForm';
import SideNav from '../components/Layouts/SideNav';
import { Box, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { useState,useEffect,useRef } from 'react';
import axios from 'axios';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { authActions } from "../store/Auth"
import { chatActions } from '../store/Chat';
import { io } from 'socket.io-client';
import { PencilSimple } from "@phosphor-icons/react";
import IconButton from '@mui/material/IconButton';
import RestUserComponent from '../components/RestUserComponent';
import PresentUserComponent from '../components/PresentUserComponent';

const socket = io('http://localhost:5000'); 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const DashboardPage = ({ match }) => {

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [openGroup, setOpenGroup] = useState(false);
  const handleOpenGroup = () => setOpenGroup(true);
  const handleCloseGroup = () => setOpenGroup(false);


  const groupNameRef=useRef()

  

  const loggedInUsers=useSelector(state=>state.auth.loggedInUsers)

  console.log(loggedInUsers)

  let my_obj={}

  // my_obj= loggedInUsers.map((user)=>{
  //   return my_obj[user.name]=false
  // })

  for (let index = 0; index < loggedInUsers.length; index++) {
    const element = loggedInUsers[index];
    my_obj[element.id]=false
  }

  console.log(my_obj)


  const onChangeHandler=(event)=>{
    // console.log(event.target.name)
    // console.log(event.target.value)
    // console.log(event.target.checked)
    my_obj[event.target.name]=event.target.checked
    // setGroupDetails(console.log(event))
    // console.log(my_obj)
  }

  const submitHandler=async()=>{
    // console.log(my_obj)
    let keys=Object.keys(my_obj)
    let arr=keys.filter((key)=>{
      if(my_obj[key]==true){
        return key
      }
    })
    // console.log(arr)
    // console.log(groupNameRef.current.value)

    const new_obj = {
      group_name: groupNameRef.current.value,
      users: arr
  }

  const token = localStorage.getItem('token')
  const response=await axios.post('http://localhost:3000/group/creategroup',new_obj,{ headers: { "Authorization": token } })
  handleClose()
  // console.log(response)
//   history.push('/')
  }

    const dispatch=useDispatch()

    const history=useHistory()

    const [groups,setGroups]=useState([])

    const [chats,setChats]=useState([])

    const groupId=useSelector(state=>state.chat.groupId)

    const token=localStorage.getItem('token')

    const restUsers=useSelector(state=>state.auth.restUsers)
    const presentUsers=useSelector(state=>state.auth.presentUsers)

    const openGroupDetailsHandler=async(event,id)=>{
        event.stopPropagation()
        handleOpenGroup()
        console.log(id)
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
        console.log("called")

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

    return (
        <>
{/* modal for opening create new Group */}
<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Make Your Group
          </Typography>
          <label htmlFor='group-name'>Your Group Name:</label>
          <input type='text' id='group-name' name='group_name' ref={groupNameRef} required />
          {loggedInUsers.map((loggedInUser)=>(
            <div>
            <label htmlFor={loggedInUser.id}>{loggedInUser.name}</label>
            <input type="checkbox" id={loggedInUser.id} name={loggedInUser.id} value={my_obj[loggedInUser.id]} onChange={onChangeHandler}/>
            </div>
          ))}
          <Button variant='contained' onClick={submitHandler}>Make Group</Button>
        </Box>
      </Modal>

{/* Modal for opening editing the group */}
      <Modal
        open={openGroup}
        onClose={handleCloseGroup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {restUsers.length>0 && <RestUserComponent users={restUsers} groupId={groupId} handleCloseGroup={handleCloseGroup}/>}
        {presentUsers.length>0 && <PresentUserComponent users={presentUsers} groupId={groupId} handleCloseGroup={handleCloseGroup}/>}
        </Box>
      </Modal>


        <Stack direction="row" sx={{ width: "100%" }}>
            <SideNav />
            <Box
                sx={{
                    height: "100vh",
                    width: 300,
                    backgroundColor: "#FFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.50)",
                    margin:"2px",
                    padding:"2px"
                }}
            >
                <Stack
                    height={"100%"}
                    maxHeight={"100vh"}
                    width= {"auto"}
                >
                    <Box sx={{
                        margin:"2px"
                    }}>
                    <Button onClick={handleOpen} variant="contained">Create New Group</Button>
                    </Box>

                    <Divider />
                   
                    {groups.map((group)=>(
            // <div>
            //     <button onClick={()=>{fetchGroupChatAndFiles(group.groupId)}}>{group.name}</button>
            // </div>
            <Box
            sx={{
                height: 50,
                    width: "100%",
                    backgroundColor: "#CCC",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.50)",
                    cursor:"pointer",
                    margin:"2px"
            }}
            onClick={()=>{fetchGroupChatAndFiles(group.groupId)}}
            >
                <Stack direction="row" sx={{
                    alignItems:"center",
                    justifyContent:"space-between"
                }}>
                    <Typography variant="h6" component="h6">
                {group.name}
</Typography>
<IconButton onClick={(event)=>{openGroupDetailsHandler(event,group.groupId)}}>
<PencilSimple size={32} />
</IconButton>

                </Stack>
                
                {/* <button onClick={()=>{fetchGroupChatAndFiles(group.groupId)}}>{group.name}</button> */}
            </Box>
        ))}
                    

                    {/*  */}
                    {/* <ChatFooter /> */}
                </Stack>
            </Box>
            <Stack  sx={{ flexGrow: 1,  height: "100%" }}>
            <Box
                sx={{
                    height: "100vh",
                    width: "100%",
                    backgroundColor: "#FFF",
                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.50)",
                    marginTop:"2px",
                    padding:"3px"
                }}
            >
                <Stack
                    height={"100%"}
                    maxHeight={"100vh"}
                    width= {"auto"}
                    justifyContent={"space-between"}
                >
                    <Stack sx={{overflowY: "scroll"}}>
                   {groupId!=null && chats.length>0 && <ChatsComponent chats={chats}/>}
                   </Stack>
                   {groupId!=null &&  <NewMessageForm/>}
                </Stack>
            </Box>
            </Stack>
        </Stack>
        </>
    )
}

export default DashboardPage