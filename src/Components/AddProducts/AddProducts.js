import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Dashboard from '../Dashboard/Dashboard/Dashboard';
import { faCloudUploadAlt, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import './AddProducts.css'


const AddProducts = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState(null)
    const [isButtonDisable, setIsButtonDisable] = useState(true);

  const onSubmit = data => {
    const productData = {
      name: data.name,
      price: data.price,
      imageUrl: imageUrl
    };

    const loading = toast.loading('Adding...Please wait!');
    const url = `http://localhost:5000/addProduct`;
    console.log(productData)
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(productData)
    })
      // .then(res => console.log('server side respnse', res))
      .then(res=>{
        if(res){
            toast.dismiss(loading);    
            reset();
            setIsButtonDisable(true)
            return swal(`Successfully Added!`, `${data.name} service has been successfully Added`, "success");
        }
        swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
  });
}
  
  const handleImageUpload = event => {
    console.log(event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', '7c492597bc5b6e62635691936f938fdb')
    imageData.append('image', event.target.files[0])
    const loading = toast.loading('Uploading...Please wait!');

    axios.post('https://api.imgbb.com/1/upload', 
    imageData)
    .then(function (response) {
      toast.dismiss(loading);
      if(response){
        toast.success('Successfully upload Image...!!!')
        setImageUrl(response.data.data.display_url);
        setIsButtonDisable(false)
      }
      
    })
    // .catch(function (error) {
    //   console.log(error);
    // });
    .catch(error => toast.error(error.message));
  }
    return (
        
      <section className="row">
        
        <Dashboard></Dashboard>
        <siv className="addservicealine add-service">
          
            <Container>
              <h1 className="text-center">Add Your Product</h1>
                <Form onSubmit={handleSubmit(onSubmit)} className="fromAlign w-90 shadow">
                    <div className="p-5 bg-white form-main" style={{ borderRadius: "15px" }}>
                        <Form.Row className="justify-content-center">
                            <Form.Group as={Col} md={5} sm={12} className="mr-md-5 admin-group">
                                <Form.Label>Service Title</Form.Label>
                                <Form.Control type="text" {...register("name", { required: true })}placeholder="Enter Product Title" />
                            </Form.Group>

                            <Form.Group as={Col} md={5} sm={12} className='admin-group'>
                                <Form.Label >Price</Form.Label>
                                <Form.Control   type="number" {...register("price", {required: true })} placeholder="Enter Product Price" />
                            </Form.Group>

                            <Form.Group as={Col} md={5} sm={12} className="mt-md-3 admin-group">
                                <Form.Label>Add Image</Form.Label>
                                <Button as={"label"} htmlFor="upload" variant="outline-primary" className="d-block p-2 upload-btn">
                                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2" />Upload Image
                                </Button>
                                <Form.Control hidden="hidden" id="upload" onChange={handleImageUpload} type="file" placeholder="Upload photo" />
                            </Form.Group>

                        </Form.Row>
                        <div className="text-center mt-4">
                            <Button type="submit" variant='info' disabled={isButtonDisable}  className='main-button'>Add Service</Button>
                        </div>
                    </div>
                </Form>
             </Container>
        </siv>
        </section>
    );
};

export default AddProducts;