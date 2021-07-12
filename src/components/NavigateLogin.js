import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavigateLogin extends Component {
    staffChange = () => {
        return this.props.history.push("/staff");
    }
    render() {
        return (
            <div className='card border-info login-back'>
                <center>
                    <form>
                        <h2><FontAwesomeIcon icon={faSignInAlt} /> Login as</h2>
                        <b><hr></hr></b>
                        <div className='form-group '>
                            <label>
                                <div className='mb-3 '>
                                    <Link to={"/admin"} className="btn btn-info" > &nbsp;Admin &nbsp; </Link>
                                </div>
                            </label>
                            <br />
                            <label>
                                <div className='mb-3 '>
                                    <Link to={"/staff"} className="btn btn-info btn-size-lg"  > &nbsp;&nbsp;&nbsp;&nbsp;Staff&nbsp;&nbsp;&nbsp;</Link>
                                </div>
                            </label>
                            <br />

                            <label>
                                <div className='mb-3'>
                                    <Link to={"/customer"} className="btn btn-info" >Customer</Link>
                                </div>
                            </label>

                        </div>
                    </form>
                </center>
            </div>

        );
    }
}

export default NavigateLogin;