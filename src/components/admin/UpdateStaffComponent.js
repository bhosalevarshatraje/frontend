import React, { Component } from 'react';
import StaffService from '../../services/StaffService';

class UpdateStaffComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            staffId: this.props.match.params.staffId,
            name: '',
            email: '',
            designation: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
        this.updateStaff = this.updateStaff.bind(this);
    }

    componentDidMount() {
        StaffService.getStaffById(this.state.staffId).then((res) => {
            let staff = res.data;
            this.setState({
                name: staff.name,
                emailId: staff.emailId,
                designation: staff.designation
            });
        });
    }

    updateStaff = (e) => {
        e.preventDefault();
        let staff = { name: this.state.name, emailId: this.state.emailId, designation: this.state.designation };
        console.log('staff => ' + JSON.stringify(staff));
        console.log('id => ' + JSON.stringify(this.state.staffId));
        StaffService.updateStaff(staff, this.state.staffId).then(res => {
            this.props.history.push('/viewStaff');
        });
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    changeDesignationHandler = (event) => {
        this.setState({ designation: event.target.value });
    }

    cancel() {
        this.props.history.push('/viewStaff');
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br></br>
                        <h2 className="text-center" style={{ color: 'orange' }} >UPDATE STAFF</h2>
                        <div className="card-body">
                            <form action="/action_page.php" className="was-validated">
                                <div className='mb3'>
                                    <p>{this.props.staffs}</p>
                                    <div className="form-group">
                                        <label for="exampleFormControlInput1"> Staff Id: </label>
                                        <input type="text" ref={this.staffId} className="form-control"
                                            value={this.state.staffId} name="staffId" staffId="exampleFormControlInput1" placeholder="Enter Staff Id" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlInput2"> Staff Name: </label>
                                        <input type="text" ref={this.name} className="form-control"
                                           value={this.state.name} name="staffName" staffId="exampleFormControlInput2" placeholder="Enter StaffName" onChange={this.changeNameHandler} required />
                                    </div>

                                    <div className="form-group">
                                        <label for="exampleFormControlInput3"> Email Id: </label>
                                        <input type="text" ref={this.emailId} className="form-control"
                                            value={this.state.emailId} name="staffEmailId" staffId="exampleFormControlInput3" placeholder="Enter EmailId" onChange={this.changeEmailHandler} required />

                                    </div>

                                    <div className="form-group">
                                        <label for="exampleFormControlInput4"> Designation: </label>
                                        <input type="text" ref={this.designation} className="form-control"
                                            value={this.state.designation} name="staffDesignation" staffId="exampleFormControlInput4" placeholder="Enter Designation" onChange={this.changeDesignationHandler} required />

                                    </div>

                                    <button className="btn btn-success" onClick={this.updateStaff}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default UpdateStaffComponent