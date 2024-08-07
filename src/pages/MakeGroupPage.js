import { useSelector } from "react-redux"
import { useState,useRef } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import axios from "axios"

const MakeGroupPage=()=>{

  const groupNameRef=useRef()

  const history=useHistory()

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
  // console.log(response)
  history.push('/')
  }

    return(
        <>
        <h1>Make Your Group</h1>
        <div>
          <label htmlFor='group-name'>Your Group Name</label>
          <input type='text' id='group-name' name='group_name' ref={groupNameRef} required />
          {loggedInUsers.map((loggedInUser)=>(
            <div>
            <label htmlFor={loggedInUser.id}>{loggedInUser.name}</label>
            <input type="checkbox" id={loggedInUser.id} name={loggedInUser.id} value={my_obj[loggedInUser.id]} onChange={onChangeHandler}/>
            </div>
          ))}
        </div>
        <button onClick={submitHandler}>Make Group</button>
        </>
    )
}

export default MakeGroupPage