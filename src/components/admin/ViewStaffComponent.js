import React, { Component } from 'react'

import StaffService from '../../services/StaffService';

class ViewStaffComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staffId: this.props.match.params.staffId,
            staff: {}
        }
    }

    componentDidMount() {
        StaffService.getStaffById(this.state.staffId).then(res => {
            this.setState({ staff: res.data });
        })
    }

    cancel() {
        this.props.history.push('/viewStaff');
    }
    

    render() {

        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center" style={{ color: 'orange' }}> View Staff Details</h3>
                    
                    <div className="card-body">
                        <div className="row">
                            <label> Staff Name: {this.state.staff.name}</label> 
                        </div>
                        <div className="row">
                            <label> Staff Email ID: {this.state.staff.emailId}</label>
                        </div>
                        <div className="row">
                            <label> Staff Designation: {this.state.staff.designation}</label>
                            
                        </div>
                        <br/>
                        <div className="row" style={{ display: "flex" }}>
                        <button className="btn btn-secondary " onClick={this.cancel.bind(this)} style={{ marginLeft: "auto" }}>Back to StaffList</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ViewStaffComponent