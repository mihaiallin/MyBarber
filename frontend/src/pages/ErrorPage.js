import React from "react";
import { Link } from "react-router-dom";
import "../styles/ErrorPage.css"; // Import custom CSS file for styling

function ErrorPage() {
    return (
        <div className="error-container">
            <div className="error-content">
                <h1 className="error-heading">Oops! Page Not Found</h1>
                <p className="error-text">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/" className="error-link">Go to Home Page</Link>
            </div>
        </div>
    );
}

export default ErrorPage;
