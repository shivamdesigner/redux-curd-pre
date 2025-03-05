import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../features/project/ProjectSlice';

const AddProject = () => {
    const [user, setUser] = useState({});
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const getUserValue = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log("user val",user)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(createProject(user))
        navigate('/project')
        console.log(user)
    }
    return (
        <div className='card card-body col-lg-8 mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="projectName">Project Name</label>
                    <input type="text" className='form-control' id='projectName' name='name' placeholder='type here..' onChange={getUserValue} />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="projectStatus">select Project status</label>
                    <select className='form-select' name="status" id="projectStatus" placeholder='type here..' onChange={getUserValue}>
                        <option value="0" disabled>select status</option>
                        <option value="pending">pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="date">select Due date</label>
                    <input type="date" className='form-date form-control' id='date' name='due_date' placeholder='select date' onChange={getUserValue} />
                </div>
                <div className='text-end'>
                    <button type='submit' className='btn btn-primary'>submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddProject
