import React from 'react'
import { useSelector } from 'react-redux'

const ProjectModal = ({ id }) => {
    const allProject = useSelector((state) => state.project.projects)
    const singleProject = allProject.find((ele) => ele.id === id);
    if (!singleProject) {
        return null
    }
    return (
        <div>
            <div className="modal fade" id="projectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="projectModalLabel" aria-hidden="undefined">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="projectModalLabel">View Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <p>Project Name : {singleProject.name}</p>
                                <p> Project status : {singleProject.status}</p>
                                <p>Due date: {singleProject.due_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectModal
