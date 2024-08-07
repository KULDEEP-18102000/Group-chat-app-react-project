import AuthForm from './components/Auth/AuthForm';
import HomePage from './pages/HomePage';
import MakeGroupPage from './pages/MakeGroupPage';
import EditGroups from './pages/EditGroupPage';
import { Route,Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';


function App() {

  const isAuthenticated=useSelector(state=>state.auth.isAuthenticated)

  return (
    <div className='container'>
      <Route exact path="/auth">
      <AuthForm/>
    </Route>

    <Route exact path="/">
    {isAuthenticated && <HomePage/>}
      {!isAuthenticated && <Redirect to='/auth'/>}
    </Route>

    <Route exact path="/makeGroup">
      <MakeGroupPage/>
    </Route>

    <Route exact path="/editGroup">
      <EditGroups/>
    </Route>
    </div>
  );
}

export default App;
