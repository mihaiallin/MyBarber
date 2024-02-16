import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import Profile from "../components/Profile.js";
import DefaultURL from "../GlobalVariables.js";

export default function MyProfile() {
    const authUser = useAuthUser();

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(
                    `${DefaultURL}/users/email/${authUser?.email}`
                );
                const data = await response.data;
                setCurrentUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCurrentUser();
    }, [authUser?.email]);

    return (
        <>
            <Profile id={currentUser?.id} />
        </>
    );
}
