import React,{useState,useEffect} from 'react';
import Login from './components/login';
import API from "./utils/API"
import "./App.css";
import Turtles from './components/Turtles';


function App() {
  const [loginValues, setloginValues] = useState({
    userName:"",
    password:""
  })
  const [loggedInUser, setLoggedInUser] = useState({
    isLoggedIn:false,
    id:null,
    token:null,
    userName:"",
    userTurtles:[]
  })
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){

      API.getUserFromToken(token).then(result=>{
        API.getTurtles(token,result.id).then(data=>{
          setLoggedInUser({...loggedInUser,token:token,id:result.id,userName:result.userName,isLoggedIn:true,userTurtles:data})
        })
      }).catch(err=>{
        localStorage.removeItem("token");
      })
    }
  }, [])

  
  const submit = e=>{
    e.preventDefault();
    console.log("submitted")
    API.login(loginValues).then(result=>{
      if(result){
        localStorage.setItem("token",result.token);
        API.getTurtles(result.token,result.id).then(data=>{
          setLoggedInUser({...loggedInUser,...result,isLoggedIn:true,userTurtles:data})
        })
      }else{
        localStorage.removeItem("token");
        setLoggedInUser({
          isLoggedIn:false,
          userId:null,
          token:null,
          userName:"",
          userTurtles:[]
        })
      }
    })
    
  }

  const change = ({target})=>{
    const {name,value} = target
    setloginValues({
      ...loginValues,
      [name]:value

    })
    
  }

  return (
    <div className="App">
    <Login submitHandle={submit} handleChange={change} values={loginValues}/>
      <h1>Turtles</h1>
    {loggedInUser.isLoggedIn?<h1>Welcome {loggedInUser.userName}</h1>:<h1>log in to see your turtles</h1>}
    {loggedInUser.userTurtles?<Turtles turtles={loggedInUser.userTurtles}/>:null}
    </div>
  );
}

export default App;
