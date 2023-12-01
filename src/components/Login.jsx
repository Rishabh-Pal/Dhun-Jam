import  { useState } from 'react'; 
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => { 
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      // Replace with your actual API endpoint for login
      const response = await fetch('https://stg.dhunjam.in/account/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.data && data.data.token) {
        // Successful login, save token and navigate to the dashboard
        localStorage.setItem('authToken', data.data.token); 
        console.log(data)
        navigate("/")
      } else {
        // Handle login failure
        console.error('Login failed:', data.ui_err_msg || data.server_err_msg);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='login'>
    <h1 className='heading'>Venue Admin Login</h1>
    <div className='text-field'>
    <input type="text" placeholder='Username' className='username' value={username}
          onChange={(e) => setUsername(e.target.value)}/>
    <input type="text" placeholder='Password' className='password' value={password}
          onChange={(e) => setPassword(e.target.value)}/>
    <button onClick={handleLogin}>Sign in</button>
    <p>New Registration?</p>
    </div>
    </div> 
  )
}

export default Login