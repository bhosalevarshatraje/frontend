import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo, faStepBackward, faStepForward,faEye, faMousePointer, faFastBackward, faFastForward, faPlusSquare, faCheckCircle, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, FormControl, InputGroup} from 'react-bootstrap';

class ViewBugDetailsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            bugs: [],
            currentPage: 1,
            viewsPerPage: 3
        }

    }

    componentDidMount() {
        axios.get("http://localhost:6060/api/bugs")
            .then(response => response.data)
            .then((data) => {
                this.setState({ bugs: data });
            });
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
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.bugs.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.bugs.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.bugs.length / this.state.viewsPerPage)
            });
        }
    };

    status = () => {
        return this.props.history.push("/status");
    }

    render() {
        const { bugs, currentPage, viewsPerPage } = this.state;
        const lastIndex = currentPage * viewsPerPage;
        const firstIndex = lastIndex - viewsPerPage;
        const currentViews = bugs.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil( bugs.length / viewsPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        }

        const iconSuccess = {
            color: "red"
        }

        const iconOpen = {
            color: "green"
        }

        
        return (
            <div className="container">
                <Card>
                    <Card.Header>
                        <h2 className="text-center">Bug Details List</h2>
                        <button className="btn btn-warning mb-2" onClick={this.home} variant="contained" style={{ float: 'right' }}>
                            <FontAwesomeIcon icon={faUndo} /> Return to HomePage
                </button>
                <button className="btn btn-danger" onClick={this.status} 
                            style={{float: 'left'}} variant="contained"><FontAwesomeIcon icon={faMousePointer} /> <FontAwesomeIcon icon={faEye} /> Bug Status Flow</button>
                    </Card.Header>
                    <br></br>
                    <Card.Body>
                        <div className="row">

                            <table className="table table-striped table-bordered table-dark table-hover">
                                <thead >
                                    <tr>
                                        <th scope="col">bugId</th>
                                        <th scope="col">bugTitle</th>
                                        <th scope="col">bugDescription</th>
                                        <th scope="col">criticalLevel</th>
                                        <th scope="col">bugStatus</th>
                                        <th scope="col">Staff ID</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        bugs.length === 0 ?
                                            <tr align="center">
                                                <td colSpan="6">No bugs available.</td>
                                            </tr> :
                                            currentViews.map((bug) => (
                                                <tr key={bug.bugId}>
                                                    <td>{bug.bugId}</td>
                                                    <td>{bug.bugTitle}</td>
                                                    <td>{bug.bugDescription}</td>
                                                    <td>{bug.criticalLevel}</td>
                                                    {
                                                        (bug.bugStatus === "Solved") ?
                                                            (<td ><FontAwesomeIcon icon={faCheckCircle} style={iconSuccess} />{bug.bugStatus}</td>)
                                                            :
                                                            (<td className="bg-info"><FontAwesomeIcon icon={faPenSquare} style={iconOpen} />{bug.bugStatus}</td>)
                                                    }
                                                    <td>{bug.staffId}</td>
                                                    {
                                                        <td>
                                                            <Link to={"adminAssign/" + bug.staffId + "/" + bug.bugId} style={{ marginLeft: "10px" }}
                                                                className="btn btn-outline-success" size="sm"><FontAwesomeIcon icon={faPlusSquare} /> AssignBug
                                                    </Link>
                                                        </td>
                                                    }

                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            Showing page of {currentPage} of {totalPages}
                        </div>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} name="currentPage" value={currentPage}
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
        );
    }
}

export default ViewBugDetailsComponent;