import React, { Component } from 'react';
import axios from 'axios';
import StaffService from '../../services/StaffService';
import { Card, CardDeck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';



export default class AssignBugToStaff extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state = {
            staffs: []
        }
    }

    initialState = {
        bugId: '', staffId: '', designation:''
    };

    componentDidMount() {
        const bugId = this.props.match.params.bugId;
        if (bugId) {
            this.findBugById(bugId);
        }

    }

    view = (event) => {
        event.preventDefault()
        StaffService.getStaffs().then((res) => {
            this.setState({ staffs: res.data });
        });
    }


    findBugById = (bugId) => {

        axios.get("http://localhost:6060/api/bugs/" + bugId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        bugId: response.data.bugId,
                        staffId: response.data.staffId,
                        designation: response.data.designation
                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });

    }



    bugChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    updateSolution = event => {
        event.preventDefault();
        var bugId = this.state.bugId;
        var staffId = this.state.staffId;

        axios.put("http://localhost:6060/api/assign/" + staffId + "/" + bugId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    setTimeout(() => this.bugList(), 3000);
                }
                else {
                    this.setState({ "show": false });
                }
            });

        this.setState(this.initialState);
    }

    bugList = () => {
        return this.props.history.push("/adminBug");
    };

    render() {
        return (
            <CardDeck>
                <Card className="border-dark">
                    <Card.Header className='text-center font-weight-bold'>Assign Bug</Card.Header>
                    <Card.Body>
                        <form >

                            <div className="form-group">
                                <label className="form-label">Staff Id (*) </label>
                                <input type="text" className="form-control" name="staffId"
                                    value={this.state.staffId} onChange={this.bugChange}
                                    placeholder="assign bug" required />

                            </div>

                            <div className="form-group">
                                <label className="form-label">Bug Id (*) </label>
                                <input type="text" className="form-control" name="bugId"
                                    value={this.state.bugId} onChange={this.bugChange}
                                    placeholder=" bug id" required />

                            </div>
                            <br />

                        </form>
                    </Card.Body>
                    <Card.Footer>
                        <button onClick={this.updateSolution} className="btn btn-info mb-2">
                        <FontAwesomeIcon icon={faPlusSquare} /> AssignBug
                        </button>
                        
                            <button className="btn btn-dark mb-2" onClick={this.bugList} variant="contained" style={{float: 'right'}}>
                            <FontAwesomeIcon icon={faUndo} /> Return to Bug List
                            </button>
                    </Card.Footer>
                </Card>

                <Card className="border-dark">

                    <Card.Header className='text-center '>
                        <button onClick={this.view} className="btn btn-warning font-weight-bold">View Staffs</button>
                    </Card.Header>
                    <Card.Body>
                        <table className="table table-bordered table-striped ">
                            <thead className="thead-dark">
                                {/* <tr>
                                    <th scope="col">Staff Id</th>
                                    <th scope="col"> Staff Designtaion</th>

                                </tr> */}
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th>StaffId</th>
                                    <th>Staff Designation</th>
                                </tr> */}
                                {

                                    this.state.staffs.map(
                                        (staff, index) => (

                                            <tr key={staff.staffId}>

                                                <td> {staff.staffId} </td>
                                                <td> {staff.designation} </td>

                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </CardDeck>
        );
    }

}