import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import DefaultURL from "../GlobalVariables";

const Team = () => {
    const authUser = useAuthUser();
    const [barbers, setBarbers] = useState([]);

    useEffect(() => {
        const fetchBarbers = async () => {
            try {
                const response = await axios.get(`${DefaultURL}/users`);
                const users = response.data;

                // Filter out barbers from the list of users
                const barberUsers = users.filter(user => user.role === 'ROLE_BARBER');
                setBarbers(barberUsers);
            } catch (error) {
                console.error('Error fetching barbers:', error.message);
            }
        };
        fetchBarbers();
    }, [authUser]);

    return (
        <div>
            <h2>Our Team</h2>
            <ul>
                {barbers.map(barber => (
                    <li key={barber.id}>
                        {barber.name} - {barber.role} - {barber.phoneNumber}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Team;
