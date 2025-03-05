import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { editProject } from '../../features/project/ProjectSlice';

const EditProject = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updated, setUpdate] = useState({})
    const { projects, loading } = useSelector((state) => state.project)
    useEffect(() => {
        if (id) {
            const singleProject = projects.filter((ele) => ele.id === id)
            console.log(singleProject[0])
            setUpdate(singleProject[0])
        }
    },[])
    const getUserValue = (e) => {
        setUpdate({ ...updated, [e.target.name]: e.target.value })
        console.log("uservale",updated)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/project')
        dispatch(editProject(updated))
    }
    if(loading){
        return<div>loading.....</div>
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="projectName">Project Name</label>
                    <input type="text" className='form-control' id='projectName' name='name' placeholder='type here..' onChange={getUserValue} value={updated?.name} />
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="projectStatus">select Project status</label>
                    <select className='form-select' name="status" id="projectStatus" placeholder='type here..' onChange={getUserValue} value={updated?.status}>
                        <option value="0">select status</option>
                        <option value="pending">pending</option>
                        <option value="in-progress">in-progress</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label' htmlFor="date">select Due date</label>
                    <input type="date" className='form-date form-control' id='date' name='due_date' placeholder='select date' onChange={getUserValue} value={updated?.due_date} />
                </div>
                <div className='text-end'>
                    <button type='submit' className='btn btn-primary'>submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditProject
