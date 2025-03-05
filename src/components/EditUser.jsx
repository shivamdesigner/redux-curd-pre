import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUserData } from '../features/user-detail/userDetails'

const EditUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [updateUser, setUpdateUser] = useState('');
    const { user, loading } = useSelector((state) => state.app);
    useEffect(() => {
        if (id) {
            const singleUser = user.filter((ele) => ele.id === id);
            setUpdateUser(singleUser[0]);
        }
    }, [])

    const handleUpdate = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }
    console.log("updated data", updateUser);
    const handelFormUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUserData(updateUser))
        navigate("/read")
    }
    if (loading) {
        return <h1>loading ...</h1>
    }
    return (
        <form className='col-7 mx-auto' onSubmit={handelFormUpdate} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label">name</label>
                <input type="text" className="form-control" id="name" name='name' value={updateUser && updateUser.name} onChange={handleUpdate} />
            </div>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email" className="form-control" id="Email" name='email' value={updateUser && updateUser.email} onChange={handleUpdate} />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="age">age</label>
                <input type="number" className="form-control" id="age" name='age' value={updateUser && updateUser.age} onChange={handleUpdate} />
            </div>
            <div className="form-check">
                <input className="form-check-input" checked={updateUser && updateUser.gender === "Male"} type="radio" name="gender" id="male" value="Male" onChange={handleUpdate} />
                <label className="form-check-label" htmlFor="male">
                    Male
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="gender" checked={updateUser && updateUser.gender === "Female"} id="Female" value="Female" onChange={handleUpdate} />
                <label className="form-check-label" htmlFor="Female">
                    Female
                </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default EditUser