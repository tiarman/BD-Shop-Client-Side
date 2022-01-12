import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../../App";
import Dashboard from "../Dashboard/Dashboard/Dashboard";
import './ShowCheckOut.css'

const ShowCheckOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [checkOut, setCheckOut] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/addCheckOut?email=" + loggedInUser.email, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCheckOut(data));
  }, []);
  return (
    <div className="row">
      <Dashboard></Dashboard>
      <div className="alignitem col-md-12">
        <h1 className="text-center">Your All Orders</h1>
        <div className=" p-4 pr-5" style={{ backgroundColor: "#F4FDFB" }}>
          <div className="d-flex justify-content-center ">
            {checkOut.length < 1 && !isLoading && (
              <div className="d-flex py-5 my-5 justify-content-center">
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {checkOut.length < 1 && isLoading ? (
              <h1>No order placed yet.....</h1>
            ) : (
              <div className=" row   mt-5 pt-5">
                {checkOut.map((check) => (
                    <div className="col-md-4 col-sm-12">
                      <div className=" text-center shadow p-4">
                        <div className="d-flex justify-content-between">
                          {
                            <img
                              style={{ height: "70px" }}
                              className="img-fluid mb-3"
                              src={check[0].imageUrl}
                              alt=""
                            />
                          }

                          <p
                            className="text-light p-2 rounded-3"
                            style={{
                              backgroundColor:
                                check.status === "Done"
                                  ? "green"
                                  : check.status === "pending"
                                  ? "red"
                                  : "black",
                            }}
                          >
                            {check.status}
                          </p>
                        </div>
                        <h5 className="my-2 ">{check[0].name}</h5>
                        <h6 className="my-2">{check.email}</h6>

                        <p className="text-secondary">{check[0].price}</p>
                      </div>
                    </div>
                  
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCheckOut;
