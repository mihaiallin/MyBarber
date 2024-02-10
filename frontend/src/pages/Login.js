import React, {useState} from "react"
import axios from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import DefaultURL from "../GlobalVariables";
import {useNavigate} from "react-router-dom";

import Alert from "../components/Alert";



const Login = () => {
    const signIn = useSignIn()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when login is initiated

        if (!formData.email || !formData.password) {
            setAlert({ type: 'danger', message: 'Please provide email and password.' });
            setLoading(false); // Set loading back to false
            return;
        }

        try {
            const res = await axios.post(`${DefaultURL}/users/authenticate`, formData);
            if (res.status === 200) {
                if (signIn({
                    auth: {
                        token: res.data.token,
                        type: 'Bearer',
                        expiresIn: 3600,
                        authState: { email: formData.email, role: res.data.role }
                    }
                })) {
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('Error:', error.message);
            if (error.response && error.response.status === 403) {
                setAlert({ type: 'danger', message: 'Incorrect email or password. Please try again.' });
            } else {
                setAlert({ type: 'danger', message: 'An error occurred. Please try again later.' });
            }
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }
    };

    return (
        <form onSubmit={onSubmit} style={{marginTop: 175}}>
            {alert && <Alert type={alert.type} message={alert.message}/>}
            <div className="container py-3 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                            <div className="card-body p-5 text-center">
                                <h1 className="mb-3">Log In</h1>

                                <div className="form-outline mb-4">
                                    <input
                                        type={"email"}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type={"password"}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        id="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </div>

                                {loading ? (
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-lg btn-block mb-2"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                )}

                                <p className="mt-2 mb-4 fw-semibold small">
                                    <a href="/forget-password">Forgot password?</a>
                                </p>
                                <hr className="my-4"/>
                                <a href="/register">
                                    <button
                                        className="btn btn-primary btn-lg btn-success"
                                        type="button"
                                    >
                                        Create new account
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;
