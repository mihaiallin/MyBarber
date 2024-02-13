import React, {useState} from "react"
import axios, {AxiosError} from 'axios'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import DefaultURL from "../GlobalVariables";
import {useNavigate} from "react-router-dom";
import Alert from "../components/Alert";


const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const signIn = useSignIn();

    const onSubmit = async (values) => {
        setError("");
        setLoading(true);

        try {
            const response = await axios.post(`${DefaultURL}/users/authenticate`, values);
            signIn({
                auth: {
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                },
                userState: {email: values.email, role: response.data.role}
            });
            setAlert({ type: 'success', message: 'Successfully logged in.' });
            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (err){
            if (err instanceof AxiosError) setError(err.response?.data.message);
            else if (err instanceof Error) setError(err.message);
            if (err.response && err.response.status === 403) {
                setAlert({ type: 'danger', message: 'Incorrect email or password. Please try again.' });
            } else {
                setAlert({ type: 'danger', message: 'An error occurred. Please try again later.' });
            }

        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authenticateData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        if (!authenticateData.email || !authenticateData.password) {
            setAlert({ type: 'danger', message: 'Please provide email and password.' });
            setLoading(false);
        } else (onSubmit(authenticateData));
    };

    return (
        <form onSubmit={onSave} style={{marginTop: 175}}>
            {alert && <Alert type={alert.type} message={alert.message}/>}
            <div className="container py-3 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong">
                            <div className="card-body p-5 text-center">
                                <h1 className="mb-3">Log In</h1>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
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
