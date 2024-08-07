const ChatsComponent=(props)=>{

    const chats=props.chats

    return(
        <>
        {chats.map((chat)=>(
            <div>
                {chat.message!=null && chat.message}
                {chat.url!=null && <img src={chat.url} height="100" width="100"/>}
                {/* <h5>{chat.message}</h5> */}
            </div>
        ))}
        </>
    )
}

export default ChatsComponent