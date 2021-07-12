import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';

export default class SolutionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.bugChange = this.bugChange.bind(this);
    }

    initialState = {
        bugId: '', bugSolution: ''
    };

    componentDidMount() {
        const bugId = this.props.match.params.bugId;
        if (bugId) {
            this.findBugById(bugId);
        }

    }

    findBugById = (bugId) => {

        axios.get("http://localhost:6060/api/bugs/" + bugId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        bugId: response.data.bugId,
                        bugTitle: response.data.bugTitle,
                        bugDescription: response.data.bugDescription,
                        criticalLevel: response.data.criticalLevel,
                        bugStatus: response.data.bugStatus,
                        bugSolution: response.data.bugSolution
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
        const solution = {
            // bugId: this.state.bugId,
            bugSolution: this.state.bugSolution
        };

        axios.put("http://localhost:6060/api/bugSolution/" + bugId, solution)
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
        return this.props.history.push("/staffBug");
    };

    render() {
        return (
            <div className="container">
                <br />
                <div className="row">
                    <div className="card card-body border-dark bg-secondary">
                        <h2 className='text-center text-white'>Bug Info</h2>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-dark mb-2" onClick={this.bugList}>
                            <FontAwesomeIcon icon={faUndo} /> Return to Bug List
                            </button>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr className="table-info">
                                    <th scope="col">Bug Id</th>
                                    <th scope="col">Bug Title</th>
                                    <th scope="col">Bug Description</th>
                                    <th scope="col">Critical Level</th>
                                    <th scope="col">Bug Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="table-danger">
                                    <td>{this.state.bugId}</td>
                                    <td>{this.state.bugTitle}</td>
                                    <td>{this.state.bugDescription}</td>
                                    <td>{this.state.criticalLevel}</td>
                                    <td>{this.state.bugStatus}</td>
                                </tr>


                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                
                <div className="row">
                    <div className="card border-dark col-md-6 offset-md-3 offset-md-3 bg-light"><br />
                        <h2 className='text-center '>{this.state.bugSolution === null ? "Add Solution" : "Edit Solution"}</h2>
                        <div className="card-body">
                            <form >
                                <div className="form-group">
                                    <label className="form-label">Solution (*) </label>
                                    <textarea rows="4" cols="50" className="form-control" name="bugSolution"
                                        value={this.state.bugSolution} onChange={this.bugChange}
                                        placeholder="Provide solution here..." required ></textarea>

                                </div>
                                
                                <button onClick={this.updateSolution} className="btn btn-info mb-2">
                                    {this.state.bugSolution === null ? <FontAwesomeIcon icon={faPlusSquare} /> : <FontAwesomeIcon icon={faEdit} />}
                                    {this.state.bugSolution === null ? " Add Solution" :  "Edit Solution"}
                                </button>
                                
                            </form>
                            
                        </div>
                        
                    </div>
                    

                </div>
                
            </div>
        );
    }
}