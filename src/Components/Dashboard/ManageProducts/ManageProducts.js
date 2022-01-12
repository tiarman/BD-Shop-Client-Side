import Dashboard from '../Dashboard/Dashboard';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import TableSpinner from '../../TableSpinner/TableSpinner';
import './ManageProducts.css'

const ManageProducts = () => {

    const [allProduct, setAllProduct] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/allProducts')
        .then(res => res.json())
        .then(data => setAllProduct(data))
    }, [])




    const handleUpdateService = () =>{
        
    }


    const handleDeleteService = () => {

        }
    return (
        <section>
            <Dashboard></Dashboard>
            <Container>
            <div className="tableAline">
                <div className="shadow p-5 bg-white" style={{ borderRadius: "15px" }}>
                    {
                        allProduct.length > 0 ?
                        <Table  className='table-style' hover responsive>
                            <thead  className="bg-light">
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            {
                                allProduct.map((products, index) => {
                                return (
                                    <tbody key={products._id} style={{ fontWeight: "500" }}>
                                        <tr>
                                            <td>{index +1 }</td>
                                            <td>{products.name}</td>
                                            <td>৳ {products.price}</td>
                                            <td className="text-center">
                                                <Button variant="outline-success" className="p-1 mb-0" onClick={() => handleUpdateService(products._id)}>
                                                    <FontAwesomeIcon icon={faEdit} className="mx-1" />
                                                </Button>
                                                <Button variant="outline-danger" className="p-1 ml-3 mb-0"onClick={() => handleDeleteService(products._id)}>
                                                    <FontAwesomeIcon icon={faTrash} className="mx-1" />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>  )})
                            }
                        </Table> : <TableSpinner />
                    }
                </div>
            </div>
            </Container>
        </section>
    );
};

export default ManageProducts;