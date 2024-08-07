import { authActions } from "../store/Auth"
import { useDispatch } from "react-redux"

const NavBarComponent=()=>{

  const dispatch=useDispatch()

  const logOutHandler=()=>{
    dispatch(authActions.logOut())
  }

    return(
        <>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
   
    <button onClick={logOutHandler} class="btn btn-outline-success" type="submit">Log Out</button>
  </div>
</nav>
        </>
    )
}

export default NavBarComponent