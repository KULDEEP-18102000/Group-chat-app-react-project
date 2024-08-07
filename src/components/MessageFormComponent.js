import { useRef,useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const MessageFormComponent=()=>{

    const groupId=useSelector(state=>state.chat.groupId)
    console.log(groupId)

    const messageRef=useRef()

    const [selectedFile, setSelectedFile] = useState(null);

    const sendMessage=async()=>{
        const token = localStorage.getItem('token')
        console.log("clicked")
        const my_obj = {
            message: messageRef.current.value
        }
        console.log("groupId---",groupId)
        const message = await axios.post(`http://localhost:3000/chat/createmessage/${groupId}`, my_obj, { headers: { "Authorization": token } })
        console.log(message.data.chat)
        messageRef.current.value=""
        socket.emit("send-message", message.data.chat)
    }

    const fileHandler=async(event)=>{
        const img = event.target.files[0]

                        const Data = new FormData();
                        Data.append('groupId', groupId)
                        Data.append('img', img)

                        const token = localStorage.getItem('token')
                        const response = await axios.post(`http://localhost:3000/file/createfile`, Data, { headers: { "Authorization": token } })
                        console.log(response.data)
                        socket.emit("image", response.data.file);
    }
     
    return(
        <>
        <label htmlFor='message'>Message:</label>
        <input type='text' id='message' name='message' ref={messageRef}/>
        <button  type="submit" onClick={sendMessage}>Send</button><br></br>
        <input type='file' id='file' name='file' onChange={fileHandler}/>
        </>
    )
}

export default MessageFormComponent