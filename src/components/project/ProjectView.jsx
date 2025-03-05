import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, searchProject, viewProject } from '../../features/project/ProjectSlice'
import ProjectModal from './ProjectModal'
import { Link } from 'react-router-dom'
const ProjectView = () => {
    const [modalID, setModalId] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [searchQuery, setSearchQuery] = useState('');
    const { loading, projects, } = useSelector((state) => state.project)

    const dispatch = useDispatch()




    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.due_date.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Calculate paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);


    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        dispatch(viewProject())
    }, [])

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-danger';
            case 'in-progress':
                return 'bg-warning';
            case 'completed':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    if (loading) {
        return <div>loading.....</div>
    }

    return (
        <div className="container">
            <div className='row align-items-center my-4'>
                <div className='col'>
                    <h2>project details</h2>
                </div>
                <div className='col-auto'>
                    <input type="search" className='form-control' placeholder='search here..' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
                </div>
                <div className='col-auto'>

                    <Link to="/add-project" className='btn btn-primary'>Add Project</Link>
                </div>
            </div>
            <div className='table-responsive mb-5'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Project Name</th>
                            <th>status</th>
                            <th>due date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <thead>
                        {currentItems.map((ele, index) => (
                            <tr key={ele.id}>
                                <td>{index + 1}</td>
                                <td>{ele.name}</td>
                                <td>  <span className={`badge ${getStatusBadgeClass(ele.status)}`}>
                                    {ele.status}
                                </span></td>
                                <td>{ele.due_date}</td>
                                <td>
                                    <button type="button" onClick={() => setModalId(ele.id)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectModal">
                                        View
                                    </button>
                                    <Link to={`/edit-project-details/${ele.id}`} className='btn btn-outline-primary ms-2'>Edit</Link>
                                    <button className='btn btn-outline-danger ms-2' onClick={() => dispatch(deleteProject(ele.id))} >Delete</button>
                                </td>
                            </tr>
                        ))}

                    </thead>
                </table>
                {filteredProjects.length === 0 && (
                    <div className="text-center py-5 ">No projects found.</div>
                )}
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                        </li>
                        {pageNumbers.map((number) => (
                            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(number)}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>

                <ProjectModal id={modalID} />
            </div>
            {/* <div className='card'>
                <div className='card-body'>
                    <div className='inner-body'>
                        <h1>text</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum sequi nemo quo distinctio. Fugit distinctio architecto saepe placeat cumque autem nam perferendis? Natus blanditiis libero aliquid laudantium enim pariatur error?</p>
                    </div>
                        <p className='start-icon'><button>ooo</button></p>
                </div>
            </div> */}
        </div>
    )
}

export default ProjectView
