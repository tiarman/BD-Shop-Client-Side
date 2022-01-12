import React, { useState } from 'react';
import Dashboard from '../Dashboard/Dashboard/Dashboard';
import GetAdmins from './GetAdmins/GetAdmins';
import './AddAdmin.css'

const AddAdmin = () => {
    const [info, setInfo] = useState({})
    const [file, setFile] = useState(null)


    const handleBlur = e => {
      const newInfo = {...info};
      newInfo[e.target.name] = e.target.value;
      setInfo(newInfo)
    }

    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }


    const handleSubmit = () => {
        const formData = new FormData()
        console.log(info);
        formData.append('file', file);
        formData.append('name', info.name);
        formData.append('email', info.email);

        fetch('http://localhost:5000/addAdmin', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.error(error)
            })
    }
    return (
        <section className="row">
            <Dashboard></Dashboard>
            <div className="adminAlign col-md-9 p-4 pr-5 mt-5 mr-2" style={{ position: "absolute", right: 0, backgroundColor: "#F4FDFB" }}>
                <h5 className="text-brand">Add a Admin</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onBlur={handleBlur} type="email" className="form-control" name="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Name</label>
                        <input onBlur={handleBlur} type="text" className="form-control" name="name" placeholder="Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Upload a image</label>
                        <input onChange={handleFileChange} type="file" className="form-control" id="exampleInputPassword1" placeholder="Picture" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                <div className="adminAlign col">
                
                </div>
            </div>
        </section>
    );
};

export default AddAdmin;