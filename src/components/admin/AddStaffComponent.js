import React, { Component } from 'react'
import StaffService from '../../services/StaffService';
class AddStaffComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            staffId: this.props.match.params.staffId,
            name: '',
            emailId: '',
            designation: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
    }
    componentDidMount() {
        if (this.state.staffId === '_add') {
            return
        } else {
            StaffService.getStaffById(this.state.staffId).then((res) => {
                let staff = res.data;
                this.setState({
                    name: staff.name,
                    emailId: staff.emailId,
                    designation: staff.designation
                });
            });
        }
    }
    saveOrUpdateStaff = (e) => {
        e.preventDefault();
        let staff = { name: this.state.name, emailId: this.state.emailId, designation: this.state.designation };
        console.log('staff => ' + JSON.stringify(staff));
        if (this.state.staffId === '_add') {
            StaffService.addStaff(staff).then(res => {
                this.props.history.push('/viewStaff');
            });
        } else {
            StaffService.updateStaff(staff, this.state.staffId).then(res => {
                this.props.history.push('/viewStaff');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeDesignationHandler = (event) => {
        this.setState({ designation: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ emailId: event.target.value });
    }

    cancel() {
        this.props.history.push('/viewStaff');
    }


    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <br></br>
                            <h2 className="text-center" style={{ color: 'orange' }}>ADD STAFF</h2>
                            <div className="card-body">
                                <form action="/action_page.php" className="was-validated">
                                    <div className='mb3'>
                                        <p>{this.props.staffs}</p>


                                        <div className="form-group">
                                            <label for="exampleFormControlInput1"> Staff Name: </label>
                                            <input type="text" placeholder="Staff Name" name="staffName" className="form-control"
                                                staffId="exampleFormControlInput1" value={this.state.firstName} onChange={this.changeNameHandler} required />
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Please fill out this field.</div>
                                        </div>

                                        <div className="form-group">
                                            <label for="exampleFormControlInput2"> Staff EmailId: </label>
                                            <input type="text" placeholder="Staff EmailId" name="staffEmailId" className="form-control"
                                                staffId="exampleFormControlInput2" value={this.state.emailId} onChange={this.changeEmailHandler} required />
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Please fill out this field.</div>
                                        </div>

                                        <div className="form-group">
                                            <label for="exampleFormControlInput3"> Staff Designation: </label>
                                            <input type="text" placeholder="Staff Designation" name="staffDesignation" className="form-control"
                                                staffId="exampleFormControlInput3" value={this.state.designation} onChange={this.changeDesignationHandler} required />
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Please fill out this field.</div>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateStaff}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddStaffComponent
