import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../features/user-detail/userDetails';

const Navbar = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useDispatch()
  const allUser = useSelector((state) => state.app.user)

  useEffect(() => {
    dispatch(searchUser(searchData))
  }, [searchData])

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page" >create post</Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link">All post ({allUser.length}) </Link>
            </li>
            <li className="nav-item">
              <Link to="/project" className="nav-link">project</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchData} onChange={(e) => setSearchData(e.target.value)} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Navbar