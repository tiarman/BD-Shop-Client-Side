import React, { useEffect, useState } from 'react';
import Dashboard from '../../Dashboard/Dashboard/Dashboard';

const GetAdmins = () => {
    const [allAdmin, setAllAdmin] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/admins')
        .then(res => res.json())
        .then(data => setAllAdmin(data))
    }, [])
    return (
        <div>
            <Dashboard></Dashboard>
        
            <div className="row">
            {
                allAdmin.map(admins => <div>
                    <li>Admin Name: {admins.name}</li>
                    <li>Admin Email: {admins.email}</li>
                    <img style={{height: '100px'}} src={`data:image/png;base64,${admins.image.img}`} />
                       
                </div>)
            }
        </div>
        </div>
    );
};

export default GetAdmins;