import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login2 = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  //he put this in authcontext, i am putting here for now
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    const res = await axios.post("http://localhost:8800/login");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);


  console.log("Current user: " + currentUser);

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
    login(userInfo);
      const res = await axios.post("http://localhost:8800/login", userInfo); //the other is /register
      console.log(res);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  console.log(userInfo);

  return (
    <div className="form">
      <h1>Login2 the real login page </h1>
      <input
        type="text"
        placeholder="username"
        onChange={handleChange}
        name="username"
      />
      <input
        type="number "
        placeholder="password"
        onChange={handleChange}
        name="password"
      />
      {err && <p>{err}</p>}
      <button onClick={handleClick}>Login2</button>
    </div>
  );
};

export default Login2;
