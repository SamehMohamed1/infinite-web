// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import FormInput from '../../components/FormInputs/Forminputs';
import { Link, useNavigate } from 'react-router-dom';
const SingUp = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    birthday: '',
    password: '',
    confirmPassword: '',
  });

  const [signupError,setSignupError] = useState("")

  const navigate = useNavigate()

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      name: 'birthday',
      type: 'date',
      placeholder: 'Birthday',
      label: 'Birthday',
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: "Passwords don't match!",
      label: 'Confirm Password',
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the server
      const response = await axios.post('http://localhost:3000/adduser',values);

      // Handle the response from the server if needed
      if(response.data === true){
         navigate("/suc-signup")
      }else if(response.data.Error == "user already exist"){
        setSignupError(response.data.Error)
      }
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error('Error sending data:', error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="shadow">
        <h1>Register</h1>
     {signupError&&   <div class="alert alert-danger" role="alert">
  {signupError}
</div>}
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Register</button>
        <p>Already Have One <Link to={"/login"}> Login Now!</Link></p>
      </form>
    </div>
  );
};

export default SingUp;
