import React, { Component } from 'react';
import StaffService from '../../services/StaffService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faStepBackward, faStepForward, faFastBackward, faFastForward, faUndo, faTrashAlt, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, FormControl, InputGroup} from 'react-bootstrap';

class ListStaffComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            staffs: [],
            currentPage : 1,
            viewsPerPage : 3
        }
        this.addStaff = this.addStaff.bind(this);
        this.editStaff = this.editStaff.bind(this);
        this.deleteStaff = this.deleteStaff.bind(this);
    }

    deleteStaff(staffId) {
        StaffService.deleteStaff(staffId).then(res => {
            this.setState({ staffs: this.state.staffs.filter(staff => staff.staffId !== staffId) });
        });
    }
    viewStaff(staffId) {
        this.props.history.push(`/view-staff/${staffId}`);
    }
    editStaff(staffId) {
        this.props.history.push(`/update-staff/${staffId}`);
    }


    componentDidMount() {
        StaffService.getStaffs().then((res) => {
            this.setState({ staffs: res.data });
        });
    }

    addStaff() {
        this.props.history.push('/add-staff/_add');
    }

    home = () => {
        return this.props.history.push("/welcome");
    };

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage : 1
            });
        }
    };

    prevPage = () => {
        if(this.state.currentPage > 1) {
            this.setState({
                currentPage : this.state.currentPage - 1
            });
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.staffs.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage : this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.staffs.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage : Math.ceil(this.state.staffs.length / this.state.viewsPerPage)
            });
        }
    };

    render() {
        const { staffs, currentPage, viewsPerPage } = this.state;
        const lastIndex = currentPage * viewsPerPage;
        const firstIndex = lastIndex - viewsPerPage;
        const currentViews = staffs.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(staffs.length / viewsPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        }

        return (
            <div className="container">
                <Card>
                <Card.Header>
                <h2 className="text-center">STAFFS LIST</h2>
                <div >
                    <button className="btn btn-primary" onClick={this.addStaff}><FontAwesomeIcon icon={faPlusSquare} /> Add Staff</button>

                    <button className="btn btn-secondary mb-2" onClick={this.home} variant="contained" style={{float: 'right'}}>
                    <FontAwesomeIcon icon={faUndo} />Return to HomePage
                </button>
                </div>
                </Card.Header>
                <div className="row">
                
                </div>
                <br></br>
                <Card.Body>
                <div className="row">
                    <table className="table table-bordered table-striped table-dark table-hover">
                        <thead >
                            <tr>
                                <th scope="col">Staff Id</th>
                                <th scope="col"> Staff Name</th>
                                <th scope="col"> Staff Email Id</th>
                                <th scope="col"> Staff Designtaion</th>
                                <th scope="col"> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentViews.map(
                                    (staff, index) => (

                                        <tr key={staff.staffId}>
                                            <td> {staff.staffId} </td>
                                            <td> {staff.name}</td>
                                            <td> {staff.emailId}</td>
                                            <td> {staff.designation} </td>
                                            <td>
                                                <button onClick={() => this.editStaff(staff.staffId)} className="btn btn-info"><FontAwesomeIcon icon={faEdit} />Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteStaff(staff.staffId)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /> Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewStaff(staff.staffId)} className="btn btn-success"><FontAwesomeIcon icon={faEye} /> View </button>
                                            </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>

                </div>
                </Card.Body>
                <Card.Footer>
                        <div style={{"float":"left"}}>
                            Showing page of {currentPage} of {totalPages}
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false} 
                                        onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick = {this.prevPage}>
                                    <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style= {pageNumCss} name="currentPage" value={currentPage}
                                    onChange={this.changePage} />
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={totalPages === 1 ? true : false}
                                    onClick={this.nextPage}>
                                    <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={totalPages === 1 ? true : false}
                                    onClick={this.lastPage}>
                                    <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>

                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>

            </div>
        )
    }
}
export default ListStaffComponent