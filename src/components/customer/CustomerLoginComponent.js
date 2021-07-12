import React from 'react';
import CustomerRegistrationService from '../../services/CustomerRegistrationService';
import { history } from '../../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import {Link, Redirect, Route} from 'react-router-dom';



class CustomerLoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerEmailId: '',
            password: '',
            show: false,
        }
        
        this.handlesubmit = this.handlesubmit.bind(this);
    };

    handleSetuser = e => {

        this.setState({ customerEmailId: (e.target.value) })
    }
    handleSetpassword = e => {

        this.setState({ password: (e.target.value) })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    
    

    handlesubmit = (event) => {
        event.preventDefault()
        var id = this.state.customerEmailId;
        var password = this.state.password;
        console.log(this.state)
        if (id && password) {
            CustomerRegistrationService.validate(id, password)
                .then(
                    response => {
                        if (response.data === 'Customer logged-in Successfully') {
                            this.props.history.push("/viewCustomer");
                        }
                        else {
                            alert(`Login failed!!! wrong credentials`)
                            history.push({ pathname: '/customer', state: { data1: response.data } });
                        }

                    })
                .catch(
                    error => {
                        alert(`Login failed!!! wrong credentials`)
                    }
                )
            this.setState({ customerEmailId: '', password: '' })

        }
    }



    render() {

        return (
            <div className='card border-info login-back'>
                <form name='login' onSubmit={this.handlesubmit} id="customerEmailId">

                    <br />
                    <div className='data'>
                        <h2 >Login Form</h2>
                    </div>

                    <b><hr></hr></b>
                    <div className='form-group'>
                        <div className='mb-3'>
                            <label forname="customerEmailId">
                            </label><FontAwesomeIcon icon={faUser} />
                            <input type="text" name="customerEmailId" className="form-control"
                                onChange={this.onChange}
                                value={this.state.customerEmailId} placeholder='Enter UserId' required />
                        </div>

                        <div className='mb-3'>
                            <label forname="password">
                            </label><FontAwesomeIcon icon={faLock} />
                            <input type="password" name="password" className="form-control"
                                onChange={this.onChange}
                                value={this.state.password} placeholder='Enter password' required />
                        </div>

                        <button type='submit' className="form-submit btn btn-success">Login</button>
                        <div className="text-left">Not Registered? &nbsp;
                            <Link to="/signup"> <span className="btn btn-info">Sign Up</span></Link>
                        </div>
                    </div>


                </form>

            </div>
        );
    }

}

export default CustomerLoginComponent