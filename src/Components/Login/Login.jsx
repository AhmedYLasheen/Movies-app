import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login({setUserData}) {
  let [user, setUser] = useState({

    email: '',
    password: '',

  })

  let [errorMsg, setErrorMsg] = useState('');
  let [errorList, setErrorList] = useState([]);
  let [loading, setLoading] = useState(false);

  const navegat = useNavigate();
  function goToHome() {
    let path = "/home";
    navegat(path);
  }

  async function submitFormData(e) {
    e.preventDefault();
    setLoading(true);
    let valedationResult = valedateForm();
    if (valedationResult.error) {
      // alert('va errooor')
      setErrorList(valedationResult.error.details)
      setLoading(false);
      // console.log(valedationResult);

    } else {
      let { data } = await axios.post
      ('http://localhost:3004/user', user);
      // localStorage.setItem('token',data.token)
      localStorage.setItem('token',data.email)

      // if (data.message=='success')
      if (data.email != '' && data.password != '') {
        setUserData();
        // console.log(data);
        // alert('go to home')
        goToHome();
      } else {

        setErrorMsg(data.message);
        setErrorMsg('value is required')
      }
      setLoading(false);
    }

  }

  function valedateForm() {
    const schema = Joi.object({
      
      email: Joi.string().required().email({ tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().required().pattern(new RegExp('^[a-z][0-9]{3}$')).min(3).max(10),
    })
    return schema.validate(user, { abortEarly: false });
  }

  function getFormValue(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value
    setUser(myUser)


  }
  return (
    <>
      <h1 className='my-5'>Login Form</h1>
      {errorMsg ? <div className='alert alert-danger p-2'>{errorMsg}</div> : ""}
      {errorList.map((error, index) => <div key={index} className='alert alert-danger p-2'>{error.message}</div>)}
      <form onSubmit={submitFormData}>
        <div className="input-gp my-3">
          <label htmlFor="email">Email </label>
          <input onChange={getFormValue} type="text" className='form-control my-2 ' name='email' />
        </div>
        <div className="input-gp my-3">
          <label htmlFor="password">Password </label>
          <input onChange={getFormValue} type="text" className='form-control my-2 ' name='password' />
        </div>
        <button className='btn btn-info float-end '>
        
          {loading ? <i className='fa fa-spinner fa-spin'></i> : "Login"}

        </button>
        <div className='clearfix'></div>
      </form>
    </>
  )
}
