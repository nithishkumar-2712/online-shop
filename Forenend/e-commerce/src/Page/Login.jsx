import React, { useContext } from 'react';
import "./Login.css";
import { useForm } from 'react-hook-form';
import axios from '@/Config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/App';

function Login() {
  const{tokencheck}=useContext(AppContext)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (Send) => {
    try {
      const { data } = await axios.post("/login", Send);

      if (data.success) {
        toast.success(data.message);
        await tokencheck(); 
        // navigate("/");
         if (data.role === "Admin") {
          navigate("/DashboardHome");
        } else if (data.role === "user") {
          navigate("/");
        }

        // } else {
        // alert(response.data.message);
        // }
        
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='login'>
      <div className='Signin'>

        <h2 className='logintittle'>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            className='inputtype'
            type='email'
            placeholder='Email'
            {...register("Email", { required: "Email is required" })}
          />
          {errors.Email && <p className="error">{errors.Email.message}</p>}

          <input
            className='inputtype'
            type='password'
            placeholder='Password'
            {...register("Password", { required: "Password is required" })}
          />
          {errors.Password && <p className="error">{errors.Password.message}</p>}

          <button className='Loginsubmit'>Login</button>

        </form>

        <p className="login-link">
          Don’t have an account? 
          <span onClick={() => navigate("/signup")}> Signup</span>
        </p>

      </div>
    </div>
  );
}

export default Login;