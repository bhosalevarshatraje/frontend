import React from 'react'
import bug from "../images/bug_rec1.png"
import { Link } from 'react-router-dom';
const HomePageComponent = () => {

    return (
        <>
            <div className="bg_image_home">
                <div>
                <section id="header" className="d-flex align-items-center">
                    <div className="container-fluid nav_bg">
                        <div className="row">
                            <div className="col-20 mx-auto">
                                <div className="row">
                                    <div className="col-md-7 pt-5 pt-lg-5 order-2 order-lg-1 d-flex justify-content-center flex-column">
                                        <h1>
                                            Welcome to Bug Tracking System
                                        </h1>
                                        <h5 className="my-3"> Ebug Tracker is a system which aims in helping the customers resolve their bugs encountered in their projects.</h5>
                                        <div className="mt-3">
                                        <Link to={"/login"} className="btn btn-primary" >Get Started</Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 order-1 order-lg-2 header-img">
                                        <img src={bug} className="img-fluid animated " alt="home img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </div>
        </>
    );
}
export default HomePageComponent