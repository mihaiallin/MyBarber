import React from "react";

export default function Footer() {
    return (
        <div className="container-xl ">
            <footer className="py-3 my-3">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item">
                        <a href="/" className="nav-link px-2 text-muted">
                            Home
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/terms-of-service" className="nav-link px-2 text-muted">
                            Terms of Service
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/privacy-and-policy" className="nav-link px-2 text-muted">
                            Privacy Policy
                        </a>
                    </li>
                </ul>
                <p className="text-center text-muted">&copy;2023 myBarber.com | All rights reserved.</p>
            </footer>
        </div>
    );
}
