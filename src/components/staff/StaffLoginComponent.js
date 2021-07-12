import React from 'react';
import StaffLoginService from '../../services/StaffLoginService';
import { history } from '../../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';



class StaffLoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            show: false,
        }
        // this.handleSetuser = this.handleSetuser.bind(this);
        //this.handleSetpassword = this.handleSetpassword.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    };

    handleSetuser = e => {

        this.setState({ userId: (e.target.value) })
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
        var id = this.state.userId;
        var password = this.state.password;
        console.log(this.state)
        if (id && password) {
            StaffLoginService.validate(id, password)
                .then(
                    response => {
                        if (response.data === 'Staff login success') {
                            // localStorage.setItem('token', response.data.token);
                            this.props.history.push("/staffbug");
                           
                        }
                        else {
                            alert(`Login failed!!! wrong credentials`)
                            history.push({ pathname: '/staff', state: { data1: response.data } });
                        }

                    })
                .catch(
                    error => {
                        alert(`Login failed!!! wrong credentials`)
                    }
                )
            this.setState({ userId: '', password: '' })

        }
    }



    render() {


        return (

            <div className='card border-info login-back'>
                <form name='login' onSubmit={this.handlesubmit} id="userId">

                    <br />
                    <div className='data'>
                        <h2>Login Form</h2>
                    </div>

                    <b><hr></hr></b>
                    <div className='form-group'>
                        <div className='mb-3'>
                            <label forname="userId">
                            </label><FontAwesomeIcon icon={faUser} />
                            <input type="text" name="userId" className="form-control"
                                onChange={this.onChange}
                                value={this.state.userId} placeholder='Enter UserId' required />
                        </div>

                        <div className='mb-3'>
                            <label forname="password">
                            </label><FontAwesomeIcon icon={faLock} />
                            <input type="password" name="password" className="form-control"
                                onChange={this.onChange}
                                value={this.state.password} placeholder='Enter password' required />
                        </div>

                        <button type='submit' className="form-submit btn btn-success">Login</button>
                    </div>
                </form>
            </div>

        );
    }

}

export default StaffLoginComponent