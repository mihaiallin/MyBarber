import React, { useState, useEffect } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import DefaultURL from "../GlobalVariables";
import axios from "axios";
import barber_1 from "../photo/photos/barber_1.jpg";

export default function Profile({id}) {
    const [currentUser, setCurrentUser] = useState(null);
    const authUser = useAuthUser();

    const fetchCurrentUser = async () => {
        try {
            const response = await axios.get(`${DefaultURL}/users/${id}`);
            const data = response.data;
            setCurrentUser(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCurrentUser();
        }
    }, [authUser?.email, id]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center" style={{ marginTop: 100 }}>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center">
                                {currentUser && (
                                    <div>
                                        <img src={barber_1} alt="Profile"
                                             className="img-fluid rounded-circle mb-3"
                                             style={{width: "150px", border: "2px solid #000", padding: "2px"}}/>
                                        <hr className="my-2"/>
                                        <h2 className="card-title mb-4">{currentUser.name}</h2>
                                        <div className="mb-3">
                                            <strong
                                                className="text-secondary">Role:</strong> {currentUser.role.slice(5)}
                                        </div>
                                        {authUser?.email === currentUser.email && (
                                            <div>
                                                <div className="mb-3">
                                                    <strong
                                                        className="text-secondary">Email:</strong> {currentUser.email}
                                                </div>
                                                <div className="mb-3">
                                                    <strong className="text-secondary">Phone
                                                        Number:</strong> {currentUser.phoneNumber}
                                                </div>
                                                {/* Add more user information here */}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
