import React, { useState } from 'react';
import "./Register.css";
import { useForm } from 'react-hook-form';
import axios from '@/Config/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/register", formData);

      if (data.success) {
        toast.success("User registered successfully!");
        reset();
        navigate("/signin"); // change if your route is different
      } else {
        toast.warning(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signup'>
      <div className='register'>
        <h2 className='Registertittle'>Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name */}
          <input
            className='Registerinput'
            type='text'
            placeholder='Full Name'
            {...register("Name", { required: "Name is required" })}
          />
          {errors.Name && <p className="error">{errors.Name.message}</p>}

          {/* Username */}
          <input
            className='Registerinput'
            type='text'
            placeholder='Username'
            {...register("Username", { required: "Username is required" })}
          />
          {errors.Username && <p className="error">{errors.Username.message}</p>}

          {/* Email */}
          <input
            className='Registerinput'
            type='email'
            placeholder='Email'
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email"
              }
            })}
          />
          {errors.Email && <p className="error">{errors.Email.message}</p>}

          {/* Phone */}
          <input
            className='Registerinput'
            type='tel'
            placeholder='Mobile Number'
            {...register("Number", {
              required: "Mobile number is required",
              minLength: {
                value: 10,
                message: "Enter valid number"
              }
            })}
          />
          {errors.Number && <p className="error">{errors.Number.message}</p>}

          {/* Password */}
          <input
            className='Registerinput'
            type='password'
            placeholder='Password'
            {...register("Password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters"
              }
            })}
          />
          {errors.Password && <p className="error">{errors.Password.message}</p>}

          <button type='submit' className='Registersubmit' disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>

        </form>

        <p className="login-link">
          Already have an account? 
          <span onClick={() => navigate("/signin")}> Login</span>
        </p>

      </div>
    </div>
  );
}

export default Register;