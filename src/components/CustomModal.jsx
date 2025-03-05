import React from 'react'
import { useSelector } from 'react-redux'

const CustomModal = ({ id }) => {
    const allUsers = useSelector((state) => state.app.user);
    const singleUser = allUsers?.find((ele) => ele.id === id);
  
    if (!singleUser) return null; 
  
    return (
      <div className="modal fade" id="customModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">User Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p><strong>Name:</strong> {singleUser.name}</p>
              <p><strong>Email:</strong> {singleUser.email}</p>
              <p><strong>Gender:</strong> {singleUser.gender}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default CustomModal