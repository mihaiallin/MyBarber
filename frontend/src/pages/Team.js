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

    // const barbers = [
    //     { id: 1, name: "Barber 1", phoneNumber: "123-456-7890" },
    //     { id: 2, name: "Barber 2", phoneNumber: "987-654-3210" },
    //     { id: 3, name: "Barber 3", phoneNumber: "555-123-4567" },
    //     { id: 4, name: "Barber 4", phoneNumber: "555-987-6543" },
    //     { id: 5, name: "Barber 5", phoneNumber: "555-678-9012" },
    //     { id: 6, name: "Barber 6", phoneNumber: "555-234-5678" },
    //     { id: 7, name: "Barber 7", phoneNumber: "555-876-5432" },
    //     { id: 8, name: "Barber 8", phoneNumber: "555-345-6789" },
    //     { id: 9, name: "Barber 9", phoneNumber: "555-654-3210" },
    //     { id: 10, name: "Barber 10", phoneNumber: "555-432-1098" },
    //     { id: 11, name: "Barber 11", phoneNumber: "555-789-0123" },
    //     { id: 12, name: "Barber 12", phoneNumber: "555-210-9876" },
    //     { id: 13, name: "Barber 13", phoneNumber: "555-098-7654" },
    //     { id: 14, name: "Barber 14", phoneNumber: "555-321-0987" },
    //     { id: 15, name: "Barber 15", phoneNumber: "555-876-5432" },
    //     { id: 16, name: "Barber 16", phoneNumber: "555-456-7890" },
    //     { id: 17, name: "Barber 17", phoneNumber: "555-987-6543" },
    //     { id: 18, name: "Barber 18", phoneNumber: "555-789-0123" },
    //     { id: 19, name: "Barber 19", phoneNumber: "555-654-3210" },
    //     { id: 20, name: "Barber 20", phoneNumber: "555-321-0987" },
    //     { id: 21, name: "Barber 21", phoneNumber: "555-234-5678" },
    //     { id: 22, name: "Barber 22", phoneNumber: "555-789-0123" },
    //     { id: 23, name: "Barber 23", phoneNumber: "555-567-8901" },
    //     { id: 24, name: "Barber 24", phoneNumber: "555-890-1234" },
    //     { id: 25, name: "Barber 25", phoneNumber: "555-456-7890" },
    // ];



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
