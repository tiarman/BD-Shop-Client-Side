import React from 'react';
import Dashboard from '../../Dashboard/Dashboard/Dashboard';
import GetAdmins from '../GetAdmins/GetAdmins';
import PrivateRoute from '../../LoginAuth/PrivateRoute/PrivateRoute';

const ManageAdmin = () => {
    return (
        <div>
            <PrivateRoute>
            <Dashboard></Dashboard>
            </PrivateRoute>
            <GetAdmins></GetAdmins>
        </div>
    );
};

export default ManageAdmin;