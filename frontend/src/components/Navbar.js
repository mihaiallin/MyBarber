import React from "react";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";


function Navbar() {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();

    const handleSignOut = () => {
        signOut();
        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <span className="navbar-brand">Navbar</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page">Home</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Link</span>
                        </li>
                        <li className="nav-item dropdown">
                            <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </span>
                            <ul className="dropdown-menu">
                                <li><span className="dropdown-item">Action</span></li>
                                <li><span className="dropdown-item">Another action</span></li>
                                <li><hr className="dropdown-divider"/> </li>
                                <li><span className="dropdown-item">Something else here</span></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link disabled" aria-disabled="true">Disabled</span>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                {/*    login/logout*/}
                    {!isAuthenticated() ? (
                        <li className="nav-item">
                            <a
                                className="btn btn-primary font-weight-bold  mx-2   "
                                aria-current="page"
                                href="/login"
                            >
                                Login
                            </a>
                        </li>

                    ) : null}

                    {isAuthenticated() ? (
                        <li className="nav-item">
                            <a
                                className="btn btn-primary font-weight-bold  mx-2   "
                                aria-current="page"
                                onClick={handleSignOut}
                                href="/"
                            >
                                Logout
                            </a>
                        </li>
                    ) : null}
                {/* ------*/}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
