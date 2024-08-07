const LoggedInUsersComponent=(props)=>{
    const loggedInUsers=props.loggedInUsers
    console.log(loggedInUsers)

    return(
        <>
        {loggedInUsers.length>0 && loggedInUsers.map((loggedInUser)=>(
            <div>
                {loggedInUser.name} Joined
            </div>
        ))}
        </>
    )
}

export default LoggedInUsersComponent