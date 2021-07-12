import React, { Component } from 'react'

import ProjectService from '../../services/ProjectService';

class ViewProjectComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            proId: this.props.match.params.proId,
            project: {}
        }
    }

    componentDidMount() {
        ProjectService.getProjectById(this.state.proId).then(res => {
            this.setState({ project: res.data });
        })
    }

    cancel() {
        this.props.history.push('/viewProject');
    }
    

    render() {

        return (
            <div>
                <br></br>
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center" style={{ color: 'orange' }}> View Project Details</h3>
                    
                    <div className="card-body">
                        <div className="row">
                            <label> Project Name: {this.state.project.proName}</label> 
                        </div>
                        <div className="row">
                            <label> Project Description: {this.state.project.proDescription}</label>
                            
                        </div>
                        <br/>
                        <div className="row" style={{ display: "flex" }}>
                        <button className="btn btn-secondary " onClick={this.cancel.bind(this)} style={{ marginLeft: "auto" }}>Back to ProjectList</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ViewProjectComponent