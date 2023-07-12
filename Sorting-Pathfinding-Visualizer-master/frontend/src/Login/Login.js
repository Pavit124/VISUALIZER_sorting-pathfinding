import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [values,setValues] = useState({
    email:'',
    password:''
  })
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const[errors,setErrors]= useState({})
  const handleInput =(event)=> {
    setValues(prev => ({ ...prev, [event.target.name]:[event.target.value]}))
  }

  useEffect(() => {
    validateForm();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
  }

  const validateForm = () => {
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/', values)
        .then(res => {
          if (res.data.length === 0) {
            setErrors({email: 'Email doesn\'t exist. Please register!'})
          } else if (res.data[0].password !== values.password[0]) {
            setErrors({password: 'Incorrect Password'});
          } else if(res.data[0].email === values.email[0] && res.data[0].password === values.password[0]) {
            navigate('/Homepage');
          } 
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div style={{backgroundColor: '#AA77FF'}} className='d-flex justify-content-center align-items-center vh-100'>
      <div className='bg-white p-4 rounded w-25'>
        <h2 style={{textAlign: "center"}}>Sign-In</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='mb-4 mt-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email ' name='email'
                onChange={handleInput} className='form-control rounded-0' autoComplete='off' />
                {errors.email && <span className='text-danger'>{errors.email} </span> }
  
                
            </div>
            <div className='mb-4'>
                <label htmlFor="password"><strong>Password</strong></label>
                <div className='d-flex flex-md-row'>
                  <input type={passwordVisible ? "text" : "password"} placeholder='Enter password ' name='password' 
                  onChange={handleInput} className='form-control rounded-0'/>
                  <button style={{borderColor: '#BDBDBD'}} type='button' className='btn rounded-0 bg-white' onClick={togglePasswordVisibility}>{passwordVisible ? <Visibility /> : <VisibilityOff />}</button>
                </div>
                {errors.password && <span className='text-danger'>{errors.password} </span> }
            </div>
            <button style={{backgroundColor: '#576CBC'}} type='submit' className='btn btn-success w-100 rounded-0 mt-2'><strong>Log in</strong></button>
            
            <Link to='/Signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-2'><strong>Create Account</strong></Link>

        </form>
      </div>
    </div>
  )
}

export default Login
