import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


// ACTUALLY THE REGISTER PAGE
// ACTUALLY THE REGISTER PAGE
// ACTUALLY THE REGISTER PAGE
// ACTUALLY THE REGISTER PAGE
const Login = () => {
    const [userInfo, setUserInfo] = useState({
        username:"",
        email:"",
        password: "",
    });


    
        //check the return statement of his authprovider, it may be changing things...

    const [err,setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };
 
    const handleClick = async e => {
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:8800/register", userInfo);
            console.log(res);
            navigate("/login2"); 
        }catch(err){
            setError(err.response.data);
        }
    }

    console.log(userInfo);

    return (<div className='form'>
        <h1>Login </h1>
        <input type="text" placeholder='username' onChange={handleChange} name="username" />
        <input type="text" placeholder='email' onChange={handleChange} name="email"/>
        <input type="number " placeholder='password' onChange={handleChange} name="password"/>
        {err && <p>{err}</p>}
        <button onClick={handleClick}>Login</button>
    </div>  
    );
}
 
export default Login;