import React, { useEffect, useState } from "react";
import logo from "../photo/logo/logo_1.png"
import { Outlet } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import DefaultURL from "../GlobalVariables";
import axios from "axios";

const NavBar = () => {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const authUser = useAuthUser();
    const [currentUser, setCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());



    useEffect(() => {
        const onAuthChange = () => {
            setLoggedIn(isAuthenticated());
        };
        window.addEventListener("authChange", onAuthChange);
        setLoggedIn(isAuthenticated());
    },[isAuthenticated]);


    useEffect(() => {
            if(!loggedIn) {
            setCurrentUser(null);
            return;
        }
        
        const getUserByEmail = async () => {
            try {
                const response = await axios.get(
                    `${DefaultURL}/users/email/${authUser?.email}`
                );
                const data = response.data;
                setCurrentUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        getUserByEmail();
    }, [authUser?.email, loggedIn]);


    const handleLogOut = () => {
        signOut();
        setLoggedIn(false);
        window.location.href = "/";
        

    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-auto"
                            style={{maxWidth: 90}}
                        />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/team">Team</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/services">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/gallery">Gallery</a>
                            </li>
                            {!isAuthenticated() ? (
                                <li className="nav-item">
                                    <a
                                        className="btn btn-primary font-weight-bold mx-2"
                                        aria-current="page"
                                        href="/register"
                                    >
                                        Sign Up
                                    </a>
                                </li>
                            ) : null}
                            {isAuthenticated() ? (
                                <li className="nav-item">
                                    <div className="dropdown">
                                        <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton"
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                 fill="currentColor"
                                                 className="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path
                                                    d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                <path
                                                    fillRule="evenodd"
                                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                            </svg>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end"
                                            aria-labelledby="dropdownMenuButton">
                                            <li><a className="dropdown-item"
                                                   href={`/profile/${currentUser?.id}`}>Profile</a></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogOut}>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Log In</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default NavBar;