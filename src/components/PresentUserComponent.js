import axios from "axios"

import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const PresentUserComponent=(props)=>{

  const history=useHistory()

    const users=props.users

    const groupId=props.groupId

    let my_obj={}


  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    my_obj[user[0]]=false
  }

  const removeFromGroupHandler=async()=>{
    let keys=Object.keys(my_obj)
    let arr=keys.filter((key)=>{
      if(my_obj[key]==true){
        return key
      }
    })
    // console.log(arr)
    // console.log(groupNameRef.current.value)

    const new_obj = {
        group_Id: groupId,
        users: arr
  }

  const response = await axios.post('http://localhost:3000/group/removegroup', new_obj)
  console.log(response)
  props.handleCloseGroup()
  history.push('/')
  }

  const makeAdminOfGroupHandler=async()=>{
    let keys=Object.keys(my_obj)
    let arr=keys.filter((key)=>{
      if(my_obj[key]==true){
        return key
      }
    })
    // console.log(arr)
    // console.log(groupNameRef.current.value)

    const new_obj = {
        group_Id: groupId,
        users: arr
  }

  const response = await axios.post('http://localhost:3000/group/admingroup', new_obj)
  console.log(response)
  props.handleCloseGroup()
  history.push('/')
  }

  const onChangeHandler=(event)=>{
    // console.log(event.target.name)
    // console.log(event.target.value)
    // console.log(event.target.checked)
    my_obj[event.target.name]=event.target.checked
    // setGroupDetails(console.log(event))
    // console.log(my_obj)
  }

    return(
        <>
        {users.map((user)=>(
            <div>
            <label htmlFor={user.id}>{user[1]}</label>
            <input type="checkbox" id={user[0]} name={user[0]} onChange={onChangeHandler}/>
            </div>
          ))}
          <button onClick={removeFromGroupHandler}>Remove Them From Group</button>
          <button onClick={makeAdminOfGroupHandler}>Make them Admin Of Group</button>
        </>
    )
}

export default PresentUserComponent