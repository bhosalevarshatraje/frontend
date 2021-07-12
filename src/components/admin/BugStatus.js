import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUndo } from '@fortawesome/free-solid-svg-icons';

class BugStatus extends Component {

    constructor(props){
        super(props);
        this.state = {
            workStatus: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:6060/api/viewBugStatus")
            .then(response => response.data)
            .then((data) => {
                this.setState({workStatus: data});
            });
    }

    bugList = () => {
        return this.props.history.push("/adminBug");
    };


    
    render() {
        
        return (
            <div>
            <div style={{textAlign: 'center'}} className="progress-back">
                <div style={{backgroundColor: '#252525',  padding: '1em'}}>
                    
                <h2 className="text-white">Progress Of Bug Status flow</h2>
                <p className="text-white">Your work status see below</p>
                
                 <progress value={this.state.workStatus} max="100"  >

                    </progress>

                <span  className="text-white">&nbsp; {this.state.workStatus}%</span>
                 

                 {/* <ProgressBar style={{height: '1em'}} now={this.state.workStatus}/>
                 <div className="text-white">{this.state.workStatus}%</div> */}
                
                 </div>
                  
            </div>
            <br/>
            <br/>
            <button className="btn btn-info mb-2" onClick={this.bugList} variant="contained" style={{float: 'right'}}>
            <FontAwesomeIcon icon={faUndo} /> Return to Bug List
            </button>
            </div>
        );
    }
}

export default BugStatus;