import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';

class UpdateProjectComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            proId: this.props.match.params.proId,
            proName: '',
            proDescription: ''
        }
        this.changeProNameHandler = this.changeProNameHandler.bind(this);
        this.changeProDescriptionHandler = this.changeProDescriptionHandler.bind(this);
        this.updateProject = this.updateProject.bind(this);
    }

    componentDidMount() {
        ProjectService.getProjectById(this.state.proId).then((res) => {
            let project = res.data;
            this.setState({
                proName: project.proName,
                proDescription: project.proDescription
            });
        });
    }

    updateProject = (e) => {
        e.preventDefault();
        let project = { proName: this.state.proName, proDescription: this.state.proDescription };
        console.log('project => ' + JSON.stringify(project));
        console.log('id => ' + JSON.stringify(this.state.proId));
        ProjectService.updateProject(project, this.state.proId).then(res => {
            this.props.history.push('/viewProject');
        });
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
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <br></br>
                        <h2 className="text-center" style={{ color: 'orange' }} >UPDATE PROJECT</h2>
                        <div className="card-body">
                            <form action="/action_page.php" className="was-validated">
                                <div className='mb3'>
                                    <p>{this.props.project}</p>
                                    <div className="form-group">
                                        <label for="exampleFormControlInput1"> Project Id: </label>
                                        <input type="text" ref={this.proId} className="form-control"
                                            value={this.state.proId} name="proId" proId="exampleFormControlInput1" placeholder="Enter Project Id" required />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleFormControlInput2"> Project Name: </label>
                                        <input type="text" ref={this.proName} className="form-control"
                                           value={this.state.proName} name="proName" proId="exampleFormControlInput2" placeholder="Enter Project Name" onChange={this.changeProNameHandler} required />
                                    </div>

                                    <div className="form-group">
                                        <label for="exampleFormControlInput4"> Description: </label>
                                        <input type="text" ref={this.proDescription} className="form-control"
                                            value={this.state.proDescription} name="proDescription" proId="exampleFormControlInput4" placeholder="Enter Description" onChange={this.changeProDescriptionHandler} required />

                                    </div>

                                    <button className="btn btn-success" onClick={this.updateProject}>Save</button>
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



export default UpdateProjectComponent