import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/user-detail/userDetails';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [user, setUser] = useState({});
    const dispatch =  useDispatch()
    const navigate = useNavigate()
    const getUserData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        // console.log(user)
    }
   const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(createUser(user))
    navigate("/read")
    console.log(user)
   }
    return (
        <form className='col-7' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" className="form-control" id="name" name='name' onChange={getUserData} />
            </div>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email"  className="form-control" id="Email" name='email' onChange={getUserData} />
            </div>
            <div className="mb-3 htmlForm-check">
                <label className="form-label" htmlFor="age">age</label>
                <input type="number" className="form-control" id="age" name='age' onChange={getUserData} />
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" id="male" value="Male" onChange={getUserData}  />
                <label className="form-check-label" htmlFor="male">
                    Male
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" id="Female" value="Female" onChange={getUserData}  />
                <label className="form-check-label" htmlFor="Female">
                    Female
                </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Create