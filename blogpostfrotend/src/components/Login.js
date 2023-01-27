import { React, useState, useEffect } from 'react'
import APIService from '../APIService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setLogin] = useState(true);
    const [token, setToken] = useCookies(['mytoken']);
    let navigate = useNavigate();

    useEffect(() => {
        if (token['mytoken']) {
            navigate('/articles');
        }
    }, [token])

    const loginBtn = () => {
        APIService.LoginUser({ username, password })
            .then(resp => setToken('mytoken', resp.token))
            .catch(error => console.log(error))
    }

    const registerBtn = () => {
        APIService.RegisterUser({ username, password })
            .then(() => loginBtn())
            .catch(error => console.log(error))
    }

    return (
        <>
            <div className='App'>
                <div className='container'>
                    {isLogin ? <h1>Please Log in</h1> : <h1>Please Register</h1>}
                    <br />
                    <div className='col-mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input type='text' className='form-control' id='username' value={username} onChange={e => setUsername(e.target.value)} placeholder='Please enter your username' />
                    </div>
                    <br />
                    <div className='col-mb-3'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type='password' className='form-control' id='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Please enter your password' />
                    </div>
                    {isLogin ? <button onClick={loginBtn} className='btn btn-success my-3'>Log in</button> : <button onClick={registerBtn} className='btn btn-success my-3'>Register</button>}

                    <div className='mb-3'>
                        {isLogin ? <h5>If, you don't have account, Please <button className='btn btn-primary btn-sm' style={{ backgroundColor: "#282c34", border: "0px", fontSize: "18px", paddingBottom: "7px", color: "blueviolet" }} onClick={() => setLogin(false)}>Register</button> Here</h5>
                            : <h5>If you have account, Please <button className='btn btn-primary btn-sm' style={{ backgroundColor: "#282c34", border: "0px", fontSize: "18px", paddingBottom: "7px", color: "blueviolet" }} onClick={() => setLogin(true)}>Log in</button>Here</h5>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login

