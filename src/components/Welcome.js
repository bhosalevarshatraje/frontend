    import React, { Component } from 'react';
    import { Card, CardDeck } from 'react-bootstrap';

    class Welcome extends Component {

        bugList = () => {
            return this.props.history.push("/adminBug");
        };

        staffList = () => {
            return this.props.history.push("/viewStaff");
        };

        projectList = () => {
            return this.props.history.push("/viewProject");
        };

        render() {
            return (
                <div className="container">
                    <br />
                    <div className="row " >
                        <h1 align="center" >Welcome to e-bug tracker</h1>
                    </div>

                    <br />
                    <CardDeck>
                        <Card >
                            <Card.Body>
                                <div className="row" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row"
                                    }} >
                                    <button className="btn btn-dark "
                                        onClick={this.bugList}> Bug List
                                    </button>

                                </div>
                            </Card.Body>
                        </Card>
                        <Card >

                            <Card.Body>
                                <div className="row" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row"
                                    }} >

                                    <button className="btn btn-dark " onClick={this.staffList}
                                        variant="contained" style={{ float: 'right' }}> Staff List
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card >

    <Card.Body>
        <div className="row" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
            }} >

            <button className="btn btn-dark " onClick={this.projectList}
                variant="contained" style={{ float: 'right' }}> Project List
            </button>
        </div>
    </Card.Body>
    </Card>
        </CardDeck>



                </div>
            );
        }
    }

    export default Welcome;