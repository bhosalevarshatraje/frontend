import React, { Component } from 'react'
import ProjectService from '../../services/ProjectService';
class AddProjectComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            proId: this.props.match.params.proId,
            proName: '',
            proDescription: ''
        }
        this.changeProNameHandler = this.changeProNameHandler.bind(this);
        this.changeProDescriptionHandler = this.changeProDescriptionHandler.bind(this);
    }
    componentDidMount() {
        if (this.state.proId === '_add') {
            return
        } else {
            ProjectService.getProjectById(this.state.proId).then((res) => {
                let project = res.data;
                this.setState({
                    proName: project.proName,
                    proDescription: project.proDescription
                });
            });
        }
    }
    saveOrUpdateProject = (e) => {
        e.preventDefault();
        let project = { proName: this.state.proName, proDescription: this.state.proDescription };
        console.log('project => ' + JSON.stringify(project));
        if (this.state.proId === '_add') {
            ProjectService.addProject(project).then(res => {
                this.props.history.push('/viewProject');
            });
        } else {
            ProjectService.updateProject(project, this.state.proId).then(res => {
                this.props.history.push('/viewProject');
            });
        }
    }

    changeProNameHandler = (event) => {
        this.setState({ proName: event.target.value });
    }

    changeProDescriptionHandler = (event) => {
        this.setState({ proDescription: event.target.value });
    }

    cancel() {
        this.props.history.push('/viewProject');
    }


    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <br></br>
                            <h2 className="text-center" style={{ color: 'orange' }}>ADD PROJECT</h2>
                            <div className="card-body">
                                <form action="/action_page.php" className="was-validated">
                                    <div className='mb3'>
                                        <p>{this.props.project}</p>


                                        <div className="form-group">
                                            <label for="exampleFormControlInput1"> Project Name: </label>
                                            <input type="text" placeholder="Project Name" proName="proName" className="form-control"
                                                proId="exampleFormControlInput1" value={this.state.proName} onChange={this.changeProNameHandler} required />
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Please fill out this field.</div>
                                        </div>

                                        <div className="form-group">
                                            <label for="exampleFormControlInput2"> Project Description: </label>
                                            <input type="text" placeholder="Project Description" proName="proDescription" className="form-control"
                                                proId="exampleFormControlInput2" value={this.state.proDescription} onChange={this.changeProDescriptionHandler} required />
                                            <div class="valid-feedback">Valid.</div>
                                            <div class="invalid-feedback">Please fill out this field.</div>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateProject}>Save</button>
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

export default AddProjectComponent
