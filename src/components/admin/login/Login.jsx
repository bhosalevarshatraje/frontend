import './styles.css'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginService from '../../../services/LoginService';
import { history } from '../../../history';
import { Redirect } from 'react-router';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            show: false,
        }
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
        console.log(this.state);
        //this.setState({ show: true });
        if (id && password) {
            LoginService.validate(id, password)
                .then(
                    // user => {
                    //     console.log(user.data);
                    //     if (user.data === 'admin sucess login') {

                    //         history.push({ pathname: '/#/welcome', state: { data: user.data } });
                    //     }
                    //     else {
                    //         alert(`Login failed!!! wrong credentials`)
                    //         history.push({ pathname: '/admin', state: { data1: user.data } });

                    //     }
                        response => {
                            if (response.data === 'admin sucess login') {
                                this.setState({ "show": true });
                                // localStorage.setItem('token', response.data.token);
                                
                               
                            }

                            else {
                                this.setState({ "show": false });
                                alert(`Login failed!!! wrong credentials`)
                                history.push({ pathname: '/#/admin', state: { data1: response.data } });
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

    // render() {
    //     const { loggingIn } = this.props;
    //     const { userId, password, show } = this.state;
    //     return (

    //         <div className='user-id1'>
    //             <div className='data'>
    //                 <h2>Login Form</h2>

    //             </div>
    //             <form name='login' onClick={this.handlesubmit}>
    //                 <b><hr></hr></b>
    //                 <div className={'form-group' + (show && !userId ? 'has-error' : '')}>
    //                     <label htmlFor='userId'>UserId: </label>   <br></br><input type='text' name='userId' className='form-control' placeholder='Enter UserId' pattern="^[A-Za-z]{5,29}$" onChange={this.handleSetuser} required></input>
    //                     {show && !userId && <div className='help-block'>*UserId is required</div>}
    //                 </div>

    //                 <div className={'form-group' + (show && !password ? 'has-error' : '')}>
    //                     <label htmlFor='password'>Password:</label>  <br></br> <input type='password' name='password' className='form-control' placeholder='Enter password'

    //                         onChange={this.handleSetpassword} required></input>
    //                     {show && userId && !password && <div className='help-block'>*Password is required</div>}
    //                 </div>
    //                 <br></br>


    //                 <div>


    //                     <button type="submit" className='btn btn-success' background-color='pink' color='blue'>Login</button>
    //                     {loggingIn &&
    //                         <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt='sucess' />
    //                     }
    //                     {/* {this.state.show ? <viewpage/>:''} */}

    //                 </div>


    //             </form>


    //         </div>



    //     );
    render() {
        const show = this.state.show;
        if(show){
            return <Redirect to="/welcome" />
        }
        return (

            <div>
               
            
            <div className='card border-info login-back'>
                
                <form name='login' onSubmit={this.handlesubmit} id="userId">

                    <br />
                    <div className='data'>
                        <h2>Login Form</h2>
                    </div>

                    <b><hr></hr></b>
                    <div className='form-group'>

                        <div className='mb-3'>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i class="fa fa-user"></i></span>
                                <input type="text" name="userId" className="form-control"
                                    onChange={this.onChange}
                                    value={this.state.userId} placeholder='Enter UserId' required />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i class="fa fa-lock"></i></span>
                            
                            <input type="password" name="password" className="form-control"
                                onChange={this.onChange}
                                value={this.state.password} placeholder='Enter password' required />
                                </div>
                        </div>

                        <button type='submit' className="form-submit btn btn-success">Login</button>
                    </div>
                </form>
            </div >
            </div>

        );

    }
}
export default Login;