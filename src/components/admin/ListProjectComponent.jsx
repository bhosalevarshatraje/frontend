import React, { Component } from 'react';
import ProjectService from '../../services/ProjectService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faStepBackward, faStepForward, faFastBackward, faFastForward, faUndo, faTrashAlt, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, FormControl, InputGroup} from 'react-bootstrap';

class ListProjectComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            project: [],
            currentPage : 1,
            viewsPerPage : 3
        }
        this.addProject = this.addProject.bind(this);
        this.editProject = this.editProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
    }

    deleteProject(proId) {
        ProjectService.deleteProject(proId).then(res => {
            this.setState({ project: this.state.project.filter(project => project.proId !== proId) });
        });
    }
    viewProject(proId) {
        this.props.history.push(`/view-project/${proId}`);
    }
    editProject(proId) {
        this.props.history.push(`/update-project/${proId}`);
    }


    componentDidMount() {
        ProjectService.getProject().then((res) => {
            this.setState({ project: res.data });
        });
    }

    addProject() {
        this.props.history.push('/add-project/_add');
    }

    home = () => {
        return this.props.history.push("/welcome");
    };

    changePage = event => {
        this.setState({
            [event.target.proName]: parseInt(event.target.value)
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
        if(this.state.currentPage < Math.ceil(this.state.project.length / this.state.viewsPerPage)) {
            this.setState({
                currentPage : Math.ceil(this.state.project.length / this.state.viewsPerPage)
            });
        }
    };

    render() {
        const { project, currentPage, viewsPerPage } = this.state;
        const lastIndex = currentPage * viewsPerPage;
        const firstIndex = lastIndex - viewsPerPage;
        const currentViews = project.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(project.length / viewsPerPage);

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
                <h2 className="text-center">PROJECTS LIST</h2>
                <div >
                    <button className="btn btn-primary" onClick={this.addProject}><FontAwesomeIcon icon={faPlusSquare} /> Add Project</button>

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
                                <th scope="col">Project Id</th>
                                <th scope="col"> Project Name</th>
                                <th scope="col"> Project Description</th>
                                <th scope="col"> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentViews.map(
                                    (project, index) => (

                                        <tr key={project.proId}>
                                            <td> {project.proId} </td>
                                            <td> {project.proName}</td>
                                            <td> {project.proDescription} </td>
                                            <td>
                                                <button onClick={() => this.editProject(project.proId)} className="btn btn-info"><FontAwesomeIcon icon={faEdit} />Update </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteProject(project.proId)} className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} /> Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewProject(project.proId)} className="btn btn-success"><FontAwesomeIcon icon={faEye} /> View </button>
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
export default ListProjectComponent