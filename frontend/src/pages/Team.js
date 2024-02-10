import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import barber_1 from "../photo/photos/barber_1.jpg"

import DefaultURL from "../GlobalVariables";

const Team = () => {
    const authUser = useAuthUser();
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await axios.get(`${DefaultURL}/users`);
                const users = response.data;

                const barberUsers = users.filter(user => user.role === 'ROLE_BARBER');
                setBarbers(barberUsers);
            } catch (error) {
                console.error('Error fetching barbers:', error.message);
            }
        };

        fetchBarbers();
    }, [authUser]);

    return (

        <div className="container" style={{marginTop: 100}}>
            <h1 className="mb-3">Our Team</h1>
            <div className="row gy-3">
                {barbers.map((barber) => (
                    <div className="col-md-4" key={barber.id}>
                        <div className="card">
                            <img src={barber_1} className="card-img-top" alt={barber.name}/>
                            <div className="card-body">
                                <h5 className="card-title">{barber.name}</h5>
                                <hr className="my-4"/>

                                <div className="align-items-center mb-3">
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <a href={`tel:${barber.phoneNumber}`}>{barber.phoneNumber}</a>
                                </div>
                                {/*<p className="card-text">{barber.phoneNumber}</p>*/}

                                <a href="/appointment" className="btn btn-primary">Appointment</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Team;
