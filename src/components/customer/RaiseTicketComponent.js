import axios from 'axios';
import React, { Component } from 'react';


export default class RaiseTicketComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerTicketId: '',
            bugTitle: '',
            bugDescription: '',
            criticalLevel: '',
            bugStatus: '',
            message: null
        }
        this.saveTicket = this.saveTicket.bind(this);
    }

    componentDidMount() {
        const customerTicketId = this.props.match.params.customerTicketId;
        if (customerTicketId) {
            this.findCustomerBycustomerTicketId(customerTicketId);
        }

    }

    findCustomerBycustomerTicketId = (customerTicketId) => {

        axios.get("http://localhost:6060/api/customers/" + customerTicketId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        customerTicketId: response.data.customerTicketId
                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });

    }

    saveTicket = (event) => {
        event.preventDefault();
        var customerTicketId = this.state.customerTicketId;
        const bug = {
            bugTitle: this.state.bugTitle, bugDescription: this.state.bugDescription,
            criticalLevel: this.state.criticalLevel, bugStatus: this.state.bugStatus
        };
        axios.post('http://localhost:6060/api/raise/' + customerTicketId, bug)
            .then(response => {
                this.setState({ message: 'Ticket added Successfully' });
                this.props.history.push('/viewCustomer');
            });
    }

    onChange = e =>
        this.setState({
            [e.target.name]: e.target.value
        });

    customerList = () => {
        return this.props.history.push("/viewCustomer");
    };


    render() {
        return (
            <div className="container">
                <br></br>
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                <h2 className="text-center">Add Bug Details</h2>
                <div >
                    <form>
                        <div className="form-group">
                            <label>Bug Title:</label>
                            <input type="text" placeholder="Enter bug title" name="bugTitle" className="form-control"
                                value={this.state.bugTitle} onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label>Bug Description:</label>
                            <input type="text" placeholder="Enter bug description" name="bugDescription" className="form-control"
                                value={this.state.bugDescription} onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label>Critical level:</label>
                            <input type="text" placeholder="Enter critical level" name="criticalLevel" className="form-control"
                                value={this.state.criticalLevel} onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label>Bug Status:</label>
                            <input type="text" placeholder="Enter bug status" name="bugStatus" className="form-control"
                                value={this.state.bugStatus} onChange={this.onChange} />
                        </div>

                        <button className="btn btn-success" onClick={this.saveTicket}>Save</button>
                        <button className="btn btn-danger mb-2" onClick={this.customerList} variant="contained" style={{ float: 'right' }}>
                            Cancel
                            </button>
                    </form>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

