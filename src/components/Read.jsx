import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUser, deleteUser } from '../features/user-detail/userDetails'
import { Link, useParams } from 'react-router-dom'
import CustomModal from './CustomModal'
import { current } from '@reduxjs/toolkit'

const Read = () => {
    // https://www.youtube.com/watch?v=8vNFuUALYv4
    // What About Coding    
    // Complete CRUD APP using Redux Toolkit and createAsyncThunk | API call using Redux Toolkit
    const [modalId, setModalId] = useState(false)
    const [radioData, setRadioData] = useState("");

    const { loading, user, searchData } = useSelector((state) => state.app)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allUser())
    }, [])
    if (loading) {
        return <h2>Loading....</h2>
    }
    return (
        <div className='col-lg-8 mx-auto'>
            <h1> Read all data </h1>
            <input
            id='all'
                className="form-check-input"
                name="gender"
                checked={radioData === ""}
                type="radio"
                onChange={(e) => setRadioData("")}
            />
            <label className="form-check-label" htmlFor='all'>All</label>
            <input
            id='Male'
                className="form-check-input"
                name="gender"
                checked={radioData === "Male"}
                value="Male"
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
            />
            <label className="form-check-label" htmlFor='Male'>Male</label>
            <input
            id='Female'
                className="form-check-input"
                name="gender"
                value="Female"
                checked={radioData === "Female"}
                type="radio"
                onChange={(e) => setRadioData(e.target.value)}
            />
            <label className="form-check-label" htmlFor='Female'>Female</label>

            {user &&
                user.filter((ele) => {
                    if (searchData.length === 0) {
                        return ele
                    } else {
                        return ele.name
                            .toLowerCase()
                            .includes(searchData.toLowerCase());
                    }
                }
                ) .filter((ele) => {
                    if (radioData === "Male") {
                      return ele.gender === radioData;
                    } else if (radioData === "Female") {
                      return ele.gender === radioData;
                    } else return ele;
                  }).map((curEel) => (
                    <div className="card  my-2" key={curEel.id}>
                        <div className="card-body">
                            <h5 className="card-title">{curEel?.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{curEel?.email}</h6>
                            <img src={curEel.email} alt="" />
                            <p className="card-text">{curEel?.gender}</p>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#customModal"
                                onClick={() => setModalId(curEel?.id)}
                            >view
                            </button>
                            <Link to={`/edituser/${curEel?.id}`} className='btn btn-primary mx-2' >Edit</Link>
                            <button className='btn btn-primary mx-2' onClick={() => dispatch(deleteUser(curEel.id))}>Delete</button>
                        </div>
                    </div>
                ))}
            <CustomModal id={modalId} />
        </div>
    )
}

export default Read