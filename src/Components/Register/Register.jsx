import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Register() {

    let [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        password: '',

    })

    let [errorMsg, setErrorMsg] = useState('');
    let [errorList, setErrorList] = useState([]);
    let [loading, setLoading] = useState(false);

    const navegat = useNavigate();
    function goToLogin() {
        let path = "/login";
        navegat(path);
    }

    async function submitFormData(e) {
        e.preventDefault();
        setLoading(true);
        let valedationResult = valedateForm();
        if (valedationResult.error) {
            setErrorList(valedationResult.error.details)
            setLoading(false);
            // console.log(valedationResult);

        } else {
            let { data } = await axios.post('http://localhost:3004/user', user);
            if (data.email != '' && data.password != '') {
                goToLogin();
            } else {
                setErrorMsg(data.message);
                // setErrorMsg('value is required')
            }
            setLoading(false);
        }

    }

    function valedateForm() {
        const schema = Joi.object({
            first_name: Joi.string().required().alphanum().min(3).max(10),
            last_name: Joi.string().required().min(3).max(10),
            age: Joi.number().required().min(20).max(80),
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
            <h1 className='my-5'>Registeration Form</h1>
            {errorMsg ? <div className='alert alert-danger p-2'>{errorMsg}</div> : ""}
            {errorList.map((error, index) => <div key={index} className='alert alert-danger p-2'>{error.message}</div>)}
            <form onSubmit={submitFormData}>
                <div className="input-gp my-3">
                    <label htmlFor="first_name">First Name</label>
                    <input onChange={getFormValue} type="text" className='form-control my-2 ' name='first_name' />
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input onChange={getFormValue} type="text" className='form-control my-2 ' name='last_name' />
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="age">Age</label>
                    <input onChange={getFormValue} type="text" className='form-control my-2 ' name='age' />
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="email">Email </label>
                    <input onChange={getFormValue} type="text" className='form-control my-2 ' name='email' />
                </div>
                <div className="input-gp my-3">
                    <label htmlFor="password">Password </label>
                    <input onChange={getFormValue} type="text" className='form-control my-2 ' name='password' />
                </div>
                <button className='btn btn-info float-end '> {loading ? <i className='fa fa-spinner fa-spin'></i> : "Register"} </button>
                <div className='clearfix'></div>
            </form>
        </>
    )
}
