import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loginType from '../typings/UserToken';

const Wrapper = styled.div`
  .login-container{
    margin:0 40px 70px 40px;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  input{
    margin:5px 0 5px;
    width:300px;
    height:40px;
    padding:3px;
    border-radius:5px;
  }
  a{
    text-decoration:none;
    font-weight:bold;
  }
  .button{
    height:30px;
    border-width:1px;
    border-radius:5px;
    border-color:black;
    background-color:black;
    color:white
}
.button-disable{
  height:30px;
  border-width:0;
  border-radius:5px;
  border-color:grey;
  background-color:grey;
  color:white;
  width:300px;
}
.button:hover{
  background-color:white;
  color:black
}
.text{
    font-weight:bold;
    width:300px;
}
img{
  z-index:-1
}
p{
  margin-bottom:5px
}
`
interface props {
  login: loginType;
  setLogin: React.Dispatch<React.SetStateAction<loginType>>
}

const LogIn: React.FC<props> = ({ login, setLogin }) => {
  const navigate = useNavigate();
  const [height, setHeight] = useState<string>((window.innerHeight * 0.8).toString());
  const [user, setUser] = useState<{ username: string, password: string }>({
    username: '',
    password: ''
  })
  const [submit, setSubmit] = useState<boolean | string>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => { return { ...prev, status: 'none' } })
    setUser((prev: { username: string, password: string }) => { return { ...prev, [name]: value } })
  }
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post("https://recipeweb-api.herokuapp.com/login", user).then((res) => setLogin(res.data));
    setUser({ username: '', password: '' })
  }

  useEffect(() => {
    if (login.status === 'success') {
      login && navigate('/')
    }
  }, [login, navigate])

  useEffect(() => {
    window.addEventListener('resize', () => setHeight((window.innerHeight * 0.8).toString()))
    return window.removeEventListener('resize', () => setHeight((window.innerHeight * 0.8).toString()))
  }, [height])

  useEffect(() => {
    if (user.username !== '' && user.password !== '') {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [user])

  return (
    <Wrapper>
      <div className='login-container' style={{ height: height + 'px' }}>
        <div>
          <h2 style={{ fontWeight: 'bold' }}>Log In</h2>
          <p>Other chefs are waiting for you !</p>
          <div>
            <input onChange={handleChange} type='text' value={user.username} name='username' placeholder='Username*'></input>
          </div>
          <input onChange={handleChange} type='password' value={user.password} name='password' placeholder='Password*'></input>
          {login.status === 'Username or password incorrect.' && <p style={{ color: 'red' }}>Username or password incorrect.</p>}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
            {submit ? <button onClick={handleClick} className='button'><div className='text'>SIGN IN</div></button> :
              <button disabled className='button-disable'><div className='text-disable'>SIGN IN</div></button>}
          </div>
          <hr style={{ margin: '20px' }}></hr>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>No account yet?&emsp; &emsp;|&emsp;&emsp;<Link to='/register'>Register</Link></div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default LogIn