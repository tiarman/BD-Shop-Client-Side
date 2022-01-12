import React, { useContext } from 'react';
import { handleLogout, UserContext } from '../../../App';
import './Profile.css';
import facebook from '../../../Images/facebook.png';
import Dashboard from '../Dashboard/Dashboard';

const Profile = () => {
    const loggedInUser = useContext(UserContext)[0];
    return (
        <div className=" mgalin container-flued row">
            
            <Dashboard></Dashboard>
        <div className="profile-section">
            <div className="content-items padding-5">
                <div className="profile-info">
                    <img className="rounded-circle shadow" src={loggedInUser.photo ? loggedInUser.photo :facebook} alt="" width="100" height="100" />
                    <h2 className="mt-3">{loggedInUser.name}</h2>
                    <p>{loggedInUser.email}</p>

                    <button onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;