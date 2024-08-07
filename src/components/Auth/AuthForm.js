import { useState, useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
// import expenseContext from '../../store/expense-context';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import { authActions } from '../../store/Auth';


const AuthForm = () => {

  // const ctx=useContext(expenseContext)
const history=useHistory()

const dispatch=useDispatch()

const baseURL=useSelector(state=>state.auth.baseURL)
  
  const [user,setUser]=useState({
    returnSecureToken:true,
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    confirmPassword:""
  })

  const [isLogin,setIsLogin]=useState(false)

  const [loading,setLoading]=useState(false)

  const switchAuthModeHandler=()=>{
    setIsLogin(!isLogin)
  }


  const addUser=async(e)=>{

    if(isLogin==false){
      if(user.password!=user.confirmPassword){
        alert('Password and Confirm Password are not same')
    }else{

        setLoading(true)
    e.preventDefault()
    console.log(user)

    const response= await fetch(`${baseURL}/user/signup`,{
      method:'POST',
      body:JSON.stringify({
        name:user.name,
        email:user.email,
        phoneNumber:user.phoneNumber,
        password:user.password,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })

    if(!response.ok){
      const res=await response.json()
      setLoading(false)

      console.log(res)
      let errorMessage="Something Went Wrong"
      if(res && res.error && res.error.message){
        errorMessage=res.error.message
      }
      alert(errorMessage);
    }
    
    
    
    
    
    
    console.log("User has been successfully signed in")
    setLoading(false)
    setUser({email:"",password:"",name:"",phoneNumber:"",returnSecureToken:true})
    }
    }   
    else{

      setLoading(true)
      e.preventDefault()
    

    const response= await fetch(`${baseURL}/user/login`,{
      method:'POST',
      body:JSON.stringify(user),
      headers:{
        'Content-Type':'application/json'
      }
    })

    if(!response.ok){
      const res=await response.json()
      setLoading(false)

      console.log(res)
      let errorMessage="Something Went Wrong"
      if(res && res.error && res.error.message){
        errorMessage=res.error.message
      }
      alert(errorMessage);
    }
    else{
      const res=await response.json()
      setLoading(false)

      // console.log(res.idToken)
      // console.log(user)

      // dispatch(authActions.login({token:res.idToken,email:user.email}))
      // authActions.login(res.idToken)

      dispatch(authActions.login({token:res.token,email:user.email}))
      authActions.login(res.token)
      // ctx.loginHandler(res.idToken)
      // localStorage.setItem('token',res.idToken)
      // ctx.loginHandler(res.idToken)
      history.push('/')
      console.log("successfully signed in")
    }
    } 
  }

  const onChangeHandler=(e)=>{
    e.preventDefault()
    setUser({...user,[e.target.name]:e.target.value})
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={addUser}>
        {!isLogin &&
        <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' name='name' value={user.name} onChange={onChangeHandler} required />
      </div>
        }
      
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' name='email' value={user.email} onChange={onChangeHandler} required />
        </div>

        {!isLogin &&
        <div className={classes.control}>
        <label htmlFor='phoneNumber'>Your Phone Number</label>
        <input type='tel' id='phoneNumber' name='phoneNumber' value={user.phoneNumber} onChange={onChangeHandler} required />
      </div>
        }
        

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={user.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {!isLogin && 
        <div className={classes.control}>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={user.confirmPassword}
          onChange={onChangeHandler}
          required
        />
      </div>
        }
        
        <div className={classes.actions}>

          {isLogin && <Link to='/ForgotPassword'>Forgot Password</Link>}
          

          <button type='button'className={classes.toggle} onClick={switchAuthModeHandler}>{isLogin?'Create New Account':'Login with existing account'}</button>
            
          {loading===true?<p style={{color:'white'}}>Sending Request...</p>:<button style={{margin:'2px'}}>{isLogin?'Login':'Sign Up'}</button>}
          
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
