import React from 'react';
import barbershop from "../photo/photos/barbershop.jpg"

const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section text-center py-5 mt-5 bg-light-subtle">
                <div className="container">
                    <h1>Welcome to myBarber</h1>
                    <p className="lead">Get the perfect haircut and grooming experience.</p>
                    <a href="/appointment" className="btn btn-primary btn-lg">Book Appointment</a>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>About Us</h2>
                            <p>Welcome to our barbershop! We pride ourselves on providing top-quality services to our valued customers. Whether you're looking for a fresh haircut, a stylish beard trim, or a classic hot towel shave, our skilled team is here to help you look and feel your best.</p>
                            <p>Experience the difference at our barbershop today. Book your appointment and discover why we're the preferred choice for discerning clients who demand nothing but the best</p>
                        </div>
                        <div className="col-md-6">
                            <img src={barbershop} alt="Barbershop Interior" className="img-fluid rounded animate__animated animate__fadeInRight" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="services-section py-5 bg-light">
                <div className="container">
                    <h2 className="text-center mb-5">Our Services</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInLeft">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Haircut</h5>
                                    <p className="card-text">Professional haircuts for men.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInUp">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Beard Trim</h5>
                                    <p className="card-text">Trim and shape your beard.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInRight">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Shave</h5>
                                    <p className="card-text">Classic hot towel shaves.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="testimonial-section py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Testimonials</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInLeft">
                            <div className="card h-100 testimonial-card">
                                <div className="card-body">
                                    <h5 className="card-title">John Doe</h5>
                                    <p className="card-text">"Great service, friendly staff, and excellent haircut."</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInUp">
                            <div className="card h-100 testimonial-card">
                                <div className="card-body">
                                    <h5 className="card-title">Jane Smith</h5>
                                    <p className="card-text">"Best barbershop in town. Highly recommended!"</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 animate__animated animate__fadeInRight">
                            <div className="card h-100 testimonial-card">
                                <div className="card-body">
                                    <h5 className="card-title">Michael Johnson</h5>
                                    <p className="card-text">"Professional service and attention to detail."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
