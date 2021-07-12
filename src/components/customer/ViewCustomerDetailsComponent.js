import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card, FormControl, InputGroup} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faStepBackward, faStepForward, faFastBackward, faFastForward, faList } from '@fortawesome/free-solid-svg-icons';

export default class ViewCustomerDetailsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: [],
            currentPage: 1,
            viewsPerPage: 3
        }

    }

    componentDidMount() {
        axios.get("http://localhost:6060/api/allCustomers")
            .then(response => response.data)
            .then((data) => {
                this.setState({ customers: data });
            });
    }

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
        if (this.state.currentPage < Math.ceil(this.state.customers.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.customers.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.customers.length / this.state.viewsPerPage)
            });
        }
    };

    bugList = () => {
        return this.props.history.push("/customerBug");
    };

    render() {
        const { customers, currentPage, viewsPerPage } = this.state;
        const lastIndex = currentPage * viewsPerPage;
        const firstIndex = lastIndex - viewsPerPage;
        const currentViews = customers.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(customers.length / viewsPerPage);

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        }

        return (
            <div className="container">
                <br/>
                <Card>
                    <Card.Header>
                        <div>
                            <h2 className="text-center">Customer Details List</h2>
                            <button className="btn btn-warning mb-2" onClick={this.bugList} variant="contained" style={{ float: 'right' }}>
                                <FontAwesomeIcon icon={faList} size="lg" /> Bug List
                            </button>
                        </div>
                        </Card.Header>
                        <br/>
                        <Card.Body>
                            <table className="table table-striped table-bordered table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">CustomerId</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Email Id</th>
                                        <th scope="col">Gender</th>
                                        <th scope="col">Phone Number</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    customers.length === 0 ?
                                        <tr align="center">
                                            <td colSpan="6">No customer details available.</td>
                                            </tr> :
                                            currentViews.map((customer) => (
                                                <tr key={customer.customerTicketId}>
                                                    <td>{customer.customerTicketId}</td>
                                                    <td>{customer.customerUserName}</td>
                                                    <td>{customer.customerEmailId}</td>
                                                    <td>{customer.gender}</td>
                                                    <td>{customer.mobileNumber}</td>
                                                    <td>
                                                        <Link to={"raise/" + customer.customerTicketId} className="btn btn-outline-primary">
                                                            <FontAwesomeIcon icon={faPlusSquare} /> Raise Ticket
                                                        </Link>
                                                    </td>

                                                </tr>
                                            ))
                                }
                                </tbody>
                            </table>
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
