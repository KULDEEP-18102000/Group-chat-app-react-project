import axios from "axios"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const RestUserComponent=(props)=>{

  const history=useHistory()

    const users=props.users
    console.log(users)

    const groupId=props.groupId

    let my_obj={}


  for (let index = 0; index < users.length; index++) {
    const user = users[index];
    my_obj[user[0]]=false
  }

  const addGroupHandler=async()=>{
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

  console.log(new_obj)

  const response = await axios.post('http://localhost:3000/group/addgroup', new_obj)
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
          <button onClick={addGroupHandler}>Add Them In Group</button>
        </>
    )
}

export default RestUserComponent